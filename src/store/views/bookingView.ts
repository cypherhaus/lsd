import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import { Booking } from "../../../types/bookings";
import moment, { Moment } from "moment";

export default class BookingView {
  private _store: Store;

  userId: string | null = "";
  activeDay: Moment | null = null;
  dayBookings: Booking[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;

    this.activeDay = moment();
  }

  fetchProfile = async (user: string) => {
    const result = await this._store.bookingStore.fetchProfile(user);
  };

  fetchBookings = async (user: string) => {
    await this._store.bookingStore.fetchBookings(user);
    this.setActiveDayBookings();
  };

  setActiveDayBookings = () => {
    this.dayBookings = this._store.bookingStore.bookings.filter((booking) =>
      moment(booking.start).isSame(this.activeDay, "day")
    );
  };

  nextDay = () => {
    this.activeDay = moment(this.activeDay).add(1, "days");
    this.setActiveDayBookings();
  };

  prevDay = () => {
    this.activeDay = moment(this.activeDay).subtract(1, "days");
    this.setActiveDayBookings();
  };
}
