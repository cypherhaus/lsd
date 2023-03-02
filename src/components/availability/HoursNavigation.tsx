import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { RiEditLine } from 'react-icons/ri';

// Constants
import { DAYS_IN_WEEK } from '../../constants/other';

interface Props {
  user: {
    firstName: string
    lastName: string
  },
  setEditOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

export const HoursNavigation = observer(({ user, setEditOpen }: Props) => {

  const { hoursView, teamStore } = useStore();
  const { firstName, lastName } = user;

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  const timeConverter = (time: string) => {
    if(time) {
      const [hourString, minute] = time.split(":");
      const hour = +hourString % 24;
      return (hour % 12 || 12) + "" + (hour < 12 ? "am" : "pm");
    }
    return null;
  }

  return (
    <div className="pt-3 px-1">
      <table className="flex flex-wrap flex-row lg:flex-col border-separate border-spacing-3">
        <thead className="flex flex-col lg:justify-around">
          <tr className='text-3xl flex gap-2 ml-10 lg:ml-0 mr-6 lg:mr-0 lg:flex-wrap flex-col lg:flex-row'>
            <th className='xl:basis-9-perc basis-11-perc'></th>
            {DAYS_IN_WEEK.map(day => <th key={day.label} className='xl:basis-9-perc basis-11-perc'>{day.label}</th>)}
            <th className='xl:basis-9-perc basis-11-perc'></th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-wrap gap-2 flex-col lg:flex-row">
            <td className="w-32 flex flex-col justify-around content-start gap-2 items-center align-baseline xl:basis-9-perc basis-11-perc">
              <div className="flex flex-row relative w-12 h-12 bg-brandLavendar rounded-full justify-center items-center text-center p-5">
                <span>{firstName[0]}</span>
                <span>{lastName[0]}</span>
              </div>
              <div className="flex flex-col">
                <span>{firstName}</span> 
                <span>{lastName}</span>
              </div>
            </td>
            {DAYS_IN_WEEK.map((day) => {
              const filteredShift = teamStore?.shifts.filter((shift) => shift.iso_weekday === day.number)
              return(
                <td className="flex align-baseline gap-2 justify-start items-center flex-col xl:basis-9-perc basis-11-perc" key={day.label}>
                  {filteredShift.map((shift) => {
                    if(shift.start_time !== null){
                      return(
                        <span key={shift.iso_weekday+''+shift.start_time} className="rounded-md text-center bg-white px-3 py-2">
                          {timeConverter(shift.start_time) + ' - ' + timeConverter(shift.end_time)}
                        </span>)
                    }
                  })}
                </td>)
            })}
            <td className="align-top">
              <div className="cursor-pointer" onClick={() => setEditOpen(true)}>
                <RiEditLine className="text-3xl text-brandOrange" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ); 
});
