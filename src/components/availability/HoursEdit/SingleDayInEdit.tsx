import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

// Components
import { SingleShiftInDay } from "./SingleShiftInDay";

// Types
import { Day } from "../../../../types/common";

// Icons
import { RiInformationFill } from "react-icons/ri";

interface Props {
  day: Day;
}

interface AddShiftProps {
  number: number;
}

export const SingleDayInEdit = observer(({ day }: Props) => {
  const { hoursView } = useStore();
  const { label, fullLabel, number } = day;
  const { newShifts, shiftsToDelete, handleAddShift } = hoursView;

  const filteredShift = newShifts?.filter(
    (shift) =>
      shift.iso_weekday === number &&
      !shiftsToDelete?.find((shiftToDelete) => shift.id === shiftToDelete)
  );

  return (
    <div className="w-full lg:w-3/4 xl:w-3/5 2xl:w-2/4 flex flex-row justify-center rounded-xl text-start bg-white p-6 gap-5">
      <span className="w-1/3 font-bold font-button text-2xl">{fullLabel}</span>
      <div className="w-2/3">
        <div
          className="flex align-baseline font-button gap-4 justify-start flex-col xl:basis-9-perc basis-11-perc"
          key={label}
        >
          {filteredShift.map((shift, index) => {
            return (
              <SingleShiftInDay
                key={shift.id}
                index={index}
                shift={shift}
                arrayLength={filteredShift.length}
                number={number}
              />
            );
          })}
          {filteredShift.length === 0 && (
            <div className="w-[80%] flex flex-col items-center">
              <div className="flex flex-row gap-2">
                <RiInformationFill className="text-3xl text-brandOrange" />
                <span className="font-button font-bold text-lg">
                  No shifts on this day
                </span>
              </div>
              <div
                onClick={() => handleAddShift(number)}
                className="font-button font-bold cursor-pointer mt-3"
              >
                Add Shift
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
