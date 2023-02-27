/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import moment, { Moment } from "moment";
import { EditShift, Shift } from "../../../types/bookings";
import { ADD_MODAL, DELETE_MODAL } from "../../constants/modals";

export default class HoursView {
  private _store: Store;

  weekStart: Moment | null = null;
  weekEnd: Moment | null = null;
  activeWeekShifts: Shift[][] | null = null;
  teamShifts: any = [];

  // Edit shifts
  editDayShifts: Shift[] = [];
  dayInEditMode: Moment | null = null;

  // Shift to be added
  dayInAddMode: Moment | null = null;
  shiftToAdd: { start: string; end: string } | null = null;

  // Shift to be deleted
  shiftToDelete: string | null = null;
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
    this.dayInAddMode = m;
    this.shiftToAdd = { start: "09:00:00", end: "17:00:00" };
  };

  setActiveWeekShifts = () => {
    if (!this.weekStart || !this.weekEnd) return;

    let day = this.weekStart;
    const shiftDays: any = [];
    while (day < this.weekEnd) {
      const repeatShifts = this._store.teamStore?.shifts?.filter((shift) => {
        const isoWeekday = day.isoWeekday();
        return shift.isoWeekday === isoWeekday;
      });

      const repeatShiftsWithDates = repeatShifts.map((shift) => {
        return { ...shift, shiftDate: day };
      });

      const filteredShifts = repeatShiftsWithDates.filter((shift) => {
        const foundException = this._store.teamStore.shiftExceptions.find(
          (e) => {
            return (
              e.shift_id === shift.id &&
              shift.shiftDate.isSame(moment(e.shift_date), "day")
            );
          }
        );
        if (foundException) return false;
        return true;
      });

      shiftDays.push(filteredShifts);

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

  deleteShift = (shiftId: string, day: Moment) => {
    this._store.modalView.openModal(DELETE_MODAL);

    runInAction(() => {
      this.shiftToDelete = shiftId;
      this.shiftToDeleteDate = day;
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

    // Add a supabase database function to clear up any shift exceptions related to this shift id
  };

  handleNewShiftSingle = async (userId: string) => {
    if (!this.dayInAddMode || !this.shiftToAdd) return;

    await this._store.teamStore.addShiftSingle({
      isoWeekday: this.dayInAddMode.isoWeekday(),
      start: this.shiftToAdd.start,
      end: this.shiftToAdd.end,
      user_id: userId,
      date: this.dayInAddMode,
    });

    this.fetchShifts(userId);

    runInAction(() => {
      this.dayInAddMode = null;
      this.editDayShifts = [];
    });

    this._store.modalView.closeModal();
  };

  // Todo test add shift and update shift
  handleNewShiftRepeat = async (userId: string) => {
    if (!this.dayInAddMode || !this.shiftToAdd) return;

    await this._store.teamStore.addShift({
      isoWeekday: this.dayInAddMode.isoWeekday(),
      start: this.shiftToAdd.start,
      end: this.shiftToAdd.end,
      user_id: userId,
    });

    this.fetchShifts(userId);

    runInAction(() => {
      this.dayInAddMode = null;
      this.editDayShifts = [];
    });

    this._store.modalView.closeModal();
  };

  handleUpdateShift = () => {
    this._store.teamStore.updateShifts(this.editDayShifts);
  };

  // Todo finish update shift
  handleEditShift = ({ slot, shifts, day, shiftId, close }: EditShift) => {
    const index = shifts.map((s: Shift) => s.id).indexOf(shiftId);
    const newShifts = [...shifts];

    if (!close) newShifts[index].start = slot.value;
    if (close) newShifts[index].end = slot.value;

    runInAction(() => {
      this.editDayShifts = newShifts;
      this.dayInEditMode = day;
    });
  };

  fetchTeamShifts = () => {};
}
