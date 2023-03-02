import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { RiCloseFill, RiDeleteBinLine } from 'react-icons/ri';
import { Button } from '../common/Button';

// Constants
import { DAYS_IN_WEEK } from '../../constants/other';

interface Props {
  user: {
    firstName: string
    lastName: string
  },
  setEditOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

export const HoursEdit = observer(({ user, setEditOpen }: Props) => {

  const { hoursView, teamStore } = useStore();
  const { firstName, lastName } = user;

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  return (
    <div className="flex flex-col m-4 mx-12 gap-10">
      <div className="flex flex-row items-center justify-between">
        <RiCloseFill className="text-4xl" />
        <span className="font-button text-2xl">
            Edit Shifts for <span className="font-bold">{firstName} {lastName}</span>
        </span>
        <div>
            <Button type="submit">Save</Button>
        </div>
      </div>
      <div className="flex flex-col basis-auto items-center gap-5">
        {DAYS_IN_WEEK.map((day) => {
        
        const filteredShift = teamStore?.shifts.filter((shift) => shift.iso_weekday === day.number)

        return (
            <div key={day.number} className="w-full lg:w-2/4 flex flex-row justify-center rounded-xl text-start bg-white p-6">
                <span className="w-1/3 font-bold font-button text-2xl">{day.fullLabel}</span>
                <div className="w-2/3">
                    <div className="flex align-baseline gap-2 justify-start items-center flex-col xl:basis-9-perc basis-11-perc" key={day.label}>
                        {filteredShift.map((shift) => {
                            if(shift.start_time !== null){
                            return(
                                <div 
                                    className="w-full flex flex-row" 
                                    key={shift.iso_weekday+''+shift.start_time}
                                >
                                    <span className="w-4/5 rounded-md text-center bg-white px-3 py-2">
                                        {shift.start_time + ' - ' + shift.end_time}
                                    </span>
                                    <div className="w-1/5 flex flex-col items-end">
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
  ); 
});
