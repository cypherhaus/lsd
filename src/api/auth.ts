/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { supabase } from "../config/supabase";

// Types
import { SignUpValues, SignInValues } from "../../types/auth";

// Utils
import { errorToast } from "../utils/toast";

// Constants
import { PROFILES_TABLE } from "../constants/db";

export default class AuthAPI {
  signUp = async ({ email, password, username }: SignUpValues) => {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      if (response.data?.user?.id) {
        // Update supabase table with new First and Last name
        await supabase
          .from(PROFILES_TABLE)
          .update({ username })
          .eq("id", response.data?.user?.id);
      }

      if (response) return response;
    } catch (error) {
      errorToast("Failed to signup");
      console.log({ error });
    }
  };

  postUsername = async (username: string, id: string) => {
    console.log("hey");
    const res = await supabase
      .from(PROFILES_TABLE)
      .update({ username })
      .eq("id", id);
    if (res?.status === 204) return true;
    return false;
  };

  login = async ({ email, password }: SignInValues) => {
    try {
      const data = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return data;
    } catch (error) {
      errorToast("Failed to login");
      console.log({ error });
    }
  };
  signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) return true;
      return false;
    } catch (error) {
      errorToast("Failed to signout");
      console.log({ error });
    }
  };
}
