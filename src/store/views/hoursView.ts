/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import moment, { Moment } from "moment";
import { v4 as uuidv4 } from "uuid";

// Types
import {
  Shift,
  ShiftInputChangeProps,
  ShiftValidationError,
} from "../../../types/bookings";

// Utils
import { checkOverlap, checkStartBeforeEnd } from "../../utils/time";

export default class HoursView {
  private _store: Store;

  weekStart: Moment | null = null;
  weekEnd: Moment | null = null;
  activeWeekShifts: Shift[][] | null = null;
  teamShifts: any = [];

  shiftValidationErrors: ShiftValidationError[] = [];

  // Edited shifts
  shiftsToEdit: Shift[] = [];
  shiftsEditOpen = false;
  dayInEditMode: Moment | null = null;

  // Shifts to be added
  dayInAddMode: Moment | null = null;
  shiftsToAdd: Shift[] = [];

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

  validateAndSaveChanges = async () => {
    runInAction(() => {
      this.shiftValidationErrors = [];
    });

    let oldShifts = [...this._store.teamStore?.shifts];
    const newShiftsToDelete = [...this.shiftsToDelete];
    let newShiftsToEdit = [...this.shiftsToEdit];
    let newShiftsToAdd = [...this.shiftsToAdd];

    /* 1. We are checking if there are same shifts in both deleted list and edited list. 
    If some shift is edited during editing and deleted after that, 
    we are removing it from newShiftsToEdit. */

    if (newShiftsToDelete.length !== 0 && newShiftsToEdit.length !== 0) {
      newShiftsToEdit = newShiftsToEdit.filter(
        (s) => !newShiftsToDelete.includes(s.id as string)
      );
    }

    /* 2. We are deleting shifts that are meant to be deleted from oldShifts. */

    if (newShiftsToDelete.length !== 0)
      oldShifts = oldShifts.filter(
        (s) => !newShiftsToDelete.includes(s.id as string)
      );

    oldShifts = newShiftsToEdit.concat(oldShifts);

    /* 3. We are checking if start time is after end time for every shift. */

    if (oldShifts.length !== 0) {
      oldShifts.map((s) => {
        if ((s.start_time || s.end_time) === "") {
          runInAction(() => {
            this.shiftValidationErrors = [
              ...this.shiftValidationErrors,
              {
                shiftId: s.id,
                message: "Please enter both start time and end time.",
              },
            ];
          });
        }
        if (!checkStartBeforeEnd(s.start_time, s.end_time)) {
          runInAction(() => {
            this.shiftValidationErrors = [
              ...this.shiftValidationErrors,
              { shiftId: s.id, message: "End time is not after start time." },
            ];
          });
        }
      });
    }

    /* 4. We are finding and removing duplicates (shifts with same id).
    On previous step new edited shifts are pushed to the end of the mergedShifts array.
    Filter function below is deleting duplicated shifts from end of an array. Because of that, 
    on previous step we reversed array in order to remove old duplicated shifts. 
    To make long story short - we are finding shifts with same id and removing ones with old
    content (old start_time, old end_time). */

    const finalEditedShifts = oldShifts.filter(
      (obj, index) =>
        oldShifts.findIndex((item) => item.id === obj.id) === index
    );

    /* 5. We are creating new array called days. In that array we will sort shifts by day and then
    we will check for every day if there is shifts' times overlap. */

    const initialShiftArray: string[][] = [];
    const days = [
      { number: 1, shifts: initialShiftArray },
      { number: 2, shifts: initialShiftArray },
      { number: 3, shifts: initialShiftArray },
      { number: 4, shifts: initialShiftArray },
      { number: 5, shifts: initialShiftArray },
      { number: 6, shifts: initialShiftArray },
      { number: 7, shifts: initialShiftArray },
    ];

    days.map((d) => {
      const dayShifts = finalEditedShifts.filter(
        (s) => s.iso_weekday === d.number
      );
      if (dayShifts.length > 1) {
        d.shifts = dayShifts.map((ds) => [ds.start_time, ds.end_time]);
        dayShifts.map((ds) => {
          if (checkOverlap(d.shifts)) {
            let shiftData: { shiftId: string; value: string | number } = {
              shiftId: "shiftIndex",
              value: ds.oldIndex as number,
            };

            if (!ds.oldIndex)
              shiftData = { shiftId: "shiftId", value: ds.id as string };
            runInAction(() => {
              this.shiftValidationErrors = [
                ...this.shiftValidationErrors,
                {
                  [shiftData.shiftId]: shiftData.value,
                  message: "There is time overlap in shifts.",
                },
              ];
            });
          }
        });
      }
    });

    /* 6. If everything went smooth and without validation errors, we are creating/deleting/updating
    everything to Supabase. */

    if (this.shiftValidationErrors.length === 0) {
      if (newShiftsToDelete.length > 0)
        await this._store.teamStore.deleteMultipleShifts(newShiftsToDelete);
      if (finalEditedShifts.length > 0)
        await this._store.teamStore.updateShifts(finalEditedShifts);
      this.resetAllPendingShifts();
    }
  };

  handleAddShiftClick = (n: number) => {
    const newShiftsToEdit = [...this.shiftsToEdit];
    const newShiftsToAdd = [...this.shiftsToAdd];
    runInAction(() => {
      this.shiftsToEdit = [
        ...newShiftsToEdit,
        {
          id: uuidv4(),
          start_time: "",
          end_time: "",
          iso_weekday: n,
          user_id: this._store.authStore.currentUser.id,
        },
      ];
      this.shiftsToAdd = [
        ...newShiftsToAdd,
        {
          id: uuidv4(),
          start_time: "",
          end_time: "",
          iso_weekday: n,
          user_id: this._store.authStore.currentUser.id,
        },
      ];
    });
  };

  handleEditShift = ({
    newValue,
    isStartTime,
    shift,
  }: ShiftInputChangeProps) => {
    const startOrEnd = isStartTime ? "start_time" : "end_time";
    const newShiftsToEdit = [...this.shiftsToEdit];
    if (newShiftsToEdit.length === 0) {
      newShiftsToEdit.push({
        ...(shift as Shift),
        [startOrEnd]: newValue.value,
      });
      return;
    }

    const index = newShiftsToEdit.map((s: Shift) => s.id).indexOf(shift?.id);
    index !== -1
      ? (newShiftsToEdit[index] = {
          ...newShiftsToEdit[index],
          [startOrEnd]: newValue.value,
        })
      : newShiftsToEdit.push({
          ...(shift as Shift),
          [startOrEnd]: newValue.value,
        });

    runInAction(() => {
      this.shiftsToEdit = newShiftsToEdit;
    });
  };

  addShiftToDelete = (shiftId: string) => {
    const newShiftsToDelete = [...this.shiftsToDelete];
    const shifts = [...this.shiftsToEdit];
    const newShifts = shifts.filter((shift) => shift.id !== shiftId);
    runInAction(() => {
      this.shiftsToDelete = [...newShiftsToDelete, shiftId];
      this.shiftsToEdit = newShifts;
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
  };

  setShiftsEdit = (v: boolean) => {
    runInAction(() => {
      this.shiftsEditOpen = v;
    });
  };

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
