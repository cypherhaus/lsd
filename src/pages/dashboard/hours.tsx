import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";

// Config
import { supabase } from "../../config/supabase";

// Components
import { HoursNavigation } from "../../components/availability/HoursNavigation";
import { HoursEdit } from "../../components/availability/HoursEdit";
import { Button } from "../../components/common/Button";

// Icons
import { RiGroupLine } from "react-icons/ri";

// Constants
import { BUTTON_VARIANT } from "../../constants/common";

const Availability = observer(() => {
  const { hoursView, authStore, authView } = useStore();
  const { shiftsEditOpen, handleSetShiftsEditOpen } = hoursView;
  const [currentUserData, setCurrentUserData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const retrieveSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) authView.init(data.session?.user?.id);
    };
    retrieveSession();

    if (authStore.currentUser) {
      hoursView.fetchShifts(authStore.currentUser.id);
      setCurrentUserData({
        firstName: authStore.currentUser.first_name,
        lastName: authStore.currentUser.last_name,
      });
    }
  }, [authStore.currentUser, shiftsEditOpen, hoursView, authView]);

  return (
    <Layout>
      {!shiftsEditOpen ? (
        <>
          <HoursNavigation
            setEditOpen={handleSetShiftsEditOpen}
            user={currentUserData}
          />
          <div className="flex flex-col items-center">
            <Button
              icon={<RiGroupLine />}
              onClick={hoursView.handleAddMember}
              variant={BUTTON_VARIANT.WHITE}
            >
              Add Team Member
            </Button>
          </div>
        </>
      ) : (
        <HoursEdit
          setEditOpen={handleSetShiftsEditOpen}
          user={currentUserData}
        />
      )}
    </Layout>
  );
});

export default Availability;
