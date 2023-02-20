import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { Modal } from "./modals";

export const AppWrapper = observer(({ children }: any) => {
  return (
    <>
      <Toaster />
      <Modal />
      {children}
    </>
  );
});
