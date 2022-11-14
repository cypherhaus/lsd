import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";

export default class AuthStore {
  private _store: Store;

  currentUser: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  // Sign Up User
  async signUp(email: string, username: string, password: string) {
    try {
      const response = await this._store.api.authAPI.signUp(
        email,
        username,
        password
      );

      if (response?.session) {
        this._store.api.lightningAPI.setToken(response.session.access_token);
      }

      if (response?.user) {
        this.currentUser = response.user;
        return response;
      }
    } catch (err) {
      console.log("Error signing up user", username);
    }
  }

  // Login User
  async login(email: string, password: string) {
    try {
      const response = await this._store.api.authAPI.login(email, password);

      if (response?.user) {
        this.currentUser = response.user;
      }

      if (response?.session) {
        this._store.api.lightningAPI.setToken(response.session.access_token);
      }
    } catch (err) {
      console.log("Error logging in user", email);
    }
  }

  // Logout User
  async logout() {
    try {
      await this._store.api.authAPI.signOut();
      runInAction(() => {
        this.currentUser = null;
      });
      await this._store.lightningStore.clearWallet();
      this._store.api.lightningAPI.clearToken();
    } catch (err) {
      console.log({ err });
    }
  }

  // Set User in state
  async setUser(session: any) {
    this._store.api.lightningAPI.setToken(session.access_token);
    runInAction(() => {
      this.currentUser = session.user;
    });
  }
}
