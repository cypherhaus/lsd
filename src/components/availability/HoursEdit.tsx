import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

// Components
import { ConfirmationModal } from "../common/ConfirmationModal";
import { Button } from "../common/Button";
import { TimeInput } from "../common/TimeInput";
import { ErrorLabel } from "../common/ErrorLabel";

// Constants
import { DAYS_IN_WEEK } from "../../constants/common";
import { UNSAVED_CHANGES } from "../../constants/modals";

// Icons
import { RiCloseFill, RiDeleteBinLine } from "react-icons/ri";

// Types
import { User } from "../../../types/bookings";

interface Props {
  user: User;
  setEditOpen: (v: boolean) => void;
}

export const HoursEdit = observer(({ user, setEditOpen }: Props) => {
  const { hoursView, teamStore, modalView } = useStore();
  const newShifts = [...teamStore.shifts];

  const {
    shiftValidationErrors,
    shiftsToDelete,
    shiftsToEdit,
    shiftsToAdd,
    addShiftToDelete,
    handleEditShift,
    handleAddShiftClick,
    validateAndSaveChanges,
  } = hoursView;

  console.log(hoursView.shiftsToEdit);

  const { openModal, modalOpen } = modalView;
  const { firstName, lastName } = user;

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  const handleClose = () => {
    if (
      shiftsToDelete.length === 0 &&
      shiftsToEdit.length === 0 &&
      shiftsToAdd.length === 0
    ) {
      setEditOpen(false);
    } else {
      openModal(UNSAVED_CHANGES);
    }
  };

  return (
    <>
      <div className="flex flex-col mx-24 my-12 mb-28 gap-11">
        <div className="flex flex-row items-center justify-between">
          <div className="cursor-pointer" onClick={handleClose}>
            <RiCloseFill className="text-4xl" />
          </div>
          <span className="font-button text-2xl">
            Edit Shifts for{" "}
            <span className="font-bold">
              {firstName} {lastName}
            </span>
          </span>
          <Button onClick={validateAndSaveChanges} type="submit">
            Save
          </Button>
        </div>
        <div className="flex flex-col basis-auto items-center gap-5">
          {DAYS_IN_WEEK.map((day) => {
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
                className="w-full lg:w-2/4 flex flex-row justify-center rounded-xl text-start bg-white p-6"
              >
                <span className="w-1/3 font-bold font-button text-2xl">
                  {day.fullLabel}
                </span>
                <div className="w-2/3">
                  <div
                    className="flex align-baseline font-button gap-4 justify-start items-center flex-col xl:basis-9-perc basis-11-perc"
                    key={day.label}
                  >
                    {filteredShift.map((shift) => {
                      if (shift.start_time !== null) {
                        return (
                          <div
                            key={shift.iso_weekday + "" + shift.start_time}
                            className="flex flex-col w-full gap-2"
                          >
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-row gap-2">
                                <TimeInput
                                  handleChange={handleEditShift}
                                  isStartTime={true}
                                  shift={shift}
                                  time={shift.start_time}
                                />
                                <span className="text-xl">-</span>
                                <TimeInput
                                  handleChange={handleEditShift}
                                  isStartTime={false}
                                  shift={shift}
                                  time={shift.end_time}
                                />
                              </div>
                              <div
                                onClick={() =>
                                  addShiftToDelete(shift.id as string)
                                }
                                className="flex flex-col items-end cursor-pointer"
                              >
                                <RiDeleteBinLine className="text-3xl text-brandOrange" />
                              </div>
                            </div>
                            {shiftValidationErrors?.map(
                              (s, i2) =>
                                s.shiftId === shift.id && (
                                  <ErrorLabel
                                    key={
                                      "error-" + shift.iso_weekday + "-" + i2
                                    }
                                  >
                                    {s.message}
                                  </ErrorLabel>
                                )
                            )}
                          </div>
                        );
                      }
                    })}
                    <div
                      onClick={() => handleAddShiftClick(day.number)}
                      className="font-button font-bold text-center cursor-pointer"
                    >
                      Add Shift
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modalOpen && <ConfirmationModal type={UNSAVED_CHANGES} />}
    </>
  );
});
