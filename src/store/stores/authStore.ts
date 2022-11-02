import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";

export default class AuthStore {
  private _store: Store;

  currentUser: any | null = null;

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
      const { user, session } = await this._store.api.authAPI.signUp(
        email,
        username,
        password
      );
      this.currentUser = user;

      this._store.api.lightningAPI.setToken(session.access_token);
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
      const { user, session } = await this._store.api.authAPI.login(
        email,
        password
      );
      this.currentUser = user;
      this._store.api.lightningAPI.setToken(session.access_token);
    } catch (err) {
      console.log("Error logging in user", email);
    }
  }

  async logout() {
    try {
      await this._store.api.authAPI.signOut();
      runInAction(() => {
        this.currentUser = null;
      });
      await this._store.lightningStore.clearWallet();

      this._store.api.lightningAPI.clearToken();
      window.open("/");
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
