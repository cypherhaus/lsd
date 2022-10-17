import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { supabase } from "./config/supabase";
import { Navigation } from "./navigation";
import { router } from "./routes";
import { Auth } from "./screens/Auth";
import { useStore } from "./store";

const App = observer(() => {
  const { authStore, lightningStore } = useStore();

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) authStore.setUser(session.user);

    const subscription = supabase
      .from("payments")
      .on("*", (e) => console.log("called", e))
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [authStore, lightningStore]);

  useEffect(() => {
    if (authStore.currentUser) {
      lightningStore.fetchWallet(authStore.currentUser.id);
    }
  }, [authStore.currentUser]);

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
