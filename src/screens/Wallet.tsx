import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  RiFlashlightFill,
  RiUserReceived2Fill,
  RiCoinFill,
} from "react-icons/ri";
import { supabase } from "../config/supabase";
import { useStore } from "../store";
import { FUND, LN_ADDRESS, WITHDRAW } from "../constants/sidebar";

export const Wallet = observer(() => {
  const { lightningStore, dashboardView, sidebarView } = useStore();

  useEffect(() => {
    if (lightningStore.charge) {
      const chargeSub = supabase
        .from(`charges:id=eq.${lightningStore.charge.internalId}`)
        .on(
          "UPDATE",
          (message) =>
            message.new.settled && dashboardView.handleChargeSettled()
        )
        .subscribe();

      return () => {
        supabase.removeSubscription(chargeSub);
      };
    }
  }, [lightningStore, lightningStore.charge, dashboardView]);

  if (!lightningStore.wallet) return <div>no profile</div>;

  const actions = [
    {
      title: "Withdraw",
      icon: <RiUserReceived2Fill size={30} color="white" />,
      modalType: WITHDRAW,
    },
    {
      title: "Fund",
      icon: <RiCoinFill size={30} color="white" />,
      modalType: FUND,
    },
    {
      title: "LN Address",
      icon: <RiFlashlightFill size={30} color="white" />,
      modalType: LN_ADDRESS,
    },
  ];

  return (
    <div className="w-full flex-col items-center flex justify-center">
      <span className="text-2xl font-bold">
        {lightningStore.wallet.username}
      </span>
      <div className="pt-2 flex flex-row items-center justify-center">
        <RiFlashlightFill />
        <span className="pl-1">
          {lightningStore.wallet.ln_address
            ? lightningStore.wallet.ln_address
            : ""}
        </span>
      </div>

      <div className="w-full flex justify-center pt-10">
        {actions.map((item) => (
          <div
            onClick={() => sidebarView.handleOpenModal(item.modalType)}
            key={item.title}
            className="rounded w-52 h-28 bg-dark300 hover:bg-dark200 m-2 cursor-pointer flex items-center justify-center p-4"
          >
            <div className="pr-2">{item.icon}</div>
            <div className="text-2xl font-bold">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
