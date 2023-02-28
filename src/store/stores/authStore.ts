/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { errorToast } from "../../utils/toast";
import { Store } from "../store";
import { SignInValues, SignUpValues } from "../../../types/auth";

export default class AuthStore {
  private _store: Store;

  currentUser: any | null = null;

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });

    this._store = store;
  }

  async postBusiness(name: string) {
    if (!this.currentUser.id) return;
    try {
      const response = await this._store.api.dashAPI.postBusiness(
        name,
        this.currentUser.id
      );
      if (response) return true;
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
        const userProfile = await this._store.api.dashAPI.fetchProfile(response.data.user.id);
        this.currentUser = userProfile;
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
        const userProfile = await this._store.api.dashAPI.fetchProfile(response.data.user.id);
        this.currentUser = userProfile;
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
      runInAction(() => {
        this.currentUser = null;
      });
      return success;
    } catch (err) {
      console.log({ err });

      return null;
    }
  }

  async fetchProfile(id: string) {
    try {
      const data = await this._store.api.dashAPI.fetchProfile(id);

      runInAction(() => {
        this.currentUser = data;
      });
    } catch (err) {
      console.log("Error fetching profile", err);
    }
  }
}
