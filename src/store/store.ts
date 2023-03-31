import { makeAutoObservable } from "mobx";
import { AuthAPI, DashAPI } from "../api";
import { AuthStore, LightningStore } from "./stores";
import { AuthView } from "./views";
import DashboardView from "./views/dashboardView";
import LightningApi from "../api/lightningApi";

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
    lightningAPI: LightningApi;
  };

  constructor(authAPI: AuthAPI, dashAPI: DashAPI, lightningAPI: LightningApi) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { authAPI, dashAPI, lightningAPI };
  }
}

export const createStore = () => {
  const authAPI = new AuthAPI();
  const dashAPI = new DashAPI();
  const lightningAPI = new LightningApi();
  return new Store(authAPI, dashAPI, lightningAPI);
};
