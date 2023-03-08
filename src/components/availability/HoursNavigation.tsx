import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

// Constants
import { DAYS_IN_WEEK } from "../../constants/other";

//Icons
import { RiEditLine } from "react-icons/ri";

// Utils
import { formatHours } from "../../utils/time";

interface Props {
  user: {
    firstName: string;
    lastName: string;
  };
  setEditOpen: (v: any) => void;
}

export const HoursNavigation = observer(({ user, setEditOpen }: Props) => {
  const { hoursView, teamStore } = useStore();
  const { firstName, lastName } = user;

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  return (
    <div className="px-10 py-12">
      <table className="2xl:w-11/12 w-full flex flex-row flex-no-wrap rounded-lg overflow-hidden">
        <thead className="text-3xl">
          <tr className="flex flex-col flex-no wrap lg:table-row rounded-l-lg lg:rounded-none mb-2 lg:mb-0">
            <th className="p-3"></th>
            <th className="p-3"></th>
            {DAYS_IN_WEEK.map((day) => (
              <th className="p-3 text-center" key={day.label}>
                {day.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex-1 lg:flex-none">
          <tr className="flex flex-col flex-no wrap lg:table-row mb-2 lg:mb-0">
            <td className="text-red-400 p-2 hover:text-red-600 hover:font-medium cursor-pointer">
              <div
                className="cursor-pointer flex flex-col items-center"
                onClick={() => setEditOpen(true)}
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
            {DAYS_IN_WEEK.map((day) => {
              const filteredShift = teamStore?.shifts.filter(
                (shift) => shift.iso_weekday === day.number
              );
              return (
                <td className="lg:w-[12.5%] p-2 2xl:truncate" key={day.label}>
                  <div className="flex flex-col gap-2">
                    {filteredShift.map((shift) => {
                      if (shift.start_time !== null) {
                        return (
                          <span
                            key={shift.iso_weekday + "" + shift.start_time}
                            className="rounded-md text-center bg-white lg:px-3 py-1 2xl:py-2"
                          >
                            {formatHours(shift.start_time) +
                              " - " +
                              formatHours(shift.end_time)}
                          </span>
                        );
                      }
                    })}
                    {filteredShift.length === 0 && (
                      <span className="text-2xl font-button text-center lg:px-3 py-1 lg:py-2">
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
