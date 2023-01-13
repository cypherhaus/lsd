import { supabase } from "../config/supabase";
import { errorToast } from "../utils/toast";

export default class AuthAPI {
  signUp = async (email: string, password: string) => {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      });

      return data;
    } catch (error) {
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
      console.log({ error });
    }
  };
  signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) return true;
      return false;
    } catch (error) {
      console.log({ error });
    }
  };
}
