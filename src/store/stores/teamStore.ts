/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import { AddShift, Hours, Shift, ShiftSingle } from "../../../types/bookings";
import { Moment } from "moment";
import { Profile } from "../../../types/members";

export default class TeamStore {
  private _store: Store;

  bookings: Hours[] = [];
  shifts: Shift[] = [];
  shiftSingles: ShiftSingle[] = [];

  members: Profile[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async fetchShifts(id: string) {
    this.shifts = await this._store.api.dashAPI.fetchShifts(id);
  }

  async addShift(shift: AddShift) {
    await this._store.api.dashAPI.addShift(shift);
  }

  async updateShifts(newShifts: any) {
    await this._store.api.dashAPI.updateShifts(newShifts);
  }

  async deleteShiftById(id: string, date?: Moment, userId?: string) {
    if (date) await this._store.api.dashAPI.deleteShiftOnce(id, date, userId);
    if (!date) await this._store.api.dashAPI.deleteShift(id);
  }

  async deleteOneTimeShift(id: string) {
    await this._store.api.dashAPI.deleteShift(id);
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
