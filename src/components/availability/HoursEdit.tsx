import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { RiCloseFill, RiDeleteBinLine } from 'react-icons/ri';
import { Button } from '../common/Button';
import { TimeInput } from '../common/TimeInput';
import { Shift } from '../../../types/bookings';
import { ConfirmationModal } from '../common/ConfirmationModal';

// Constants
import { DAYS_IN_WEEK } from '../../constants/other';
import { UNSAVED_CHANGES } from '../../constants/modals';

interface Props {
  user: {
    firstName: string
    lastName: string
  },
  setEditOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

export const HoursEdit = observer(({ user, setEditOpen }: Props) => {

    const initialShifts: Shift[] = [];
    const { hoursView, teamStore, modalView } = useStore();
    const { shiftsToDelete, editDayShifts, deleteShift } = hoursView;
    const { openModal, modalOpen } = modalView;
    const { firstName, lastName } = user;

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  /* const handleShiftInputChange = (props: Shift) => setShiftEdits([...shiftEdits, props]); */
  const handleClose = () => {
    if(shiftsToDelete.length === 0 && editDayShifts.length === 0){
      setEditOpen(false);
    } else {
      openModal(UNSAVED_CHANGES);
    }
  };

  return (
    <>
    <div className="flex flex-col m-4 mx-12 gap-10">
      <div className="flex flex-row items-center justify-between">
        <div className="cursor-pointer" onClick={() => handleClose()}>
          <RiCloseFill className="text-4xl" />
        </div>
        <span className="font-button text-2xl">
            Edit Shifts for <span className="font-bold">{firstName} {lastName}</span>
        </span>
        <div>
            <Button type="submit">Save</Button>
        </div>
      </div>
      <div className="flex flex-col basis-auto items-center gap-5">
        {DAYS_IN_WEEK.map((day) => {
        
        const filteredShift = teamStore?.shifts.filter((shift) => 
            shift.iso_weekday === day.number && !hoursView.shiftsToDelete?.find(shiftToDelete => shift.id === shiftToDelete))

        return (
            <div key={day.number} className="w-full lg:w-2/4 flex flex-row justify-center rounded-xl text-start bg-white p-6">
                <span className="w-1/3 font-bold font-button text-2xl">{day.fullLabel}</span>
                <div className="w-2/3">
                    <div className="flex align-baseline gap-4 justify-start items-center flex-col xl:basis-9-perc basis-11-perc" key={day.label}>
                        {filteredShift.map((shift) => {
                            if(shift.start_time !== null){
                            return(
                                <div 
                                    className="w-full flex flex-row justify-between" 
                                    key={shift.iso_weekday+''+shift.start_time}
                                >
                                    <div className="flex flex-row items-center gap-1 rounded-md font-button text-center bg-white px-3">
                                        <TimeInput onChange={() => handleShiftInputChange} time={shift.start_time} />
                                        <span className="text-xl">-</span>
                                        <TimeInput onChange={() => handleShiftInputChange} time={shift.end_time} />
                                    </div>
                                    <div 
                                        onClick={() => deleteShift(shift.id)} 
                                        className="flex flex-col items-end cursor-pointer">
                                            <RiDeleteBinLine className="text-3xl text-brandOrange" />
                                    </div>
                                </div>)
                            }
                        })}
                        <div
                            /* onClick={} */
                            className="font-button font-bold text-center cursor-pointer">
                                Add Shift
                        </div>
                    </div>
                </div>
            </div>
        )})}
      </div>
    </div>
    {modalOpen && <ConfirmationModal type={UNSAVED_CHANGES} />}
    </>
  ); 
});
