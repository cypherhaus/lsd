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
  shifts: Shift[] | null = null;

  members: Profile[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  async fetchShifts(id: string) {
    const res = await this._store.api.dashAPI.fetchShifts(id);
    runInAction(() => (this.shifts = res));
  }

  async postShiftsToUpdate(newShifts: Shift[]) {
    try {
      const response = await this._store.api.dashAPI.postShiftsToUpdate(
        newShifts
      );
      if (response) {
        successToast("Saved changes sucessfully.");
        return true;
      }
    } catch (err) {
      errorToast("Cannot save changes.");
    }
    return false;
  }

  async postShiftsToDelete(shifts: string[]) {
    try {
      const response = await this._store.api.dashAPI.postShiftsToDelete(shifts);
      if (response) return true;
      successToast("Saved changes sucessfully.");
    } catch (err) {
      errorToast("Cannot delete shifts.");
    }
    return false;
  }

  async fetchTeamMembers(businessId: string) {
    const data = await this._store.api.dashAPI.fetchTeam(businessId);
    if (data) runInAction(() => (this.members = data));
  }

  async addTeamMember(businessId: string) {
    const response = await this._store.api.dashAPI.addTeamMember(businessId);

    console.log({ response });
  }

  // async fetchTeamShifts = async () => {
  //   // await this._store.api.dashAPI.fetch
  // }
}
