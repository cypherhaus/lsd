import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Shift } from "../../../types/bookings";
import moment from "moment";
import { useUser } from "@supabase/auth-helpers-react";

export const DeleteShift = observer(() => {
  const [shift, setShift] = useState<Shift | null>(null);
  const { hoursView } = useStore();
  const user = useUser();

  useEffect(() => {
    if (!hoursView.activeWeekShifts) return;
    if (!hoursView.shiftToDelete) return;

    const foundShift = hoursView.activeWeekShifts
      .flat()
      .find((shift) => shift.id === hoursView.shiftToDelete);

    if (foundShift) {
      setShift(foundShift);
    }
  }, [hoursView.shiftToDelete]);

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
          onClick={() => hoursView.deleteShiftOnce(shift.id, user?.id ?? "")}
        >
          Delete Once
        </Button>
        <Button
          onClick={() => hoursView.deleteShiftAll(shift.id, user?.id ?? "")}
        >
          Delete All
        </Button>
      </div>
    </div>
  );
});
