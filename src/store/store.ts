import { makeAutoObservable } from "mobx";
import { AuthAPI, LightningAPI } from "../api";
import { AuthStore, LightningStore } from "./stores";
import { AuthView, SidebarView, WalletView } from "./views";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);
  lightningStore = new LightningStore(this);

  // Views - UI interaction state
  authView = new AuthView(this);
  walletView = new WalletView(this);
  sidebarView = new SidebarView();

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
