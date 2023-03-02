import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";;
import { HoursNavigation } from "../../components/availability/HoursNavigation";
import { MemberShifts } from "../../components/availability/MemberShifts";
import { Button } from "../../components/common/Button";
import { RiGroupLine } from "react-icons/ri";

// Config
import { supabase } from "../../config/supabase";

const Availability = observer(() => {
  const { hoursView, authStore, authView } = useStore();
  const [currentUserData, setCurrentUserData] = useState({firstName: '', lastName: ''})

  const rerieveSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) authView.init(data.session?.user?.id);
  };

  useEffect(() => {
    rerieveSession();
    if(authStore.currentUser) {
      hoursView.fetchShifts(authStore.currentUser.id);
      setCurrentUserData({firstName: authStore.currentUser.first_name, lastName: authStore.currentUser.last_name})
    }
  }, [authStore.currentUser]);

  return (
    <Layout>
      <HoursNavigation user={currentUserData} />
      <div className="flex flex-row justify-center">
        <Button 
          icon={<RiGroupLine />} 
          onClick={hoursView.handleAddMember}
          variant="white">Add Team Member</Button>
      </div>
    </Layout>
  );
});

export default Availability;
