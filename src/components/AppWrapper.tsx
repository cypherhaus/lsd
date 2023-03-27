import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { Modal } from "./modals";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../store";
import { supabase } from "../config/supabase";

export const AppWrapper = observer(({ children }: any) => {
  const router = useRouter();
  const { settingsView, authView } = useStore();

  const rerieveSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) authView.init(data.session?.user?.id);
  };

  useEffect(() => {
    rerieveSession();

    const { subscribe } = router.query;
    if (subscribe === "true" || subscribe === "false") {
      settingsView.handleSubscribe(subscribe);
    }
  }, [router]);

  return (
    <>
      <Toaster />
      <Modal />
      {children}
    </>
  );
});
