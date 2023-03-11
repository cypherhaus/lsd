import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";
import { useRouter } from "next/router";

// Config
import { supabase } from "../../config/supabase";

// Components
import { HoursEdit } from "../../components/availability/HoursEdit";
import { TeamHours } from "../../components/availability/TeamHours";

// Types
import { User } from "../../../types/auth";

// Constants
import { START_ROUTE } from "../../constants/routes";

const Availability = observer(() => {
  const router = useRouter();
  const initialCurrentUserData: User = { firstName: "", lastName: "" };
  const { hoursView, authStore, authView } = useStore();
  const { handleFetchShifts, shiftsEditOpen } = hoursView;
  const { init } = authView;
  const [currentUserData, setCurrentUserData] = useState(
    initialCurrentUserData
  );

  useEffect(() => {
    const retrieveSession = async () => {
      const { data } = await supabase.auth.getSession();
      data.session && init(data.session?.user?.id);
    };
    retrieveSession();

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
      setCurrentUserData({ firstName: firstName, lastName: lastName });
    }
  }, [
    authStore.currentUser,
    setCurrentUserData,
    handleFetchShifts,
    init,
    router,
  ]);

  return (
    <Layout>
      {!shiftsEditOpen ? (
        <TeamHours user={currentUserData} />
      ) : (
        <HoursEdit user={currentUserData} />
      )}
    </Layout>
  );
});

export default Availability;
