import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

// Components
import { EditDay } from "./EditDay";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import { Button } from "../../common/Button";
import { Loading } from "../../common/Loading";

//Types
import { User } from "../../../../types/auth";
import { Day } from "../../../../types/common";

// Utils
import { daysInWeek } from "../../../utils/time";

// Constants
import { UNSAVED_CHANGES } from "../../../constants/modals";

// Icons
import { RiCloseFill } from "react-icons/ri";

interface Props {
  user: User;
}

export const HoursEdit = observer(({ user }: Props) => {
  const { hoursView, modalView } = useStore();
  const { modalOpen, handleCloseModal } = modalView;
  const { firstName, lastName } = user;
  const days = daysInWeek();

  const {
    handleSetNewShifts,
    handleCloseEditingReset,
    handleCloseEditing,
    handleValidateChanges,
    handleStopLoading,
    loading,
    newShifts,
  } = hoursView;

  useEffect(() => {
    handleSetNewShifts();
  }, [handleSetNewShifts]);

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  useEffect(() => {
    if (newShifts.length !== 0) handleStopLoading();
  }, [newShifts, handleStopLoading]);

  return (
    <>
      {loading && <Loading />}
      <div
        className={
          loading ? "hidden" : "flex flex-col lg:mx-24 mx-5 my-12 mb-28 gap-11"
        }
      >
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
            <EditDay key={day.number} day={day} />
          ))}
        </div>
      </div>
      {modalOpen && (
        <ConfirmationModal
          title={UNSAVED_CHANGES}
          message="Are you sure you want to cancel editing shifts?"
          onCancel={handleCloseModal}
          onSubmit={handleCloseEditingReset}
          cancelText="NO"
          submitText="YES"
          buttonReverse
        />
      )}
    </>
  );
});
