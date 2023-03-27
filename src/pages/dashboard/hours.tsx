import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";
import { useRouter } from "next/router";

// Config
import { supabase } from "../../config/supabase";

// Components
import { HoursEdit } from "../../components/availability/HoursEdit";
import { TeamHours } from "../../components/availability/TeamHours";

// Constants
import { START_ROUTE } from "../../constants/routes";

const Availability = observer(() => {
  const router = useRouter();
  const { hoursView, authStore, authView, teamStore } = useStore();
  const { shifts } = teamStore;

  const {
    handleFetchShifts,
    handleSetNewShifts,
    handleSetUserInfo,
    handleStopLoading,
    shiftsEditOpen,
    newShifts,
  } = hoursView;

  useEffect(() => {
    if (authStore.currentUser) {
      const {
        first_name: firstName,
        last_name: lastName,
        id,
      } = authStore.currentUser;

      if (!authStore.currentUser.business_id) {
        router.push(START_ROUTE);
        return;
      }

      handleFetchShifts(id);
      handleSetUserInfo({ firstName: firstName, lastName: lastName });
    }
  }, [authStore.currentUser, handleSetUserInfo, handleFetchShifts, router]);

  useEffect(() => {
    if (shifts) handleStopLoading();
  }, [shifts, handleStopLoading]);

  useEffect(() => {
    if (newShifts) handleStopLoading();
  }, [newShifts, handleStopLoading]);

  useEffect(() => {
    if (shiftsEditOpen) handleSetNewShifts();
  }, [shiftsEditOpen, handleSetNewShifts]);

  return <Layout>{!shiftsEditOpen ? <TeamHours /> : <HoursEdit />}</Layout>;
});

export default Availability;
