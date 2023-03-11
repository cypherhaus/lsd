/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import Router from "next/router";
import { SignInValues, SignUpValues } from "../../../types/auth";

export default class AuthView {
  private _store: Store;

  password = "";
  email = "";
  firstName = "";
  lastName = "";
  businessName = "";
  onboardingError: string | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
  }

  // Setters
  setPassword = (v: string) => (this.password = v);
  setEmail = (v: string) => (this.email = v);
  setLastName = (v: string) => (this.lastName = v);
  setFirstName = (v: string) => (this.firstName = v);

  setBusinessName = (v: string) => {
    this.onboardingError = null;
    this.businessName = v;
  };

  async init(id: string) {
    // Fetch the current users profile info
    !this._store.authStore.currentUser &&
      (await this._store.authStore.fetchProfile(id));

    // Fetch all team members associated with the business
    this._store.authStore.currentUser &&
      !this._store.teamStore.members.length &&
      (await this._store.teamStore.fetchTeamMembers(
        this._store.authStore.currentUser.business_id
      ));
  }

  // Logout user
  async handleLogoutClick() {
    const success = await this._store.authStore.logout();
    success && Router.push("/");
  }

  // Login user
  async handleLoginClick(values: SignInValues) {
    await this._store.authStore.login(values);
  }

  //  Signs up a user to Supabase and creates a Lightning Wallet
  async handleSignUpClick(values: SignUpValues) {
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
    success && Router.push("/dashboard/hours");
  }
}
