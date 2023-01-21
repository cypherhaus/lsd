import { makeAutoObservable } from "mobx";
import { AuthAPI, DogmoAPI } from "../api";
import { AuthStore, BookingStore, AvailabilityStore } from "./stores";
import { AuthView, BookingView, AvailabilityView } from "./views";

export class Store {
  // Child Stores
  authStore = new AuthStore(this);
  bookingStore = new BookingStore(this);
  availabilityStore = new AvailabilityStore(this);

  // Views - UI interaction state
  authView = new AuthView(this);
  bookingView = new BookingView(this);
  availabilityView = new AvailabilityView(this);

  api: {
    authAPI: AuthAPI;
    dogmoAPI: DogmoAPI;
  };

  constructor(authAPI: AuthAPI, dogmoAPI: DogmoAPI) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this.api = { authAPI, dogmoAPI };
  }
}

export const createStore = () => {
  const authAPI = new AuthAPI();
  const dogmoAPI = new DogmoAPI();
  return new Store(authAPI, dogmoAPI);
};
