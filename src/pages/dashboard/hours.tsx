import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";
import { MemberShifts } from "../../components/availability/MemberShifts";

// Config
import { supabase } from "../../config/supabase";

// Components
import { HoursNavigation } from "../../components/availability/HoursNavigation";
import { HoursEdit } from '../../components/availability/HoursEdit';
import { Button } from "../../components/common/Button";

// Icons
import { RiGroupLine } from "react-icons/ri";

const Availability = observer(() => {
  const { hoursView, authStore, authView } = useStore();
  const { shiftsEditOpen, setShiftsEdit } = hoursView;
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
      {!shiftsEditOpen
        ? (<>
            <HoursNavigation setEditOpen={setShiftsEdit} user={currentUserData} />
            <div className="flex flex-col items-center">
              <Button 
                icon={<RiGroupLine />} 
                onClick={hoursView.handleAddMember}
                variant="white">Add Team Member</Button>
            </div>
          </>)
        : <HoursEdit setEditOpen={setShiftsEdit} user={currentUserData} />}
    </Layout>
  );
});

export default Availability;
