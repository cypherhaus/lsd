import React from "react";
import { Button } from "../common/Button";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { useUser } from "@supabase/auth-helpers-react";
import { TimeInput } from "../common/TimeInput";

export const AddBlock = observer(() => {
  const { bookingView } = useStore();
  const user = useUser();

  if (!bookingView.blockedTimeStart || !bookingView.blockedTimeEnd) return null;

  return (
    <div className="h-[400px]">
      <div>Add Block</div>
      <div>{bookingView.activeDay?.format("dddd, MMM, Do")}</div>
      <div className="flex gap-1 items-center justify-center">
        <TimeInput
          time={bookingView.blockedTimeStart?.format("HH:mm:ss")}
          onChange={bookingView.setBlockTimeStart}
        />
        <div>-</div>
        <TimeInput
          time={bookingView.blockedTimeEnd?.format("HH:mm:ss")}
          onChange={bookingView.setBlockTimeEnd}
        />
      </div>
      <Button onClick={() => bookingView.handleAddBlock(user?.id ?? "")}>
        Add
      </Button>
    </div>
  );
});
