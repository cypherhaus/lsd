import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class LightningStore {
  private _store: Store;

  wallet: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  async getBalance() {}
  async getWallet() {}
}
