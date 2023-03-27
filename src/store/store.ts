import { makeAutoObservable } from "mobx";
import { AuthAPI, DashAPI } from "../api";
import { AuthStore, BookingStore, TeamStore } from "./stores";
import {
  AuthView,
  BookingView,
  ModalView,
  HoursView,
  SettingsView,
  ShopfrontView,
} from "./views";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);
  bookingStore = new BookingStore(this);
  teamStore = new TeamStore(this);

  // Views - UI interaction state
  authView = new AuthView(this);
  bookingView = new BookingView(this);
  hoursView = new HoursView(this);
  modalView = new ModalView(this);
  shopfrontView = new ShopfrontView(this);
  settingsView = new SettingsView(this);

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
