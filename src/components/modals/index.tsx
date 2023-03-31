import React from "react";
import RModal from "react-modal";
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
  return (
    <RModal style={customStyles} isOpen={false} contentLabel="Example Modal" />
  );
});
