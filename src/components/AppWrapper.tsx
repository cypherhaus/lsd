import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { Modal } from "./modals";
import { useEffect } from "react";

export const AppWrapper = observer(({ children }: any) => {
  useEffect(() => {}, []);

  return (
    <>
      <Toaster />
      <Modal />
      {children}
    </>
  );
});
