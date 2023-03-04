import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

// Components
import { Button } from "./Button";

// Constants
import { UNSAVED_CHANGES } from "../../constants/modals";

interface ModalProps {
    type: string;
}

export const ConfirmationModal = observer(({ type }: ModalProps) => {

    const { modalView, hoursView } = useStore();
    const { resetEverythingPendingInStore } = hoursView;
    const { closeModal } = modalView;
  
    return (
      <div
        className={"z-20 absolute md:top-[30%] lg:right-[38%] lg:left-[38%] md:right-[25%] md:left-[25%] top-[20%] right-[5%] left-[5%] bg-white rounded-xl px-12 py-7"}
      >
        {type === UNSAVED_CHANGES && (
            <div className="flex flex-col items-center gap-3">
                <span className="text-2xl font-bold text-center text-brandOrange">Unsaved Changes</span>
                <div className="flex flex-col text-center gap-5">
                <span>Are you sure you want to cancel editing shifts?</span>
                <div className="w-full flex flex-row justify-around gap-4">
                    <Button 
                        onClick={() => closeModal()}>
                            No
                    </Button>
                    <Button 
                        onClick={resetEverythingPendingInStore}
                        variant="white">
                            Yes
                    </Button>
                </div>
                </div>
            </div>
        )}
      </div>
    );
});
  