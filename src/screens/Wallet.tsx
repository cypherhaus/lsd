import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Screen } from "../components/Screen";
import { supabase } from "../config/supabase";
import { useStore } from "../store";
import { formatMsatsToSats } from "../utils/formats";

export const Wallet = observer(() => {
  const { lightningStore, authStore } = useStore();
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    const balanceSub = supabase
      .from(`wallet:id=eq.${authStore.currentUser.id}`)
      .on("UPDATE", (message) => {
        lightningStore.setWallet(message.new);
      })
      .subscribe();

    if (lightningStore.charge) {
      const chargeSub = supabase
        .from(`charge:id=eq.${lightningStore.charge.internalId}`)
        .on("UPDATE", (message) => {
          if (message.new.settled) {
            lightningStore.chargeSettled();
            setAmount(null);
          }
        })
        .subscribe();

      return () => {
        supabase.removeSubscription(chargeSub);
        supabase.removeSubscription(balanceSub);
      };
    }
  }, [lightningStore.charge]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFundClick = () => {
    if (amount) {
      lightningStore.createCharge(amount, authStore.currentUser.id);
    }
  };

  if (!lightningStore.wallet) return <></>;

  return (
    <Screen>
      <span className="text-2xl">
        Balance: {formatMsatsToSats(lightningStore.wallet.balance)} SATS
      </span>
      <div>Withdrawal</div>
      <div>Transactions</div>
      <input
        onChange={(e) => handleTextChange(e)}
        className="border mr-5"
        placeholder="Amount"
        type="number"
        value={parseInt(amount ? amount : "0")}
      ></input>
      <button
        onClick={handleFundClick}
        className="rounded p-3 text-white bg-black"
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
    </Screen>
  );
});
