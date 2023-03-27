import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { Modal } from "./modals";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../store";

export const AppWrapper = observer(({ children }: any) => {
  const router = useRouter();

  const { settingsView } = useStore();

  useEffect(() => {
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
