/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";

export default class ModalView {
  private _store: Store;

  modalOpen = false;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  closeModal = () => {
    runInAction(() => {
      this.modalOpen = false;
    });
  };

  openModal = () => {
    runInAction(() => {
      this.modalOpen = true;
    });
  };
}
