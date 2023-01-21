import { observer } from "mobx-react-lite";
import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";
import { Button } from "../../components/common/Button";

const Availability = observer(() => {
  const { availabilityView } = useStore();

  if (!availabilityView.weekStart || !availabilityView.weekEnd) return <></>;

  const renderDays = (): any => {
    if (!availabilityView.weekStart || !availabilityView.weekEnd) return;
    let day = availabilityView.weekStart;
    const days = [];

    while (day < availabilityView.weekEnd) {
      days.push(
        <div className="flex flex-col items-center">
          <div className="font-bold text-2xl">{day.format("MMM Do")}</div>
          <Button onClick={() => console.log("hey")}>Add Shift</Button>
        </div>
      );
      day = day.clone().add(1, "days");
    }

    return days;
  };
  return (
    <Layout>
      <div>
        <div className="flex gap-2">
          <div className="h-8" onClick={availabilityView.resetWeek}>
            prevvv
          </div>
          <div className="h-8" onClick={availabilityView.prevWeek}>
            prev
          </div>
          <div>{availabilityView.weekStart.format("MMM Do")} - </div>
          <div>{availabilityView.weekEnd.format("MMM Do, YYYY")}</div>
          <div className="h-8" onClick={availabilityView.nextWeek}>
            next
          </div>
        </div>
        <div className="mt-10 flex gap-4">{renderDays()}</div>
      </div>
    </Layout>
  );
});

export default Availability;
