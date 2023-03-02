import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { RiEditLine } from 'react-icons/ri';
import { Shift } from '../../../types/bookings';

interface Props {
  user: {
    firstName: string
    lastName: string
  }
}

export const HoursNavigation = observer(({ user }: Props) => {

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

  const sumOfShiftsPerDay = (): Shift[] => {
    const shifts = teamStore?.shifts;
    
    teamStore?.shifts.map((shift, index) => {
      shifts.map((newShift, newIndex) => {
        if(newShift.id !== shift.id){
          if(newShift.iso_weekday === shift.iso_weekday){
            shifts.splice(index, 1)
            shifts[index] = [newShift, shift];
          }
        }
      })
    })
    return shifts;
  }

  return (
    <div className="pt-5 pb-5">
      <table className="flex flex-wrap flex-row lg:flex-col border-separate border-spacing-3">
        <thead className="flex flex-col lg:justify-around">
          <tr className='text-3xl flex gap-2 ml-10 lg:ml-0 mr-6 lg:mr-0 lg:flex-wrap flex-col lg:flex-row'>
            <th className='xl:basis-9-perc basis-11-perc'></th>
            <th className='xl:basis-9-perc basis-11-perc'>Mon</th>
            <th className='xl:basis-9-perc basis-11-perc'>Tue</th>
            <th className='xl:basis-9-perc basis-11-perc'>Wed</th>
            <th className='xl:basis-9-perc basis-11-perc'>Thu</th>
            <th className='xl:basis-9-perc basis-11-perc'>Fri</th>
            <th className='xl:basis-9-perc basis-11-perc'>Sat</th>
            <th className='xl:basis-9-perc basis-11-perc'>Sun2</th>
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
            {sumOfShiftsPerDay().map((shift: Shift | Shift[]) => {

              const oneShift = shift as Shift;
              const multiShift = shift as Shift[];

              if(multiShift.length !== undefined) {
                return (
                  <td className="flex align-baseline gap-2 justify-start items-center flex-col xl:basis-9-perc basis-11-perc" key={'multi'+multiShift[0].iso_weekday}>
                    {multiShift.map((singleShift: Shift) => {
                      const { start_time, end_time } = singleShift;
                      return(
                        <span key={singleShift.id} className="rounded-md text-center bg-white px-3 py-2">
                          {timeConverter(start_time as string) + ' - ' + timeConverter(end_time as string)}
                        </span>)
                    })}
                  </td>)
              }

              if(oneShift.start_time) {
                const { start_time, end_time } = oneShift; 
                return (
                  <td className="flex flex-wrap align-baseline content-start justify-around xl:basis-9-perc basis-11-perc" key={oneShift.id}>
                    <span className="rounded-md text-center bg-white px-3 py-2">
                      {timeConverter(start_time as string) + ' - ' + timeConverter(end_time as string)}
                    </span>
                  </td>)
              }

              return <td className="flex flex-wrap align-baseline content-start justify-around xl:basis-9-perc basis-11-perc" key={oneShift.id}>
                <span className="rounded-md text-center bg-white px-3 py-2">
                  NONE
                </span>
              </td>
              })
            }
            <td className="align-top">
              <RiEditLine className="text-3xl text-brandOrange" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ); 
});
