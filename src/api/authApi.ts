import { supabase } from "../config/supabase";
import { errorToast } from "../utils/toast";

export default class AuthAPI {
  signUp = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      return response;
    } catch (error) {
      errorToast("Failed to signup");
      console.log({ error });
    }
  };
  login = async (email: string, password: string) => {
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
