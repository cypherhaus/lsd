import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { supabase } from "./config/supabase";
import { router } from "./routes";
import { Auth } from "./screens/Auth";
import { useStore } from "./store";

const App = observer(() => {
  const { authStore, lightningStore } = useStore();

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) authStore.setUser(session.user);

    if (!authStore.currentUser) return;

    const balanceSub = supabase
      .from(`profiles:id=eq.${authStore.currentUser.id}`)
      .on("UPDATE", (message) => {
        lightningStore.setWallet(message.new);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(balanceSub);
    };
  }, [authStore, lightningStore]);

  useEffect(() => {
    if (authStore.currentUser) {
      lightningStore.fetchWallet(authStore.currentUser.id);
    }
  }, [authStore.currentUser, lightningStore]);

  if (!authStore.currentUser)
    return (
      <div className="h-screen">
        <Auth />
      </div>
    );

  return (
    <div className="h-screen">
      <RouterProvider router={router} />
    </div>
  );
});

export default App;
