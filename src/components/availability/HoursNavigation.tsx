import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

export const HoursNavigation = observer(() => {
  const { hoursView, authStore, teamStore } = useStore();

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  const { first_name, last_name, id } = authStore.currentUser;

  useEffect(() => {
    hoursView.fetchShifts('f53eefda-eb16-4e1d-8023-dd126b7183bb');
  }, [hoursView, id]);

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
    <div className="flex gap-2">
      <table className="table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-32 flex flex-col gap-2 items-center">
              <div className="flex flex-row relative w-12 h-12 bg-brandLavendar rounded-full justify-center items-center text-center p-5 shadow-xl">
                <span>{first_name[0]}</span>
                <span>{last_name[0]}</span>
              </div>
              <div className="flex flex-col">
                <span>{first_name}</span> 
                <span>{last_name}</span>
              </div>
            </td>
            {teamStore.shifts.map((shift) => 
              <td key={shift.id}>
                <span className="rounded-md bg-brandWhite px-3 py-2">
                  {timeConverter(shift.start_time) + ' - ' + timeConverter(shift.end_time)}
                </span>
              </td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
});
