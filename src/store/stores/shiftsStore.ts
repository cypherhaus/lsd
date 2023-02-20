import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import {
  AddShift,
  Hours,
  Shift,
  ShiftException,
  ShiftSingle,
} from "../../../types/bookings";
import { Moment } from "moment";

export default class ShiftsStore {
  private _store: Store;

  bookings: Hours[] = [];
  shifts: Shift[] = [];
  shiftSingles: ShiftSingle[] = [];
  shiftExceptions: ShiftException[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async fetchShifts(id: string) {
    this.shifts = await this._store.api.dashAPI.fetchShifts(id);
    this.shiftExceptions = await this._store.api.dashAPI.fetchShiftExceptions(
      id
    );
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
}
