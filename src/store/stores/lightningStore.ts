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

  // Set wallet in state
  setWallet(wallet: any) {
    this.wallet = wallet;
  }

  // Rest state after settled
  chargeSettled() {
    this.charge = null;
  }

  // Reset Wallet State
  clearWallet() {
    this.wallet = null;
  }

  // Fetch user wallet
  async fetchWallet(id: string) {
    const data = await this._store.api.lightningAPI.fetchWallet(id);
    this.wallet = data;
  }

  // Create a charge
  async createCharge(amount: string) {
    const result = await this._store.api.lightningAPI.createCharge(amount);
    if (result?.data) this.charge = result?.data;
  }

  // Pay a user by username
  async payUsername(currentUserId: string, username: string, amount: string) {
    const data = await this._store.api.lightningAPI.payUser(
      currentUserId,
      username,
      amount
    );

    return data;
  }

  // Updating Lightning Address
  async updateLnAddress(address: string) {
    const response = await this._store.api.lightningAPI.updateLnAddress(
      address
    );

    return response;
  }

  // Withdrawal using LNURL
  async withdraw(amount: string) {
    const response = await this._store.api.lightningAPI.withdrawToAddress(
      amount
    );

    return response;
  }
}
