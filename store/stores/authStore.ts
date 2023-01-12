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

      if (response) {
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
    } catch (err) {
      console.log({ err });
    }
  }

  // Set User in state
  async setUser(session: any) {
    runInAction(() => {
      this.currentUser = session.user;
    });
  }
}
