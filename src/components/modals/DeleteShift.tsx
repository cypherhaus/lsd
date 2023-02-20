import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Shift } from "../../../types/bookings";
import moment from "moment";
import { useUser } from "@supabase/auth-helpers-react";

export const DeleteShift = observer(() => {
  const [shift, setShift] = useState<Shift | null>(null);
  const { shiftsView } = useStore();
  const user = useUser();

  useEffect(() => {
    if (!shiftsView.activeWeekShifts) return;
    if (!shiftsView.shiftToDelete) return;

    const foundShift = shiftsView.activeWeekShifts
      .flat()
      .find((shift) => shift.id === shiftsView.shiftToDelete);

    if (foundShift) {
      setShift(foundShift);
    }
  }, [shiftsView.shiftToDelete]);

  if (!shift) return null;

  return (
    <div>
      <div>Delete Shift</div>
      <div>
        <div>
          This is a reocurring shift, for every{" "}
          {moment().isoWeekday(shift.isoWeekday).format("dddd")}
        </div>
        Pick an option below
        <Button
          onClick={() => shiftsView.deleteShiftOnce(shift.id, user?.id ?? "")}
        >
          Delete Once
        </Button>
        <Button
          onClick={() => shiftsView.deleteShiftAll(shift.id, user?.id ?? "")}
        >
          Delete All
        </Button>
      </div>
    </div>
  );
});
