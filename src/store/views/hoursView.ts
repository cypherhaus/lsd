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
} from "../../../types/bookings";
import { UserInfo } from "../../../types/common";

// Utils
import { overlapValidation, fieldsValidation } from "../../utils/time";

// Constants
import { START_TIME, END_TIME } from "../../constants/common";

export default class HoursView {
  private _store: Store;

  weekStart: Moment | null = null;
  weekEnd: Moment | null = null;
  activeWeekShifts: Shift[][] | null = null;
  teamShifts: any = [];

  userInfo: UserInfo = { firstName: "", lastName: "" };

  shiftValidationErrors: ShiftValidationError[] = [];
  shiftsLoading: boolean = true;

  // Shifts editing
  newShifts: Shift[] | null = null;
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

  setActiveWeekShifts = () => {
    if (!this.weekStart || !this.weekEnd) return;
    const shifts = this._store.teamStore?.shifts as Shift[];
    let day = this.weekStart;
    const shiftDays: any = [];
    while (day < this.weekEnd) {
      const repeatShifts = shifts.filter((shift) => {
        const isoWeekday = day.isoWeekday();
        return shift.iso_weekday === isoWeekday;
      });

      const repeatShiftsWithDates = repeatShifts.map((shift) => {
        return { ...shift, shiftDate: day };
      });

      shiftDays.push(repeatShiftsWithDates);

      day = day.clone().add(1, "days");
    }

    runInAction(() => (this.activeWeekShifts = shiftDays));
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

  handleSetUserInfo = (data: UserInfo) => {
    runInAction(() => (this.userInfo = data));
  };

  handleFetchShifts = async (user: string) => {
    await this._store.teamStore.fetchShifts(user);
    this.setActiveWeekShifts();
  };

  handleSetNewShifts = () => {
    runInAction(
      () => (this.newShifts = [...(this._store.teamStore?.shifts as Shift[])])
    );
  };

  handleStartLoading = () => runInAction(() => (this.shiftsLoading = true));
  handleStopLoading = () => runInAction(() => (this.shiftsLoading = false));

  handleResetValidationErrors = () => {
    runInAction(() => (this.shiftValidationErrors = []));
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

  handleValidateChanges = () => {
    this.handleResetValidationErrors();
    const shiftsToUpdate = [...(this.newShifts as Shift[])];

    const deletedDuplicates = shiftsToUpdate.filter(
      (obj, index) =>
        shiftsToUpdate.findIndex((item) => item.id === obj.id) === index
    );

    runInAction(() => (this.newShifts = deletedDuplicates));
    const newShiftsToUpdate = [...(this.newShifts as Shift[])];

    const fieldsErrors = fieldsValidation(newShiftsToUpdate);
    if (fieldsErrors.length > 0) {
      fieldsErrors.map((e) =>
        this.handleAddValidationError({
          shiftId: e.shiftId,
          message: e.message,
        })
      );
    }

    const daysShiftOverlapErrors = overlapValidation(newShiftsToUpdate);
    if (daysShiftOverlapErrors.length > 0) {
      daysShiftOverlapErrors.map((e) =>
        this.handleAddValidationError({
          shiftId: e.shiftId,
          message: e.message,
        })
      );
    }

    if (this.shiftValidationErrors.length === 0) this.handleSaveChanges();
  };

  handleSaveChanges = async () => {
    const shiftsToDelete = [...this.shiftsToDelete];
    const shiftsToUpdate = [...(this.newShifts as Shift[])];

    if (this.shiftsToDelete.length > 0) {
      await this._store.teamStore.postShiftsToDelete(shiftsToDelete);
    }

    if (this.editedSomething) {
      await this._store.teamStore.postShiftsToUpdate(shiftsToUpdate);
    }

    this.handleFetchShifts(this._store.authStore.currentUser.id);
    this.handleCloseEditingReset();
  };

  handleAddShift = (n: number) => {
    const newShifts = [...(this.newShifts as Shift[])];
    const id = uuidv4();
    const currentTime = moment().format();

    if (!this.editedSomething) {
      runInAction(() => (this.editedSomething = true));
    }

    runInAction(() => {
      this.newShifts = [
        ...newShifts,
        {
          id,
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
    const newShifts = [...(this.newShifts as Shift[])];

    if (!this.editedSomething) {
      runInAction(() => (this.editedSomething = true));
    }

    const index = newShifts.map((s: Shift) => s.id).indexOf(shift?.id);

    if (index === -1) {
      newShifts.push({
        ...shift,
        [startOrEnd]: newValue?.value,
      });
      return;
    }

    newShifts[index] = {
      ...newShifts[index],
      [startOrEnd]: newValue?.value,
    };

    runInAction(() => (this.newShifts = newShifts));
  };

  handleAddShiftToDelete = (shiftId: string) => {
    const shiftsToDelete = [...this.shiftsToDelete];
    const shiftsToUpdate = [...(this.newShifts as Shift[])];
    const newShifts = shiftsToUpdate.filter((shift) => shift.id !== shiftId);

    runInAction(() => {
      this.shiftsToDelete = [...shiftsToDelete, shiftId];
      this.newShifts = newShifts;
    });
  };

  handleCloseEditing = () => {
    if (!this.editedSomething && this.shiftsToDelete.length === 0) {
      this.handleSetShiftsEditClose();
      return;
    }
    this._store.modalView.handleOpenModal();
  };

  handleCloseEditingReset = () => {
    runInAction(() => {
      this.shiftsToDelete = [];
      this.newShifts = [];
      this.shiftsEditOpen = false;
      this.shiftValidationErrors = [];
      this.editedSomething = false;
    });
    this._store.modalView.handleCloseModal();
  };

  handleSetShiftsEditOpen = () => {
    this.handleStartLoading();
    runInAction(() => (this.shiftsEditOpen = true));
  };

  handleSetShiftsEditClose = () => {
    runInAction(() => (this.shiftsEditOpen = false));
  };

  fetchTeamShifts = () => {};
}
