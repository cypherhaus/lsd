import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

// Types
import { Day } from "../../../../types/common";

// Utils
import { formatHours } from "../../../utils/time";

interface Props {
  day: Day;
}

export const SingleDayInNavigation = observer(({ day }: Props) => {
  const { teamStore } = useStore();
  const { shifts } = teamStore;
  const filteredShift = shifts.filter(
    (shift) => shift.iso_weekday === day.number
  );
  return (
    <td className="lg:w-[12.5%] p-2 align-top">
      <div className="flex flex-col gap-2">
        <>
          {filteredShift.map((shift) => (
            <span
              key={shift.id}
              className="rounded-md text-center bg-white lg:px-1 py-1 px-2"
            >
              {formatHours(shift.start_time) +
                " - " +
                formatHours(shift.end_time)}
            </span>
          ))}
          {filteredShift.length === 0 && (
            <span className="text-2xl font-button text-center">—</span>
          )}
        </>
      </div>
    </td>
  );
});
