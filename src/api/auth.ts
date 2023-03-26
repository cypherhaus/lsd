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

import { getStripeClient } from "../config/stripe";

export default class AuthAPI {
  signUp = async ({ email, password, firstName, lastName }: SignUpValues) => {
    try {
      const stripe = await getStripeClient();

      const response = await supabase.auth.signUp({
        email,
        password,
      });

      if (response.data?.user?.id) {
        // Update supabase table with new First and Last name
        await supabase
          .from(PROFILES_TABLE)
          .update({ first_name: firstName, last_name: lastName })
          .eq("id", response.data?.user?.id);
      }

      if (response) return response;
    } catch (error) {
      errorToast("Failed to signup");
      console.log({ error });
    }
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
