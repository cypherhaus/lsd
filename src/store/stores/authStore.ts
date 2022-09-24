import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Store } from "../store";
import { User } from "../../types";

export default class AuthStore {
  private _store: Store;

  currentUser: User | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  /**
   * Signup User
   */
  async signUp(email: string, username: string, password: string) {
    // try {
    //   const { user } = await this._store.api.authAPI.signUp(
    //     email,
    //     username,
    //     password
    //   );
    //   this.currentUser = user;
    // } catch (err) {
    //   console.log("Error signing up user", username);
    // }
  }

  /**
   * Login User
   */
  async login(email: string, password: string) {
    // try {
    //   const { user } = await this._store.api.authAPI.login(email, password);
    //   this.currentUser = user;
    // } catch (err) {
    //   console.log("Error logging in user", email);
    // }
  }

  async logout() {
    try {
      const data = await this._store.api.authAPI.signOut();
    } catch (err) {
      console.log({ err });
    }
  }

  async setUser(user: any) {
    runInAction(() => {
      this.currentUser = user;
    });
  }
}
