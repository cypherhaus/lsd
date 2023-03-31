import { makeAutoObservable } from "mobx";
import { AuthAPI, DashAPI } from "../api";
import { AuthStore, LightningStore } from "./stores";
import { AuthView } from "./views";
import DashboardView from "./views/dashboardView";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);
  lightningStore = new LightningStore(this);

  // Views - UI interaction state
  authView = new AuthView(this);
  dashboardView = new DashboardView(this);

  api: {
    authAPI: AuthAPI;
    dashAPI: DashAPI;
  };

  constructor(authAPI: AuthAPI, dashAPI: DashAPI) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { authAPI, dashAPI };
  }
}

export const createStore = () => {
  const authAPI = new AuthAPI();
  const dashAPI = new DashAPI();
  return new Store(authAPI, dashAPI);
};
