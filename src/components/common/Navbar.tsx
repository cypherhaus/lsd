import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { formatNumber } from "../../utils/number";

export const Navbar = observer(() => {
  const { authView, authStore } = useStore();

  return (
    <div className="text-white flex w-full bg-primary items-center justify-between p-6">
      <p className="font-bold text-2xl text-cypherhaus text-center">
        {authStore?.currentUser?.balance
          ? formatNumber(authStore?.currentUser?.balance)
          : "0"}{" "}
        sats
      </p>
      <span>{authStore.currentUser?.username}</span>
      <div
        onClick={authView.handleLogoutClick}
        className="text-white font-button cursor-pointer font-bold"
      >
        Logout
      </div>
    </div>
  );
});
