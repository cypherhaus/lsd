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

  async createCharge(id: string, amount: string) {
    const data = await this._store.api.lightningAPI.createCharge(amount);
    if (data?.data?.data) this.charge = data?.data?.data;

    console.log(this.charge);

    // Callback
    // create edge function for callback which updates the entry to settled

    // Realtime update balance
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
