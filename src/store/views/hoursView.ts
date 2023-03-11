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
  ShiftValidationError,
  ShiftInputChange,
  SaveChanges,
} from "../../../types/bookings";

// Constants
import { START_TIME, END_TIME } from "../../constants/common";

export default class HoursView {
  private _store: Store;

  weekStart: Moment | null = null;
  weekEnd: Moment | null = null;
  activeWeekShifts: Shift[][] | null = null;
  teamShifts: any = [];

  shiftValidationErrors: ShiftValidationError[] = [];

  // Edited shifts
  newShifts: Shift[] = [];
  editedSomething = false;
  shiftsEditOpen = false;

  // Shifts to be deleted
  shiftsToDelete: string[] = [];

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

  handleFetchShifts = async (user: string) => {
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

  handleSetNewShifts = () => {
    runInAction(() => {
      this.newShifts = [...this._store.teamStore?.shifts];
    });
  };

  handleResetValidationErrors = () => {
    runInAction(() => {
      this.shiftValidationErrors = [];
    });
  };

  handleAddValidationError = ({ shiftId, message }: ShiftValidationError) => {
    runInAction(() => {
      this.shiftValidationErrors = [
        ...this.shiftValidationErrors,
        {
          shiftId: shiftId,
          message: message,
        },
      ];
    });
  };

  handleSaveChanges = async ({
    shiftsToUpdate,
    shiftsToDelete,
  }: SaveChanges) => {
    shiftsToDelete.length > 0 &&
      (await this._store.teamStore.postShiftsToDelete(shiftsToDelete));
    this.editedSomething &&
      (await this._store.teamStore.postShiftsToUpdate(shiftsToUpdate));
    this.handleFetchShifts(this._store.authStore.currentUser.id);
    this.handleCloseEditingAndResetEverything();
  };

  handleAddShift = (n: number) => {
    const newShifts = [...this.newShifts];
    const id = uuidv4();
    const currentTime = moment().format();

    !this.editedSomething &&
      runInAction(() => {
        this.editedSomething = true;
      });

    runInAction(() => {
      this.newShifts = [
        ...newShifts,
        {
          id: id,
          created_at: currentTime,
          start_time: "",
          end_time: "",
          iso_weekday: n,
          user_id: this._store.authStore.currentUser.id,
        },
      ];
    });
  };

  handleEditShift = ({ newValue, isStartTime, shift }: ShiftInputChange) => {
    const startOrEnd = isStartTime ? START_TIME : END_TIME;
    const newShifts = [...this.newShifts];

    !this.editedSomething &&
      runInAction(() => {
        this.editedSomething = true;
      });

    const index = newShifts.map((s: Shift) => s.id).indexOf(shift?.id);
    index !== -1
      ? (newShifts[index] = {
          ...newShifts[index],
          [startOrEnd]: newValue.value,
        })
      : newShifts.push({
          ...shift,
          [startOrEnd]: newValue.value,
        });

    runInAction(() => {
      this.newShifts = newShifts;
    });
  };

  handleAddShiftReadyToDelete = (shiftId: string) => {
    const shiftsToDelete = [...this.shiftsToDelete];
    const newShifts = this.newShifts.filter((shift) => shift.id !== shiftId);

    runInAction(() => {
      this.shiftsToDelete = [...shiftsToDelete, shiftId];
      this.newShifts = newShifts;
    });
  };

  handleCloseEditingAndResetEverything = () => {
    runInAction(() => {
      this.shiftsToDelete = [];
      this.newShifts = [];
      this._store.modalView.handleCloseModal();
      this.shiftsEditOpen = false;
      this.shiftValidationErrors = [];
      this.editedSomething = false;
    });
  };

  handleSetShiftsEditOpen = (v: boolean) => {
    runInAction(() => {
      this.shiftsEditOpen = v;
    });
  };

  fetchTeamShifts = () => {};
}
