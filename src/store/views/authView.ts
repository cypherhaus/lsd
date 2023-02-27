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

  password: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  businessName: string = "";
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

  setBusinessName = (v: string) => (this.businessName = v);

  async init(id: string) {
    // Fetch the current users profile info
    if (!this._store.authStore.currentUser) {
      await this._store.authStore.fetchProfile(id);
    }

    // Fetch all team members associated with the business
    if (
      this._store.authStore.currentUser &&
      !this._store.teamStore.members.length
    ) {
      await this._store.teamStore.fetchTeamMembers(
        this._store.authStore.currentUser.business_id
      );
    }
  }

  // Logout user
  async handleLogoutClick() {
    const success = await this._store.authStore.logout();
    if (success) Router.push("/");
  }

  // Login user
  async handleLoginClick(values: SignInValues) {
    const response = await this._store.authStore.login(values);
    if (response) Router.push("/dashboard/hours");
  }

  //  Signs up a user to Supabase and creates a Lightning Wallet
  async handleSignUpClick(values: SignUpValues) {
    const success = await this._store.authStore.signUp(values);
    if (success) Router.push("/dashboard/hours");
  }

  async handleBusinessInfo() {
    if (!this.businessName) {
      runInAction(() => {
        this.onboardingError = "Please enter a business name";
      });
    }
    await this._store.authStore.postBusiness(this.businessName);
  }
}
