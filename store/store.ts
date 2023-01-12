import { makeAutoObservable } from "mobx";
import { AuthAPI } from "../api";
import { AuthStore } from "./stores";
import { AuthView } from "./views";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);

  // Views - UI interaction state
  authView = new AuthView(this);

  api: {
    authAPI: AuthAPI;
  };

  constructor(authAPI: AuthAPI) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { authAPI };
  }
}

export const createStore = () => {
  const authAPI = new AuthAPI();
  return new Store(authAPI);
};
