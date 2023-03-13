import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

// Components
import { NavigationDay } from "./NavigationDay";

// Types
import { User } from "../../../../types/auth";

//Icons
import { RiEditLine } from "react-icons/ri";

// Utils
import { daysInWeek } from "../../../utils/time";

interface Props {
  user: User;
}

export const HoursNavigation = observer(({ user }: Props) => {
  const { hoursView, teamStore } = useStore();
  const { shifts } = teamStore;
  const { handleSetShiftsEditOpen, handleStopLoading } = hoursView;
  const { firstName, lastName } = user;
  const days = daysInWeek();

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  useEffect(() => {
    if (shifts) handleStopLoading();
  }, [shifts, handleStopLoading]);

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
            {days.map((day) => (
              <NavigationDay key={day.label} day={day} />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
});
