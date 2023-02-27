/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable } from "mobx";
import { Store } from "../store";
import moment, { Moment } from "moment";

export default class BookingView {
  private _store: Store;

  activeDay: Moment | null = null;

  // Ignore this for now - To be used later
  // userId: string | null = "";
  // dayBookings: Booking[] = [];
  // dayBlockedTimes: BlockedTime[] = [];
  // addBlockDay: Moment | null = null;
  // blockedTimeStart: Moment | null = null;
  // blockedTimeEnd: Moment | null = null;
  // dayTimeBlocks: DayTimeBlock[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;

    this.activeDay = moment();
  }

  nextDay = () => {
    this.activeDay = moment(this.activeDay).add(1, "days");
  };

  prevDay = () => {
    this.activeDay = moment(this.activeDay).subtract(1, "days");
  };

  // Ignore this for now - To be used later

  // addBlockClick = () => {
  //   this._store.modalView.openModal(ADD_BLOCK_MODAL);
  //   if (this.activeDay) {
  //     this.blockedTimeStart = this.activeDay
  //       .clone()
  //       .set("hour", 9)
  //       .set("minute", 0)
  //       .set("second", 0);
  //     this.blockedTimeEnd = this.activeDay
  //       .clone()
  //       .set("hour", 17)
  //       .set("minute", 0)
  //       .set("second", 0);
  //   }
  // };

  // setBlockTimeStart = (v: any) => {
  //   runInAction(() => {
  //     this.blockedTimeStart = v.moment;
  //   });
  // };

  // setBlockTimeEnd = (v: any) => {
  //   runInAction(() => {
  //     this.blockedTimeEnd = v.moment;
  //   });
  // };

  // handleAddBlock = async (userId: string) => {
  //   if (!this.blockedTimeEnd || !this.blockedTimeStart) return;
  //   const res = await this._store.bookingStore.addBlockedTime({
  //     start: this.blockedTimeStart,
  //     end: this.blockedTimeEnd,
  //     user_id: userId,
  //   });

  //   if (res) {
  //     this._store.modalView.closeModal();
  //     this.fetchBlockedTimes(userId);
  //   }
  // };

  // fetchBookings = async (user: string) => {
  //   await this._store.bookingStore.fetchBookings(user);
  //   this.setActiveDayBookings();
  //   this.setDayTimeBlocks();
  // };

  // fetchBlockedTimes = async (userId: string) => {
  //   await this._store.bookingStore.fetchBlockedTimes(userId);
  //   this.setActiveDayBlockedTimes();
  //   this.setDayTimeBlocks();
  // };

  // setActiveDayBookings = () => {
  //   this.dayBookings = this._store.bookingStore.bookings.filter((booking) =>
  //     moment(booking.start).isSame(this.activeDay, "day")
  //   );
  // };

  // setActiveDayBlockedTimes = () => {
  //   this.dayBlockedTimes = this._store.bookingStore.blockedTimes.filter(
  //     (booking) => moment(booking.start).isSame(this.activeDay, "day")
  //   );
  // };

  // setDayTimeBlocks = () => {
  //   const bookings = this._store.bookingStore.bookings
  //     .filter((booking) => moment(booking.start).isSame(this.activeDay, "day"))
  //     .map((booking) => {
  //       return { ...booking, type: "booking" };
  //     });

  //   const blockedTimes = this._store.bookingStore.blockedTimes
  //     .filter((booking) => moment(booking.start).isSame(this.activeDay, "day"))
  //     .map((block) => {
  //       return { ...block, type: "blocked" };
  //     });

  //   const allBlocks = [...blockedTimes, ...bookings];

  //   runInAction(() => {
  //     this.dayTimeBlocks = allBlocks.sort((a, b) =>
  //       moment(a.start).diff(b.start)
  //     ) as DayTimeBlock[];
  //   });
  // };
}
