import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

// Components
import { SingleDay } from "./SingleDayInEdit";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import { Button } from "../../common/Button";

//Types
import { User } from "../../../../types/auth";
import { Day } from "../../../../types/common";

// Utils
import { daysInWeek } from "../../../utils/time";

// Constants
import { UNSAVED_CHANGES, YES, NO } from "../../../constants/modals";

// Icons
import { RiCloseFill } from "react-icons/ri";

interface Props {
  user: User;
}

export const HoursEdit = observer(({ user }: Props) => {
  const { hoursView, modalView } = useStore();
  const { firstName, lastName } = user;
  const days = daysInWeek();

  const {
    editedSomething,
    shiftsToDelete,
    setNewShifts,
    handleValidateAndSaveChanges,
    handleCloseEditingAndResetEverything,
    handleSetShiftsEditOpen,
  } = hoursView;

  useEffect(() => {
    setNewShifts();
  }, [setNewShifts]);

  const { modalOpen, openModal, closeModal } = modalView;

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  const handleClose = () => {
    if (!editedSomething && shiftsToDelete.length === 0) {
      handleSetShiftsEditOpen(false);
      return;
    }
    openModal();
  };

  return (
    <>
      <div className="flex flex-col lg:mx-24 mx-5 my-12 mb-28 gap-11">
        <div className="flex flex-row items-center justify-between gap-5">
          <div className="cursor-pointer" onClick={handleClose}>
            <RiCloseFill className="text-4xl" />
          </div>
          <span className="font-button text-2xl">
            Edit Shifts for{" "}
            <span className="font-bold">
              {firstName} {lastName}
            </span>
          </span>
          <Button onClick={handleValidateAndSaveChanges} type="submit">
            Save
          </Button>
        </div>
        <div className="flex flex-col basis-auto items-center gap-5">
          {days.map((day: Day) => (
            <SingleDay key={day.number} day={day} />
          ))}
        </div>
      </div>
      {modalOpen && (
        <ConfirmationModal
          title={UNSAVED_CHANGES}
          message={"Are you sure you want to cancel editing shifts?"}
          onCancel={closeModal}
          onSubmit={handleCloseEditingAndResetEverything}
          cancelText={NO}
          submitText={YES}
          buttonReverse={true}
        />
      )}
    </>
  );
});
