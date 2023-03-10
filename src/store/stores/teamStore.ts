/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import { Hours, Shift } from "../../../types/bookings";
import { Profile } from "../../../types/members";
import { successToast, errorToast } from "../../utils/toast";

export default class TeamStore {
  private _store: Store;

  bookings: Hours[] = [];
  shifts: Shift[] = [];

  members: Profile[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async fetchShifts(id: string) {
    const res = await this._store.api.dashAPI.fetchShifts(id);
    runInAction(() => {
      this.shifts = res;
    });
  }

  async addShift(shift: Shift) {
    try {
      const response = await this._store.api.dashAPI.addShift(shift);
      if (response) return true;
    } catch (err) {
      errorToast("Cannot save changes.");
    }
    return false;
  }

  async addMultipleShifts(shifts: Shift[]) {
    try {
      const response = await this._store.api.dashAPI.postMultipleShifts(shifts);
      if (response) return true;
    } catch (err) {
      errorToast("Cannot save changes.");
    }
    return false;
  }

  async updateShifts(newShifts: Shift[]) {
    try {
      const response = await this._store.api.dashAPI.updateShifts(newShifts);
      if (response) {
        successToast("Saved changes sucessfully.");
        return true;
      }
    } catch (err) {
      errorToast("Cannot save changes.");
    }
    return false;
  }

  async deleteShiftById(id: string) {
    try {
      const response = await this._store.api.dashAPI.deleteShift(id);
      if (response) return true;
    } catch (err) {
      errorToast("Cannot delete shift.");
    }
    return false;
  }

  async deleteMultipleShifts(shifts: string[]) {
    try {
      const response = await this._store.api.dashAPI.deleteMultipleShifts(
        shifts
      );
      if (response) return true;
      successToast("Saved changes sucessfully.");
    } catch (err) {
      errorToast("Cannot delete shifts.");
    }
    return false;
  }

  async fetchTeamMembers(businessId: string) {
    const data = await this._store.api.dashAPI.fetchTeam(businessId);

    if (data) {
      runInAction(() => (this.members = data));
    }
  }

  async addTeamMember(businessId: string) {
    const response = await this._store.api.dashAPI.addTeamMember(businessId);

    console.log({ response });
  }

  // async fetchTeamShifts = async () => {
  //   // await this._store.api.dashAPI.fetch
  // }
}
