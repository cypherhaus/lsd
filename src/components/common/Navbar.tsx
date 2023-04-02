import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { formatNumber } from "../../utils/number";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const Navbar = observer(() => {
  const { authView, authStore } = useStore();

  return (
    <div className="flex w-full items-center justify-between p-6 border-b-2 bg-white">
      <p className="font-bold text-2xl text-cypherhaus text-center">
        {authStore?.currentUser?.balance
          ? formatNumber(authStore?.currentUser?.balance)
          : "0"}{" "}
        sats
      </p>
      <span className="font-bold">yo {authStore.currentUser?.username}</span>
      <div
        onClick={authView.handleLogoutClick}
        className="font-button cursor-pointer font-bold"
      >
        <RiLogoutBoxRLine size={30} />
      </div>
    </div>
  );
});
