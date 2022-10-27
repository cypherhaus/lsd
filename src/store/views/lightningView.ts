import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class LightningView {
  private _store: Store;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  // Handle clicking pay user
  async handlePayUsername(
    currentUserId: string,
    sendToUsername: string,
    amount: number
  ) {
    const response = await this._store.lightningStore.payUsername(
      currentUserId,
      sendToUsername,
      amount
    );

    return response;
  }

  async updateLnAddress(address: string) {
    await this._store.lightningStore.updateLnAddress(address);

    // return response;
  }

  // Handle click fund account
  handleFundClick() {}

  // handle clicking..
  handleGetWallet() {}

  // handle clicking..
  handleGetTx() {}
}
