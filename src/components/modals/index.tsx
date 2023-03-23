import React from "react";
import RModal from "react-modal";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

RModal.setAppElement("#__next");

export const Modal = observer(() => {
  const { modalView } = useStore();

  return (
    <RModal
      style={customStyles}
      isOpen={modalView.modalOpen}
      contentLabel="Example Modal"
    ></RModal>
  );
});
