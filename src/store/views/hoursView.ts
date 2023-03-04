/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import moment, { Moment } from "moment";
import { EditShift, Shift, ShiftInputChangeProps, AddShift } from "../../../types/bookings";
import { ADD_MODAL, DELETE_MODAL } from "../../constants/modals";

export default class HoursView {
  private _store: Store;

  weekStart: Moment | null = null;
  weekEnd: Moment | null = null;
  activeWeekShifts: Shift[][] | null = null;
  teamShifts: any = [];

  // Edit shifts
  shiftsToEdit: Shift[] = [];
  shiftsEditOpen: boolean = false;
  dayInEditMode: Moment | null = null;

  // Shift to be added
  dayInAddMode: Moment | null = null;
  shiftsToAdd: AddShift[] = [];

  // Shift to be deleted
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

  handleAddShiftClick = (m: Moment) => {
    const newShifts = [...this.shiftsToAdd]
    runInAction(() => {
      this.shiftsToAdd = [...newShifts, { start: "09:00:00", end: "17:00:00", isoWeekday: 0, user_id: 'abc' }];
    });
    /* this.dayInAddMode = m; */
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

  addShift = () => this._store.modalView.openModal(ADD_MODAL);

  updateShiftsToEdit = ({ newValue, startOrEnd, shift }: ShiftInputChangeProps) => {
    const newShiftsToEdit = [...this.shiftsToEdit];

    if(newShiftsToEdit.length === 0) {
      newShiftsToEdit.push({...shift, [startOrEnd]: newValue.value})
    } else {
      let found = false;
      newShiftsToEdit.find((existingShift, index) => {
        if (existingShift.id === shift.id){
          found = true;
          newShiftsToEdit[index] = {...newShiftsToEdit[index], [startOrEnd]: newValue.value}
        }
      })
      if(!found) newShiftsToEdit.push({...shift, [startOrEnd]: newValue.value})
    }

    runInAction(() => {
      this.shiftsToEdit = newShiftsToEdit;
    });
  }

  addShiftToDelete = (shiftId: string/* , day: Moment */) => {
    const newShiftsToDelete = [...this.shiftsToDelete];

    runInAction(() => {
      this.shiftsToDelete = [...newShiftsToDelete, shiftId];
      /* this.shiftToDeleteDate = day; */
    });
  };

  resetEverythingPendingInStore = () => {
    console.log('aaaa')
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
  handleEditShift = ({ slot, shifts, day, shiftId, close }: EditShift) => {
    const index = shifts.map((s: Shift) => s.id).indexOf(shiftId);
    const newShifts = [...shifts];

    if (!close) newShifts[index].start_time = slot.value;
    if (close) newShifts[index].end_time = slot.value;

    runInAction(() => {
      this.shiftsToEdit = newShifts;
      this.dayInEditMode = day;
    });
  };

  fetchTeamShifts = () => {};
}
