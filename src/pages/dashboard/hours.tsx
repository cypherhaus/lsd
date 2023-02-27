import { observer } from "mobx-react-lite";
import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";
import { useEffect } from "react";
import { HoursNavigation } from "../../components/availability/HoursNavigation";
import { MemberShifts } from "../../components/availability/MemberShifts";
import { Button } from "../../components/common/Button";

// Components

const Availability = observer(() => {
  const { authStore, hoursView } = useStore();

  useEffect(() => {
    if (!authStore.currentUser) return;
  }, [authStore.currentUser]);

  return (
    <Layout>
      <HoursNavigation />
      <div>
        <Button onClick={hoursView.handleAddMember}>Add Team Member</Button>
      </div>
    </Layout>
  );
});

export default Availability;
