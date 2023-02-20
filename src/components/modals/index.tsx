import React from "react";
import RModal from "react-modal";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import {
  ADD_BLOCK_MODAL,
  ADD_MODAL,
  DELETE_MODAL,
} from "../../constants/modals";
import { DeleteShift } from "./DeleteShift";
import { AddShift } from "./AddShift";
import { AddBlock } from "./AddBlock";

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
      onRequestClose={modalView.closeModal}
      isOpen={modalView.modalOpen}
      contentLabel="Example Modal"
    >
      {modalView.modalType === DELETE_MODAL && <DeleteShift />}
      {modalView.modalType === ADD_MODAL && <AddShift />}
      {modalView.modalType === ADD_BLOCK_MODAL && <AddBlock />}
    </RModal>
  );
});
