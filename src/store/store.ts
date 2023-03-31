import { makeAutoObservable } from "mobx";
import { AuthAPI, DashAPI } from "../api";
import { AuthStore } from "./stores";
import { AuthView } from "./views";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);

  // Views - UI interaction state
  authView = new AuthView(this);

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
