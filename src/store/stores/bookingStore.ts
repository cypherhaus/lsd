/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import {
  AddBlockedTime,
  BlockedTime,
  Booking,
  Hours,
} from "../../../types/bookings";

export default class BookingStore {
  private _store: Store;

  profile: any | null = null;
  businessHours: Hours[] = [];
  bookings: Booking[] = [];
  blockedTimes: BlockedTime[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async fetchBlockedTimes(userId: string) {
    const res = await this._store.api.dashAPI.fetchBlockedTimes(userId);

    this.blockedTimes = res.data;
  }

  async fetchProfile(id: string) {
    try {
      const response = await this._store.api.dashAPI.fetchProfile(id);
      if (response) {
        this.profile = response;
      }
      return response;
    } catch (err) {
      console.log("Error fetching profile", id);
    }
  }

  async fetchShifts(id: string) {
    try {
      const response = await this._store.api.dashAPI.fetchShifts(id);
      console.log({ response });
      return response;
    } catch (err) {
      console.log("Error fetching profile", id);
    }
  }

  async fetchBookings(userId: string) {
    const bookings = await this._store.api.dashAPI.fetchBookings(userId);
    runInAction(() => {
      this.bookings = bookings;
    });

    return bookings;
  }

  async addBlockedTime(blockedTime: AddBlockedTime) {
    const result = await this._store.api.dashAPI.addBlockedTime(blockedTime);
    return result;
  }
}
