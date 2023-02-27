import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

export const HoursNavigation = observer(() => {
  const { shiftsView } = useStore();

  if (!shiftsView.weekStart || !shiftsView.weekEnd) return <></>;

  return (
    <div className="flex gap-2">
      <div className="h-8" onClick={shiftsView.resetWeek}>
        prevvv
      </div>
      <div className="h-8" onClick={shiftsView.prevWeek}>
        prev
      </div>
      <div>{shiftsView.weekStart.format("MMM Do")} - </div>
      <div>{shiftsView.weekEnd.format("MMM Do, YYYY")}</div>
      <div className="h-8" onClick={shiftsView.nextWeek}>
        next
      </div>
    </div>
  );
});
