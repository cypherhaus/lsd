import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import moment, { Moment } from "moment";

export default class AvailabilityView {
  private _store: Store;

  weekStart: Moment | null = null;
  weekEnd: Moment | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;

    this.resetWeek();
  }

  fetchAvailability = async (user: string) => {
    const result = await this._store.availabilityStore.fetchAvailability(user);
  };

  prevWeek = () => {
    if (!this.weekStart || !this.weekEnd) return;
    this.weekStart = this.weekStart.clone().subtract(7, "days");
    this.weekEnd = this.weekEnd.clone().subtract(7, "days");
  };

  nextWeek = () => {
    if (!this.weekStart || !this.weekEnd) return;
    this.weekStart = this.weekStart.clone().add(7, "days");
    this.weekEnd = this.weekEnd.clone().add(7, "days");
  };

  resetWeek = () => {
    this.weekStart = moment().startOf("week");
    this.weekEnd = moment().endOf("week");
  };
}
