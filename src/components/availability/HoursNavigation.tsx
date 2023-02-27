import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

export const HoursNavigation = observer(() => {
  const { hoursView } = useStore();

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  return (
    <div className="flex gap-2">
      <div className="h-8" onClick={hoursView.resetWeek}>
        prevvv
      </div>
      <div className="h-8" onClick={hoursView.prevWeek}>
        prev
      </div>
      <div>{hoursView.weekStart.format("MMM Do")} - </div>
      <div>{hoursView.weekEnd.format("MMM Do, YYYY")}</div>
      <div className="h-8" onClick={hoursView.nextWeek}>
        next
      </div>
    </div>
  );
});
