import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import { supabase } from "../config/supabase";
import { useStore } from "../store";
import { Input } from "./common/Input";

export const Fund = observer(() => {
  const { walletView, lightningStore } = useStore();

  useEffect(() => {
    if (lightningStore.charge) {
      const chargeSub = supabase
        .from(`charges:id=eq.${lightningStore.charge.internalId}`)
        .on(
          "UPDATE",
          (message) => message.new.settled && walletView.handleChargeSettled()
        )
        .subscribe();

      return () => {
        supabase.removeSubscription(chargeSub);
      };
    }
  }, [lightningStore, lightningStore.charge, walletView]);

  return (
    <div className="flex flex-col items-center h-full p-10">
      <p className="text-xl font-bold text-center mb-8">
        Create a charge to fund your account
      </p>
      <Input
        onChange={walletView.setFundAmount}
        placeholder="Amount"
        type="number"
        value={walletView.fundAmount}
      ></Input>
      <button
        onClick={walletView.handleFundClick}
        className="rounded p-3 mt-5 text-white bg-black text-xl font-bold mb-6"
      >
        Fund
      </button>
      {lightningStore.charge && (
        <QRCode
          style={{ height: "auto", maxWidth: "300px", width: "300px" }}
          value={lightningStore.charge.invoice.request}
          viewBox={`0 0 256 256`}
        />
      )}
    </div>
  );
});
