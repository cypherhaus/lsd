import React from "react";
import { Button } from "../common/Button";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { useUser } from "@supabase/auth-helpers-react";

export const AddShift = observer(() => {
  const { hoursView } = useStore();
  const user = useUser();

  return (
    <div>
      <div>Add Shift</div>

      <Button onClick={() => hoursView.handleNewShiftRepeat(user?.id ?? "")}>
        Add
      </Button>
    </div>
  );
});
