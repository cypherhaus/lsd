import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { UNSAVED_CHANGES } from "../../constants/modals";
import { Button } from "./Button";

interface ModalProps {
    type: string;
}

export const ConfirmationModal = observer(({ type }: ModalProps) => {

    const { modalView } = useStore();
    const { closeModal } = modalView;
  
    return (
      <div
        className={"z-20 absolute md:top-[30%] lg:right-[38%] lg:left-[38%] md:right-[25%] md:left-[25%] top-[20%] right-[5%] left-[5%] bg-white rounded-xl px-12 py-7"}
      >
        {type === UNSAVED_CHANGES && (
            <div className="flex flex-col">
                <span>Unsaved changes</span>
                <span>Are you sure you want to cancel editing shifts?</span>
                <div className="flex flex-row">
                    <Button 
                        onClick={() => closeModal()}>
                            No
                    </Button>
                    <Button 
                        onClick={() => closeModal()}
                        variant="white">
                            Yes
                    </Button>
                </div>
            </div>
        )}
      </div>
    );
});
  