/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class SettingsView {
  private _store: Store;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  handleSubscribe = (result: "true" | "false") => {
    console.log({ result });
    // handle subscription
  };
}
