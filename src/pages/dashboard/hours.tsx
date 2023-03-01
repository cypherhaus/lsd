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
  const [firstName, setFirstName] = useState('')

  const rerieveSession = async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) authView.init(data.session?.user?.id);
  };

  useEffect(() => {
    rerieveSession();
    if(authStore.currentUser) {
      console.log('there is user')
      hoursView.fetchShifts('f53eefda-eb16-4e1d-8023-dd126b7183bb');
      console.log(authStore.currentUser.first_name)
      setFirstName(authStore.currentUser.first_name)
    }
  }, [authStore.currentUser]);

  return (
    <Layout>
      {firstName !== '' && <HoursNavigation firstName={firstName} />}
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
