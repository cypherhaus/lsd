import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

// Components
import { SingleDayInEdit } from "./SingleDayInEdit";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import { Button } from "../../common/Button";

//Types
import { User } from "../../../../types/auth";
import { Day } from "../../../../types/common";

// Utils
import {
  daysInWeek,
  fieldsValidation,
  daysShiftOverlapValidation,
} from "../../../utils/time";

// Constants
import { UNSAVED_CHANGES, YES, NO } from "../../../constants/modals";

// Icons
import { RiCloseFill } from "react-icons/ri";

interface Props {
  user: User;
}

export const HoursEdit = observer(({ user }: Props) => {
  const { hoursView, modalView } = useStore();
  const { modalOpen, handleOpenModal, handleCloseModal } = modalView;
  const { firstName, lastName } = user;
  const days = daysInWeek();

  const {
    editedSomething,
    shiftsToDelete,
    newShifts,
    handleSetNewShifts,
    handleSaveChanges,
    handleCloseEditingAndResetEverything,
    handleSetShiftsEditOpen,
    handleAddValidationError,
    handleResetValidationErrors,
  } = hoursView;

  useEffect(() => {
    handleSetNewShifts();
  }, [handleSetNewShifts]);

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  const handleCloseEditing = () => {
    if (!editedSomething && shiftsToDelete.length === 0) {
      handleSetShiftsEditOpen(false);
      return;
    }
    handleOpenModal();
  };

  const handleValidateChanges = () => {
    handleResetValidationErrors();

    const newShiftsToDelete = [...shiftsToDelete];
    let newShiftsToUpdate = [...newShifts];

    newShiftsToUpdate = newShiftsToUpdate.filter(
      (obj, index) =>
        newShiftsToUpdate.findIndex((item) => item.id === obj.id) === index
    );

    const fieldsErrors = fieldsValidation(newShiftsToUpdate);
    fieldsErrors.length > 0 &&
      fieldsErrors.map((e) =>
        handleAddValidationError({
          shiftId: e.shiftId,
          message: e.message,
        })
      );

    const daysShiftOverlapErrors =
      daysShiftOverlapValidation(newShiftsToUpdate);
    daysShiftOverlapErrors.length > 0 &&
      daysShiftOverlapErrors.map((e) =>
        handleAddValidationError({
          shiftId: e.shiftId,
          message: e.message,
        })
      );

    hoursView.shiftValidationErrors.length === 0 &&
      handleSaveChanges({
        shiftsToUpdate: newShiftsToUpdate,
        shiftsToDelete: newShiftsToDelete,
      });
  };

  return (
    <>
      <div className="flex flex-col lg:mx-24 mx-5 my-12 mb-28 gap-11">
        <div className="flex flex-row items-center justify-between gap-5">
          <div className="cursor-pointer" onClick={handleCloseEditing}>
            <RiCloseFill className="text-4xl" />
          </div>
          <span className="font-button text-2xl">
            Edit Shifts for{" "}
            <span className="font-bold">
              {firstName} {lastName}
            </span>
          </span>
          <Button onClick={handleValidateChanges} type="submit">
            Save
          </Button>
        </div>
        <div className="flex flex-col basis-auto items-center gap-5">
          {days.map((day: Day) => (
            <SingleDayInEdit key={day.number} day={day} />
          ))}
        </div>
      </div>
      {modalOpen && (
        <ConfirmationModal
          title={UNSAVED_CHANGES}
          message={"Are you sure you want to cancel editing shifts?"}
          onCancel={handleCloseModal}
          onSubmit={handleCloseEditingAndResetEverything}
          cancelText={NO}
          submitText={YES}
          buttonReverse={true}
        />
      )}
    </>
  );
});
