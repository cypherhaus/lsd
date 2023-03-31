/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { errorToast, successToast } from "../../utils/toast";
import { Store } from "../store";
import { SignInValues, SignUpValues } from "../../../types/auth";

export default class AuthStore {
  private _store: Store;

  currentUser: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async postUsername(username: string) {
    if (!this.currentUser.id) return;
    try {
      const response = await this._store.api.authAPI.postUsername(
        username,
        this.currentUser.id
      );
      if (response) {
        this.fetchProfile(this.currentUser.id);
        successToast("Username added successfully");
        return true;
      }
    } catch (err) {
      console.log({ err });
    }
  }

  // Sign Up User
  async signUp(values: SignUpValues) {
    try {
      const response = await this._store.api.authAPI.signUp(values);
      if (response.error) {
        errorToast(response.error.message);
        return;
      }

      if (response.data) {
        successToast("Account created successfully");
        runInAction(() => (this.currentUser = response.data.user));
      }

      return null;
    } catch (err) {
      console.log("Error signing up user", values.email);
    }
  }

  // Login User
  async login(values: SignInValues) {
    try {
      const response = await this._store.api.authAPI.login(values);

      if (response.error) {
        errorToast(response.error.message);
        return;
      }

      if (response.data) {
        successToast("Signed in successfully");
        const userProfile = await this._store.api.dashAPI.fetchProfile(
          response.data.user?.id
        );
        runInAction(() => (this.currentUser = userProfile));
      }

      return null;
    } catch (err) {
      console.log("Error logging in user", values.email);
    }
  }

  // Logout User
  async logout() {
    try {
      const success = await this._store.api.authAPI.signOut();
      runInAction(() => (this.currentUser = null));
      successToast("Signed out");
      return success;
    } catch (err) {
      console.log({ err });
      return null;
    }
  }

  async fetchProfile(id: string) {
    try {
      const data = await this._store.api.dashAPI.fetchProfile(id);
      console.log({ data });
      runInAction(() => (this.currentUser = data));
    } catch (err) {
      console.log("Error fetching profile", err);
    }
  }
}
