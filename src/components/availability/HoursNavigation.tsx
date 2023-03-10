import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

// Types
import { User } from "../../../types/auth";

//Icons
import { RiEditLine } from "react-icons/ri";

// Utils
import { formatHours, daysInWeek } from "../../utils/time";

interface Props {
  user: User;
}

export const HoursNavigation = observer(({ user }: Props) => {
  const { hoursView, teamStore } = useStore();
  const { shifts } = teamStore;
  const { handleSetShiftsEditOpen } = hoursView;
  const { firstName, lastName } = user;
  const days = daysInWeek();

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  return (
    <div className="px-10 py-12">
      <table className="flex flex-row flex-no-wrap rounded-lg overflow-hidden">
        <thead className="text-3xl p-0 m-0">
          <tr className="flex flex-col flex-no wrap lg:table-row">
            <th></th>
            <th></th>
            {days.map((day) => (
              <th className="px-3 pb-5 text-center" key={day.label}>
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex-1 lg:flex-none">
          <tr className="flex flex-col flex-no wrap lg:table-row">
            <td className="text-red-400 p-2 hover:text-red-600 hover:font-medium cursor-pointer">
              <div
                className="cursor-pointer flex flex-col items-center"
                onClick={() => handleSetShiftsEditOpen(true)}
              >
                <RiEditLine className="text-4xl text-brandOrange" />
              </div>
            </td>
            <td className="flex 2xl:px-9 px-4 flex-col items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row w-12 h-12 bg-brandLavendar rounded-full justify-center items-center text-center p-5">
                  <span>{firstName[0]}</span>
                  <span>{lastName[0]}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span>{firstName}</span>
                  <span>{lastName}</span>
                </div>
              </div>
            </td>
            {days.map((day) => {
              const filteredShift = shifts.filter(
                (shift) => shift.iso_weekday === day.number
              );
              return (
                <td className="lg:w-[12.5%] p-2 align-top" key={day.label}>
                  <div className="flex flex-col gap-2">
                    {filteredShift.map((shift) => {
                      if (shift.start_time !== null) {
                        return (
                          <span
                            key={shift.iso_weekday + "" + shift.start_time}
                            className="rounded-md text-center bg-white lg:px-1 py-1 px-2"
                          >
                            {formatHours(shift.start_time) +
                              " - " +
                              formatHours(shift.end_time)}
                          </span>
                        );
                      }
                    })}
                    {filteredShift.length === 0 && (
                      <span className="text-2xl font-button text-center">
                        —
                      </span>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
});
