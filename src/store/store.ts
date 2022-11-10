import { makeAutoObservable } from "mobx";
import { AuthAPI, LightningAPI } from "../api";
import { AuthStore, LightningStore } from "./stores";
import { AuthView, SidebarView, DashboardView } from "./views";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);
  lightningStore = new LightningStore(this);

  // Views - UI interaction state
  authView = new AuthView(this);
  dashboardView = new DashboardView(this);
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
