import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { RiEditLine } from 'react-icons/ri';

interface Props {
  firstName: string
}

export const HoursNavigation = observer(({ firstName }: Props) => {

  const { hoursView, teamStore } = useStore();

  console.log(firstName)

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  const timeConverter = (time: number) => {
    if(time) {
      let timeString = time.toString();
      const [hourString, minute] = timeString.split(":");
      const hour = +hourString % 24;
      return (hour % 12 || 12) + "" + (hour < 12 ? "am" : "pm");
    }
    return null;
  }

    return (
      <div className="flex gap-2 pt-6 pb-5">
        <table className="border-separate border-spacing-3">
          <thead>
            <tr className='text-2xl'>
              <th></th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-32 flex flex-col gap-2 items-center">
                <div className="flex flex-row relative w-12 h-12 bg-brandLavendar rounded-full justify-center items-center text-center p-5">
                  <span>{firstName[0]}</span>
                  <span>{firstName[0]}</span>
                </div>
                <div className="flex flex-col">
                  <span>{firstName}</span> 
                  <span>{firstName}</span>
                </div>
              </td>
              {teamStore.shifts.map((shift) => {
                if(shift.start_time) {
                  return (
                    <td key={shift.id}>
                      <span className="rounded-md bg-brandWhite px-3 py-2">
                        {timeConverter(shift.start_time) + ' - ' + timeConverter(shift.end_time)}
                      </span>
                    </td>)}
                  return <td key={shift.id}></td>
                })}
              <td>
                <RiEditLine className="text-3xl text-brandOrange" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ); 
});
