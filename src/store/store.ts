import { makeAutoObservable } from "mobx";
import { AuthAPI, LightningAPI } from "../api";
import { AuthStore, LightningStore } from "./stores";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);
  lightningStore = new LightningStore(this);

  // UI Logic state - all the state for all user interaction
  // discover = new DiscoverView(this);
  api: {
    authAPI: AuthAPI;
    lightningAPI: LightningAPI;
  };

  constructor(authAPI: AuthAPI, lightningAPI: LightningAPI) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { authAPI, lightningAPI };
  }
}

export const createStore = () => {
  const authAPI = new AuthAPI();
  const lightningAPI = new LightningAPI();
  return new Store(authAPI, lightningAPI);
};
