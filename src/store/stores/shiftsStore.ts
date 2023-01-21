import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import { Hours } from "../../../types/bookings";

export default class ShiftsStore {
  private _store: Store;

  bookings: Hours[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async fetchAvailability(id: string) {}
}
