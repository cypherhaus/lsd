import { supabase } from "../config/supabase";
import { errorToast } from "../utils/toast";

export default class AuthAPI {
  signUp = async (email: string, username: string, password: string) => {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (data?.user) {
        return data.user;
      }

      return null;
    } catch (error) {
      console.log({ error });
    }
  };
  login = async (email: string, password: string) => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        errorToast(error.message);
      }
      return { user, session, error };
    } catch (error) {
      console.log({ error });
    }
  };
  signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return error;
    } catch (error) {
      console.log({ error });
    }
  };
}
