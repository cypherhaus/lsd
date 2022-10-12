import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class LightningStore {
  private _store: Store;

  wallet: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  async createCharge(id: string, amount: string) {
    const data = await this._store.api.lightningAPI.createCharge(id, amount);
    console.log({ data });
  }

  // Pay a user by username
  async payUsername() {}

  // Withdrawal using LNURL
  async withdraw() {}

  // Create bolt12 invoice
  async generateInvoice() {}

  // Get Transactions
  async getTxs() {}
}
