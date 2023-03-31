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
import { HOURS_ROUTE, START_ROUTE } from "../../constants/routes";

export default class AuthView {
  private _store: Store;

  password = "";
  email = "";
  username = "";
  businessName = "";
  onboardingError: string | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  // Setters
  setPassword = (v: string) => (this.password = v);
  setEmail = (v: string) => (this.email = v);
  setUsername = (v: string) => (this.username = v);

  setBusinessName = (v: string) => {
    this.onboardingError = null;
    this.businessName = v;
  };

  // Logout user
  async handleLogoutClick() {
    const success = await this._store.authStore.logout();
    if (success) Router.push(START_ROUTE);
  }

  // Login user
  async handleLoginClick(values: SignInValues) {
    await this._store.authStore.login(values);
  }

  async handleSignUpClick(values: SignUpValues) {
    console.log("hey");
    await this._store.authStore.signUp(values);
  }

  async handleBusinessInfo() {
    if (!this.businessName) {
      runInAction(() => {
        this.onboardingError = "Please enter a business name";
      });
      return;
    }

    const success = await this._store.authStore.postBusiness(this.businessName);
    if (success) Router.push(HOURS_ROUTE);
  }
}
