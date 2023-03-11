import React from "react";
import { observer } from "mobx-react-lite";

// Components
import { Button } from "../common/Button";

// Types
import { ModalProps } from "../../../types/common";

// Constants
import { BUTTON_VARIANT } from "../../constants/common";

export const ConfirmationModal = observer(
  ({
    title,
    message,
    onCancel,
    onSubmit,
    cancelText,
    submitText,
    buttonReverse = false,
  }: ModalProps) => {
    return (
      <div
        className={
          "z-20 absolute md:top-[30%] lg:right-[38%] lg:left-[38%] md:right-[25%] md:left-[25%] top-[20%] right-[5%] left-[5%] bg-white rounded-xl px-12 py-7"
        }
      >
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-bold text-center text-brandOrange">
            {title}
          </span>
          <div className="flex flex-col text-center gap-5">
            <span>{message}</span>
            <div className="flex flex-row gap-4">
              <div className="w-1/2 flex flex-col">
                <Button onClick={buttonReverse ? onCancel : onSubmit}>
                  {buttonReverse ? cancelText : submitText}
                </Button>
              </div>
              <div className="w-1/2 flex flex-col">
                <Button
                  onClick={buttonReverse ? onSubmit : onCancel}
                  variant={BUTTON_VARIANT.WHITE}
                >
                  {buttonReverse ? submitText : cancelText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
