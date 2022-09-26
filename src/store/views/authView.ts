import { makeAutoObservable } from "mobx";
import { Store } from "../store";

export default class AuthView {
  private _store: Store;

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
    // Create a new user on Supabase Authentication
    // const userId = await this._store.authStore.signUp(
    //   email,
    //   username,
    //   password
    // );

    // Using new user id, create a wallet associated with it
    // console.log("create user with id", userId);

    this._store.lightningStore.createWallet();
  }
}
