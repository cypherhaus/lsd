import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { Modal } from "./modals";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useStore } from "../store";

export const AppWrapper = observer(({ children }: any) => {
  const { authView } = useStore();
  const sb = useSupabaseClient<any>();

  const retrieveSession = async () => {
    const {
      data: { session },
    } = await sb.auth.getSession();
    if (session) authView.init(session.user.id);
  };

  useEffect(() => {
    retrieveSession();
  }, []);

  return (
    <>
      <Toaster />
      <Modal />
      {children}
    </>
  );
});
