/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import moment, { Moment } from "moment";
import { EditShift, Shift, ShiftInputChangeProps, AddShift, ShiftValidationError } from "../../../types/bookings";
import { ADD_MODAL, DELETE_MODAL } from "../../constants/modals";

export default class HoursView {
  private _store: Store;

  weekStart: Moment | null = null;
  weekEnd: Moment | null = null;
  activeWeekShifts: Shift[][] | null = null;
  teamShifts: any = [];

  shiftValidationErrors: ShiftValidationError[] = []; 

  // Edited shifts
  shiftsToEdit: Shift[] = [];
  shiftsEditOpen: boolean = false;
  dayInEditMode: Moment | null = null;

  // Shifts to be added
  dayInAddMode: Moment | null = null;
  shiftsToAdd: AddShift[] = [];

  // Shifts to be deleted
  shiftsToDelete: string[] = [];
  shiftToDeleteDate: Moment | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
    this.resetWeek();
  }

  handleAddMember = async () => {
    await this._store.teamStore.addTeamMember(
      this._store.authStore.currentUser.business_id
    );
  };

  fetchShifts = async (user: string) => {
    await this._store.teamStore.fetchShifts(user);
    this.setActiveWeekShifts();
  };

  setActiveWeekShifts = () => {
    if (!this.weekStart || !this.weekEnd) return;

    let day = this.weekStart;
    const shiftDays: any = [];
    while (day < this.weekEnd) {
      const repeatShifts = this._store.teamStore?.shifts?.filter((shift) => {
        const isoWeekday = day.isoWeekday();
        return shift.iso_weekday === isoWeekday;
      });

      const repeatShiftsWithDates = repeatShifts.map((shift) => {
        return { ...shift, shiftDate: day };
      });

      shiftDays.push(repeatShiftsWithDates);

      day = day.clone().add(1, "days");
    }

    runInAction(() => {
      this.activeWeekShifts = shiftDays;
    });
  };

  prevWeek = () => {
    runInAction(() => {
      if (!this.weekStart || !this.weekEnd) return;

      this.weekStart = this.weekStart.clone().subtract(7, "days");
      this.weekEnd = this.weekEnd.clone().subtract(7, "days");
    });

    this.setActiveWeekShifts();
  };

  nextWeek = () => {
    runInAction(() => {
      if (!this.weekStart || !this.weekEnd) return;
      this.weekStart = this.weekStart.clone().add(7, "days");
      this.weekEnd = this.weekEnd.clone().add(7, "days");
    });

    this.setActiveWeekShifts();
  };

  resetWeek = () => {
    runInAction(() => {
      this.weekStart = moment().startOf("week").add(1, "days");
      this.weekEnd = moment().endOf("week").add(1, "days");
    });
  };

  handleEnterEditMode = (day: Moment) => {
    runInAction(() => {
      this.dayInAddMode = day;
    });
  };

  validateAndSaveChanges = () => {

    runInAction(() => {
      this.shiftValidationErrors = [];
    });

    const newShifts = [...this._store.teamStore?.shifts]
    let newShiftsToDelete = [...this.shiftsToDelete]
    let newShiftsToEdit = [...this.shiftsToEdit]
    let newShiftsToAdd = [...this.shiftsToAdd]

    if(newShiftsToDelete.length !== 0){
      if(newShiftsToEdit.length !== 0){
        newShiftsToEdit = newShiftsToEdit.filter(s => !newShiftsToDelete.includes(s.id) )
      }
    }

    if(newShiftsToEdit.length !== 0){
      newShiftsToEdit.map(s => {
        const startTime = moment(s.start_time, 'hh:mm:ss');
        const endTime = moment(s.end_time, 'hh:mm:ss');
        if(!startTime.isBefore(endTime)){
          runInAction(() => {
            this.shiftValidationErrors = [
              ...this.shiftValidationErrors, 
              {shiftId: s.id, message: "End time is not after start time."}];
          });
        }
      });
    }

    if(newShiftsToAdd.length !== 0){
      newShiftsToAdd.map((s, index) => {
        const startTime = moment(s.start_time, 'hh:mm:ss');
        const endTime = moment(s.end_time, 'hh:mm:ss');
        if(!startTime.isBefore(endTime)){
          runInAction(() => {
            this.shiftValidationErrors = [
              ...this.shiftValidationErrors, 
              {shiftIndex: index, message: "End time is not after start time."}];
          });
        }
      });
    }

  };

  handleAddShiftClick = (n: number) => {
    const newShifts = [...this.shiftsToAdd]
    runInAction(() => {
      this.shiftsToAdd = [...newShifts, { start_time: "", end_time: "", iso_weekday: n, user_id: this._store.authStore.currentUser.id }];
    });
  };

  handleRemoveNewShift = (i: number) => {
    const shifts = [...this.shiftsToAdd];
    const newShifts = shifts.filter((shift, index) => index !== i)
    runInAction(() => {
      this.shiftsToAdd = newShifts;
    });
  }

  handleEditShift = ({ newValue, startOrEnd, shift, addShift, indexOfShift }: ShiftInputChangeProps) => {
    if(shift) {
      const newShiftsToEdit = [...this.shiftsToEdit];
      if (newShiftsToEdit.length === 0) {
        newShiftsToEdit.push({...shift, [startOrEnd]: newValue.value})
      } else {
        const index = newShiftsToEdit.map((s: Shift) => s.id).indexOf(shift.id);
        index !== -1 
          ? newShiftsToEdit[index] = {...newShiftsToEdit[index], [startOrEnd]: newValue.value}
          : newShiftsToEdit.push({...shift, [startOrEnd]: newValue.value})
      }
      runInAction(() => {
        this.shiftsToEdit = newShiftsToEdit;
      });
    } else if(addShift && (indexOfShift || indexOfShift === 0)){
      const newShiftsToAdd = [...this.shiftsToAdd];
      if (newShiftsToAdd.length === 0) {
        newShiftsToAdd.push({...addShift, [startOrEnd]: newValue.value})
      } else {
        const index = newShiftsToAdd.map((s: AddShift, index) => index === indexOfShift);
        index 
          ? newShiftsToAdd[indexOfShift] = {...newShiftsToAdd[indexOfShift], [startOrEnd]: newValue.value}
          : newShiftsToAdd.push({...addShift, [startOrEnd]: newValue.value})
      }
      runInAction(() => {
        this.shiftsToAdd = newShiftsToAdd;
      });
    }
  }

  addShiftToDelete = (shiftId: string/* , day: Moment */) => {
    const newShiftsToDelete = [...this.shiftsToDelete];

    runInAction(() => {
      this.shiftsToDelete = [...newShiftsToDelete, shiftId];
      /* this.shiftToDeleteDate = day; */
    });
  };

  resetAllPendingShifts = () => {
    runInAction(() => {
      this.shiftsToDelete = [];
      this.shiftsToAdd = [];
      this.shiftsToEdit = [];
      this._store.modalView.closeModal();
      this.shiftsEditOpen = false;
    });
  }

  setShiftsEdit = (v: boolean) => {
    runInAction(() => {
      this.shiftsEditOpen = v;
    });
  }

  deleteOneTimeShift = async (id: string, userId: string) => {
    await this._store.teamStore.deleteOneTimeShift(id);
    await this.fetchShifts(userId);
    this._store.modalView.closeModal();
  };

  deleteShiftOnce = async (id: string, userId: string) => {
    if (!this.shiftToDeleteDate) return;
    await this._store.teamStore.deleteShiftById(
      id,
      this.shiftToDeleteDate,
      userId
    );
    await this.fetchShifts(userId);
    this._store.modalView.closeModal();
  };

  deleteShiftAll = async (id: string, userId: string) => {
    await this._store.teamStore.deleteShiftById(id);
    await this.fetchShifts(userId);
    this._store.modalView.closeModal();
  };

  handleNewShiftSingle = async (userId: string) => {
    if (!this.dayInAddMode || !this.shiftsToAdd) return;

    await this._store.teamStore.addShiftSingle({
      isoWeekday: this.dayInAddMode.isoWeekday(),
      start: this.shiftsToAdd.start,
      end: this.shiftsToAdd.end,
      user_id: userId,
      date: this.dayInAddMode,
    });

    this.fetchShifts(userId);

    runInAction(() => {
      this.dayInAddMode = null;
      this.shiftsToEdit = [];
    });

    this._store.modalView.closeModal();
  };

  // Todo test add shift and update shift
  handleNewShiftRepeat = async (userId: string) => {
    if (!this.dayInAddMode || !this.shiftsToAdd) return;

    await this._store.teamStore.addShift({
      isoWeekday: this.dayInAddMode.isoWeekday(),
      start: this.shiftsToAdd.start,
      end: this.shiftsToAdd.end,
      user_id: userId,
    });

    this.fetchShifts(userId);

    runInAction(() => {
      this.dayInAddMode = null;
      this.shiftsToEdit = [];
    });

    this._store.modalView.closeModal();
  };

  handleUpdateShift = () => {
    this._store.teamStore.updateShifts(this.shiftsToEdit);
  };

  // Todo finish update shift
  /* handleEditShift = ({ slot, shifts, day, shiftId, close }: EditShift) => {
    const index = shifts.map((s: Shift) => s.id).indexOf(shiftId);
    const newShifts = [...shifts];

    if (!close) newShifts[index].start_time = slot.value;
    if (close) newShifts[index].end_time = slot.value;

    runInAction(() => {
      this.shiftsToEdit = newShifts;
      this.dayInEditMode = day;
    });
  }; */

  fetchTeamShifts = () => {};
}
