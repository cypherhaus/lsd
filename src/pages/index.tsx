import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore } from "../store";

// Components
import Auth from "../components/auth";
import Onboarding from "../components/Onboarding";

// Constants
import { HOURS_ROUTE } from "../constants/routes";

const Home = observer(() => {
  const router = useRouter();
  const [isOnboarding, setIsOnboarding] = useState(false);
  const { authStore } = useStore();

  useEffect(() => {
    if (!authStore.currentUser) setIsOnboarding(false);
    if (authStore.currentUser && !authStore.currentUser.business_id) {
      setIsOnboarding(true);
      return;
    }

    if (authStore.currentUser && !router.pathname.includes(HOURS_ROUTE)) {
      router.push(HOURS_ROUTE);
    }
  }, [authStore.currentUser, router]);

  return (
    <div className="flex flex-col pt-10 md:pt-40 lg:bg-[length:60%_70%] xl:bg-[length:55%_80%] bg-left-bottom bg-no-repeat bg-brandWhite items-center h-screen flex-1 justify-top">
      {isOnboarding ? <Onboarding /> : <Auth />}
    </div>
  );
});

export default Home;
