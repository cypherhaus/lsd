import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class ShopfrontStore {
  private _store: Store;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }
}
