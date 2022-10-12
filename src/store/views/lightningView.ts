import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class LightningView {
  private _store: Store;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  // Handle clicking pay user
  handlePayUsername() {}

  // Handle click fund account
  handleFundClick() {}

  // handle clicking..
  handleGetWallet() {}

  // handle clicking..
  handleGetTx() {}
}
