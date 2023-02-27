import { observer } from "mobx-react-lite";
import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";
import { useEffect } from "react";
import { HoursNavigation } from "../../components/availability/HoursNavigation";
import { MemberShifts } from "../../components/availability/MemberShifts";
import { Button } from "../../components/common/Button";

// Components

const Availability = observer(() => {
  const { authStore, shiftsView } = useStore();

  useEffect(() => {
    if (!authStore.currentUser) return;
  }, [authStore.currentUser]);

  return (
    <Layout>
      <HoursNavigation />
      {/* <div className="flex flex-row gap-2">
        <div className="font-bold text-2xl">Mon</div>
        <div className="font-bold text-2xl">Tue</div>
        <div className="font-bold text-2xl">Wed</div>
        <div className="font-bold text-2xl">Thu</div>
        <div className="font-bold text-2xl">Fri</div>
      </div> */}
      {/* {teamStore.members.map((member) => (
        <MemberShifts member={member} />
      ))} */}
      <div>
        <Button onClick={shiftsView.handleAddMember}>Add Team Member</Button>
      </div>
    </Layout>
  );
});

export default Availability;

// {shiftsView.dayInAddMode?.isSame(day, "days") && (
//   <>
//     <TimeInput
//       time={shiftsView.shiftToAdd?.start ?? ""}
//       onChange={() => {}}
//     />
//     <TimeInput
//       time={shiftsView.shiftToAdd?.end ?? ""}
//       onChange={() => {}}
//     />
//     <Button onClick={shiftsView.addShift}>Save</Button>
//   </>
// )}
// {shiftsView.dayInEditMode?.isSame(day, "days") && (
//   <Button onClick={shiftsView.handleUpdateShift}>Save</Button>
// )}
// <Button
//   onClick={() => {
//     shiftsView.handleAddShiftClick(day);
//   }}
// >
//   Add Shift
// </Button>
