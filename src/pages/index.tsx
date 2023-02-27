import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore } from "../store";

// Config
import { supabase } from "../config/supabase";

// Components
import Auth from "../components/auth";
import Onboarding from "../components/Onboarding";

const Home = observer(() => {
  const router = useRouter();
  const [isOnboarding, setIsOnboarding] = useState(false);

  const { authStore, authView } = useStore();

  const rerieveSession = async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) authView.init(data.session?.user?.id);
  };

  useEffect(() => {
    rerieveSession();

    if (!authStore.currentUser) return;
    if (authStore.currentUser && !authStore.currentUser.business_id) {
      setIsOnboarding(true);
      return;
    }
    if (authStore.currentUser) {
      if (!router.pathname.includes("/dashboard/hours")) {
        router.push("/dashboard/hours");
      }
    }
  }, [authStore.currentUser]);

  return (
    <div className="flex flex-col items-center h-screen p-10 flex-1 justify-center">
      {isOnboarding ? <Onboarding /> : <Auth />}
    </div>
  );
});

export default Home;
