import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

// Components
import { ConfirmationModal } from "../common/ConfirmationModal";
import { Button } from "../common/Button";
import { TimeInput } from "../common/TimeInput";
import { ErrorLabel } from "../common/ErrorLabel";

//Types
import { User } from "../../../types/auth";

// Utils
import { daysInWeek } from "../../utils/time";

// Constants
import { UNSAVED_CHANGES, YES, NO } from "../../constants/modals";

// Icons
import {
  RiCloseFill,
  RiDeleteBinLine,
  RiInformationFill,
} from "react-icons/ri";

interface Props {
  user: User;
}
interface AddShiftProps {
  number: number;
}

export const HoursEdit = observer(({ user }: Props) => {
  const { hoursView, modalView } = useStore();
  const { firstName, lastName } = user;
  const days = daysInWeek();

  const {
    shiftValidationErrors,
    editedSomething,
    newShifts,
    shiftsToDelete,
    setNewShifts,
    handleAddShiftReadyToDelete,
    handleEditShift,
    handleAddShift,
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

  const AddShift = ({ number }: AddShiftProps) => (
    <div
      onClick={() => handleAddShift(number)}
      className="font-button font-bold cursor-pointer mt-3"
    >
      Add Shift
    </div>
  );

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
          {days.map((day) => {
            const filteredShift = newShifts?.filter(
              (shift) =>
                shift.iso_weekday === day.number &&
                !hoursView.shiftsToDelete?.find(
                  (shiftToDelete) => shift.id === shiftToDelete
                )
            );

            return (
              <div
                key={day.number}
                className="w-full lg:w-3/4 xl:w-3/5 2xl:w-2/4 flex flex-row justify-center rounded-xl text-start bg-white p-6 gap-5"
              >
                <span className="w-1/3 font-bold font-button text-2xl">
                  {day.fullLabel}
                </span>
                <div className="w-2/3">
                  <div
                    className="flex align-baseline font-button gap-4 justify-start flex-col xl:basis-9-perc basis-11-perc"
                    key={day.label}
                  >
                    {filteredShift.map((shift, index) => {
                      return (
                        <div
                          key={
                            shift.iso_weekday +
                            "-" +
                            shift.start_time +
                            "-" +
                            index
                          }
                          className="flex flex-col w-full gap-2"
                        >
                          <div className="flex flex-row justify-between">
                            <div className="w-[80%] flex flex-row gap-2">
                              <div className="w-full flex flex-col gap-2 items-center">
                                <div className="flex flex-row justify-between items-center self-start w-full">
                                  <div className="w-[45%]">
                                    <TimeInput
                                      handleChange={handleEditShift}
                                      isStartTime={true}
                                      shift={shift}
                                      time={shift.start_time}
                                    />
                                  </div>
                                  <span className="text-xl">-</span>
                                  <div className="w-[45%]">
                                    <TimeInput
                                      handleChange={handleEditShift}
                                      isStartTime={false}
                                      shift={shift}
                                      time={shift.end_time}
                                    />
                                  </div>
                                </div>
                                {shiftValidationErrors?.map(
                                  (s, i2) =>
                                    s.shiftId === shift.id && (
                                      <ErrorLabel
                                        key={
                                          "error-" +
                                          shift.iso_weekday +
                                          "-" +
                                          i2 +
                                          "-" +
                                          shift.start_time
                                        }
                                      >
                                        {s.message}
                                      </ErrorLabel>
                                    )
                                )}
                                {index === filteredShift.length - 1 && (
                                  <AddShift number={day.number} />
                                )}
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                handleAddShiftReadyToDelete(shift.id as string)
                              }
                              className="flex flex-col items-end cursor-pointer"
                            >
                              <RiDeleteBinLine className="text-3xl text-brandOrange" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {filteredShift.length === 0 && (
                      <div className="w-[80%] flex flex-col items-center">
                        <div className="flex flex-row gap-2">
                          <RiInformationFill className="text-3xl text-brandOrange" />
                          <span className="font-button font-bold text-lg">
                            No shifts on this day
                          </span>
                        </div>
                        <AddShift number={day.number} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
