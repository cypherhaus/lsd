import { makeAutoObservable, runInAction } from "mobx";
import { errorToast } from "../../utils/toast";
import { Store } from "../store";

export default class AuthStore {
  private _store: Store;

  currentUser: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  // Sign Up User
  async signUp(email: string, password: string) {
    try {
      const response = await this._store.api.authAPI.signUp(email, password);
      if (response.error) {
        errorToast(response.error.message);
        return;
      }

      if (response.data.user) return true;
      return false;
    } catch (err) {
      console.log("Error signing up user", email);
    }
  }

  // Login User
  async login(email: string, password: string) {
    try {
      const response = await this._store.api.authAPI.login(email, password);

      if (response.error) {
        errorToast(response.error.message);
        return;
      }

      if (response.data) {
        this.currentUser = response.data.user;
        return response.data.user;
      }

      return null;
    } catch (err) {
      console.log("Error logging in user", email);
    }
  }

  // Logout User
  async logout() {
    try {
      const success = await this._store.api.authAPI.signOut();
      runInAction(() => {
        this.currentUser = null;
      });
      return success;
    } catch (err) {
      console.log({ err });

      return null;
    }
  }

  // Set User in state
  async setUser(session: any) {
    runInAction(() => {
      this.currentUser = session.user;
    });
  }
}
