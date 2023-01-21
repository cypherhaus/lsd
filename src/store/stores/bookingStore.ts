import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import { Booking, Hours } from "../../../types/bookings";

export default class BookingStore {
  private _store: Store;

  profile: any | null = null;
  businessHours: Hours[] = [];
  bookings: Booking[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async fetchProfile(id: string) {
    try {
      const response = await this._store.api.dogmoAPI.fetchProfile(id);
      if (response) {
        this.profile = response;
      }
      return response;
    } catch (err) {
      console.log("Error fetching profile", id);
    }
  }

  async fetchBookings(userId: string) {
    const bookings = await this._store.api.dogmoAPI.fetchBookings(userId);
    runInAction(() => {
      this.bookings = bookings;
    });

    return bookings;
  }
}
