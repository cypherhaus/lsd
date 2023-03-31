import { useStore } from "../../store";
import { formatNumber } from "../../utils/number";

export const Navbar = () => {
  const { authView, lightningStore, authStore } = useStore();
  console.log({ lightningStore: lightningStore.wallet });

  return (
    <div className="text-white flex w-full bg-primary items-center justify-between p-6">
      <p className="font-bold text-2xl text-cypherhaus text-center">
        {authStore?.currentUser?.balance
          ? formatNumber(lightningStore.wallet?.balance)
          : "0"}{" "}
        sats
      </p>
      <div
        onClick={authView.handleLogoutClick}
        className="text-lg text-white font-button cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
};
