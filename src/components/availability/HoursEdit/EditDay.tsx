import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

// Components
import { DayShift } from "./DayShift";
import { Button } from "../../common/Button";

// Types
import { Day } from "../../../../types/common";
import { Shift } from "../../../../types/bookings";

// Icons
import { RiInformationFill } from "react-icons/ri";

// Constants
import { BUTTON_VARIANT } from "../../../constants/common";

interface Props {
  day: Day;
}

export const EditDay = observer(({ day }: Props) => {
  const initialEmptyShifts: Shift[] = [];
  const { hoursView } = useStore();
  const { fullLabel, number } = day;
  const { newShifts, handleAddShift } = hoursView;
  const [filteredShifts, setFilteredShifts] = useState(initialEmptyShifts);

  useEffect(() => {
    if (newShifts) {
      setFilteredShifts(
        newShifts.filter((shift) => shift.iso_weekday === day.number)
      );
    }
  }, [newShifts, setFilteredShifts, day.number]);

  return (
    <div className="w-full lg:w-3/4 xl:w-3/5 2xl:w-2/4 flex flex-row justify-center rounded-xl text-start bg-white p-6 gap-5">
      <span className="w-1/3 font-bold font-button text-2xl">{fullLabel}</span>
      <div className="w-2/3">
        <div className="flex align-baseline font-button gap-4 justify-start flex-col xl:basis-9-perc basis-11-perc">
          {filteredShifts.map((shift, index) => {
            return (
              <DayShift
                key={shift.id}
                index={index}
                shift={shift}
                arrayLength={filteredShifts.length}
                number={number}
              />
            );
          })}
          {filteredShifts.length === 0 && (
            <div className="w-[80%] flex flex-col items-center">
              <div className="flex flex-row gap-2">
                <RiInformationFill className="text-3xl text-brandOrange" />
                <span className="font-button font-bold text-lg">
                  No shifts on this day
                </span>
              </div>
              <Button
                onClick={() => handleAddShift(number)}
                variant={BUTTON_VARIANT.TRANSPARENT}
              >
                Add Shift
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
