import { makeAutoObservable } from "mobx";
import { AuthAPI, DashAPI } from "../api";
import { AuthStore, BookingStore, ShiftsStore } from "./stores";
import {
  AuthView,
  BookingView,
  ModalView,
  ShiftsView,
  ShopfrontView,
} from "./views";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);
  bookingStore = new BookingStore(this);
  shiftsStore = new ShiftsStore(this);

  // Views - UI interaction state
  authView = new AuthView(this);
  bookingView = new BookingView(this);
  shiftsView = new ShiftsView(this);
  modalView = new ModalView(this);
  shopfrontView = new ShopfrontView(this);

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
