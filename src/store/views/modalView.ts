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

  modalOpen: boolean = false;
  modalType: string | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  closeModal = () => {
    runInAction(() => {
      this.modalOpen = false;
      this.modalType = null;
    });
  };

  openModal = (type: string) => {
    runInAction(() => {
      this.modalType = type;
      this.modalOpen = true;
    });
  };
}
