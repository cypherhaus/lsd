import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class AuthView {
  private _store: Store;

  user: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  // Login user
  login(email: string, password: string) {
    this._store.authStore.login(email, password);
  }

  //  Signs up a user to Supabase and creates a Lightning Wallet
  async createUser(email: string, username: string, password: string) {
    const user = await this._store.authStore.signUp(email, username, password);

    this.user = {
      email,
      id: user.id,
    };

    console.log(this.user);
  }
}
