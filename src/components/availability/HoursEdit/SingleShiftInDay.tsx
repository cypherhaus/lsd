import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

// Components
import { TimeInput } from "../../common/TimeInput";
import { ErrorLabel } from "../../common/ErrorLabel";

// Types
import { Shift } from "../../../../types/bookings";

// Icons
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
  shift: Shift;
  index: number;
  arrayLength: number;
  addShift: JSX.Element;
}

export const SingleShiftInDay = observer(
  ({ shift, index, arrayLength, addShift }: Props) => {
    const { hoursView } = useStore();
    const {
      start_time: startTime,
      end_time: endTime,
      iso_weekday: isoWeekday,
      id,
    } = shift;

    const {
      handleAddShiftReadyToDelete,
      handleEditShift,
      shiftValidationErrors,
    } = hoursView;

    return (
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-row justify-between">
          <div className="w-[80%] flex flex-row gap-2">
            <div className="w-full flex flex-col gap-2 items-center">
              <div className="flex flex-row justify-between items-center self-start w-full">
                <div className="w-[45%]">
                  <TimeInput
                    handleChange={handleEditShift}
                    isStartTime={true}
                    shift={shift}
                    time={startTime}
                  />
                </div>
                <span className="text-xl">-</span>
                <div className="w-[45%]">
                  <TimeInput
                    handleChange={handleEditShift}
                    isStartTime={false}
                    shift={shift}
                    time={endTime}
                  />
                </div>
              </div>
              {shiftValidationErrors?.map(
                (s, i2) =>
                  s.shiftId === id && (
                    <ErrorLabel
                      key={"error-" + isoWeekday + "-" + i2 + "-" + startTime}
                    >
                      {s.message}
                    </ErrorLabel>
                  )
              )}
              {index === arrayLength - 1 && addShift}
            </div>
          </div>
          <div
            onClick={() => handleAddShiftReadyToDelete(id)}
            className="flex flex-col items-end cursor-pointer"
          >
            <RiDeleteBinLine className="text-3xl text-brandOrange" />
          </div>
        </div>
      </div>
    );
  }
);
