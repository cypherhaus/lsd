import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class LightningStore {
  private _store: Store;

  wallet: any | null = null;
  charge: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  async createCharge(amount: string, userId: string) {
    const data = await this._store.api.lightningAPI.createCharge(
      amount,
      userId
    );
    if (data?.data) this.charge = data?.data;
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
