/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import Router from "next/router";

// Types
import { SignInValues, SignUpValues } from "../../../types/auth";

// Constants
import { PAGE_1_ROUTE } from "../../constants/routes";

export default class AuthView {
  private _store: Store;

  password = "";
  email = "";
  username = "";
  onboardingError: string | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  // Setters
  setPassword = (v: string) => (this.password = v);
  setEmail = (v: string) => (this.email = v);

  setUsername = (v: string) => {
    runInAction(() => {
      this.onboardingError = null;
      this.username = v;
    });
  };

  async init(id: string) {
    const { authStore } = this._store;
    if (!authStore.currentUser) authStore.fetchProfile(id);
  }

  // Logout user
  async handleLogoutClick() {
    const success = await this._store.authStore.logout();
    if (success) Router.push("/");
  }

  // Login user
  async handleLoginClick(values: SignInValues) {
    await this._store.authStore.login(values);
  }

  async handleSignUpClick(values: SignUpValues) {
    await this._store.authStore.signUp(values);
  }

  async handleUsername() {
    if (!this.username) {
      runInAction(() => {
        this.onboardingError = "Please enter a business name";
      });
      return;
    }

    const success = await this._store.authStore.postUsername(this.username);
    if (success) Router.push(PAGE_1_ROUTE);
  }
}
