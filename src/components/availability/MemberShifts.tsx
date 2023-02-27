import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Button } from "../../components/common/Button";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Moment } from "moment";
import { Slot } from "../../../types/bookings";
import { TimeInput } from "../../components/common/TimeInput";
import { Profile } from "../../../types/members";

export const MemberShifts = observer(({ member }: { member: Profile }) => {
  const { shiftsView } = useStore();
  const [thisWeek, setThisWeek] = useState<Moment[]>([]);

  const user = useUser();

  useEffect(() => {
    if (!user) return;

    shiftsView.fetchShifts(user.id);
  }, [user]);

  useEffect(() => {
    if (!shiftsView.weekStart || !shiftsView.weekEnd) return;
    let day = shiftsView.weekStart.clone();
    const days = [];
    while (day < shiftsView.weekEnd) {
      days.push(day);
      day = day.clone().add(1, "days");
    }
    setThisWeek(days);
  }, [shiftsView.weekStart, shiftsView.weekEnd]);

  if (!shiftsView.weekStart || !shiftsView.weekEnd) return <></>;

  const editMode = shiftsView.dayInAddMode || shiftsView.dayInEditMode;

  return (
    <div className="mt-10 flex gap-4">
      {thisWeek.map((day, index) => {
        const shifts = shiftsView.activeWeekShifts?.[index] ?? [];

        return (
          <div
            key={day.format("MMM Do")}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col gap-4">
              {!shifts.length ? (
                <div className="flex items-center"></div>
              ) : (
                shifts.map((shift) => (
                  <div key={shift.id}>
                    <div className="flex flex-col items-center">
                      <TimeInput
                        time={shift.start}
                        onChange={(v) =>
                          shiftsView.handleEditShift({
                            slot: v as Slot,
                            shifts,
                            day,
                            shiftId: shift.id,
                            close: true,
                          })
                        }
                      />
                      <TimeInput
                        time={shift.end}
                        onChange={(v) =>
                          shiftsView.handleEditShift({
                            slot: v as Slot,
                            shifts,
                            day,
                            shiftId: shift.id,
                            close: true,
                          })
                        }
                      />
                    </div>
                    {!editMode && (
                      <Button
                        onClick={() => shiftsView.deleteShift(shift.id, day)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});
