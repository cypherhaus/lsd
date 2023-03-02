import React from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { RiEditLine } from 'react-icons/ri';
import { formatHours } from '../../utils/time';

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

  return (
    <div className="pt-3 px-1">
      <table className="border-separate border-spacing-3">
        <thead>
          <tr className='text-3xl ml-10 lg:ml-0 mr-6'>
            <th></th>
            {DAYS_IN_WEEK.map(day => <th key={day.label}>{day.label}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-28 flex flex-col justify-start content-start gap-2 items-center align-baseline">
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
                <td className="align-baseline justify-start items-center" key={day.label}>
                  <div className="flex flex-col gap-2">{filteredShift.map((shift) => {
                    if(shift.start_time !== null){
                      return(
                        <span key={shift.iso_weekday+''+shift.start_time} className="truncate rounded-md text-center bg-white px-3 py-2">
                          {formatHours(shift.start_time) + ' - ' + formatHours(shift.end_time)}
                        </span>)
                    }

                    return (
                      <span key={shift.iso_weekday+'none'} className="truncate rounded-md text-center bg-white px-3 py-2">
                        NONE
                      </span>)
                  })}</div>
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
