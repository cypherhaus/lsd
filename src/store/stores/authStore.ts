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
    try {
      // Todo fix type
      // @ts-ignore
      const { user } = await this._store.api.authAPI.signUp(
        email,
        username,
        password
      );
      console.log({ user });
      this.currentUser = user;
      return user.id;
    } catch (err) {
      console.log("Error signing up user", username);
    }
  }

  /**
   * Login User
   */
  async login(email: string, password: string) {
    try {
      // Todo fix type
      // @ts-ignore
      const { user } = await this._store.api.authAPI.login(email, password);
      this.currentUser = user;
    } catch (err) {
      console.log("Error logging in user", email);
    }
  }

  async logout() {
    try {
      await this._store.api.authAPI.signOut();
      this.currentUser = null;
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
