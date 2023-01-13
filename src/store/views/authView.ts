import { makeAutoObservable } from "mobx";
import { Store } from "../store";
import Router from "next/router";

export default class AuthView {
  private _store: Store;

  user: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  // Login user
  async login(email: string, password: string) {
    const response = await this._store.authStore.login(email, password);
    if (response) Router.push("/dashboard/home");
  }

  // Logout user
  async logout() {
    const success = await this._store.authStore.logout();
    if (success) Router.push("/");
  }

  //  Signs up a user to Supabase and creates a Lightning Wallet
  async createUser(email: string, password: string) {
    const success = await this._store.authStore.signUp(email, password);
    if (success) Router.push("/dashboard/home");
  }
}
