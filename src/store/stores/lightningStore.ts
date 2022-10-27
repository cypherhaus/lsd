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

  setWallet(wallet: any) {
    this.wallet = wallet;
  }

  chargeSettled() {
    this.charge = null;
  }

  clearWallet() {
    this.wallet = null;
  }

  async fetchWallet(userId: string) {
    const data = await this._store.api.lightningAPI.fetchWallet(userId);
    this.wallet = data;
  }

  async createCharge(amount: string, userId: string) {
    const data = await this._store.api.lightningAPI.createCharge(
      amount,
      userId
    );
    if (data?.data) this.charge = data?.data;
  }

  // Pay a user by username
  async payUsername(
    currentUserId: string,
    sendToUsername: string,
    amount: number
  ) {
    const data = await this._store.api.lightningAPI.payUser(
      currentUserId,
      sendToUsername,
      amount
    );

    return data;
  }

  async updateLnAddress(address: string) {
    const response = await this._store.api.lightningAPI.updateLnAddress(
      address
    );
  }

  // Withdrawal using LNURL
  async withdraw() {}

  // Create bolt12 invoice
  async generateInvoice() {}

  // Get Transactions
  async getTxs() {}
}
