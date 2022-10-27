import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Screen } from "../components/Screen";
import { supabase } from "../config/supabase";
import { useStore } from "../store";

export const Wallet = observer(() => {
  const { lightningStore, authStore } = useStore();
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (lightningStore.charge) {
      const chargeSub = supabase
        .from(`charges:id=eq.${lightningStore.charge.internalId}`)
        .on("UPDATE", (message) => {
          if (message.new.settled) {
            lightningStore.chargeSettled();
            setAmount("");
          }
        })
        .subscribe();

      return () => {
        supabase.removeSubscription(chargeSub);
      };
    }
  }, [lightningStore.charge, authStore]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFundClick = () => {
    if (amount) {
      lightningStore.createCharge(amount, authStore.currentUser.id);
    }
  };

  const handleWithdrawClick = () => {};

  if (!lightningStore.wallet) return <div>no profile</div>;

  return (
    <Screen>
      <span className="text-2xl">
        Hello {lightningStore.wallet.username} / danny@zbd.gg
      </span>

      <button
        onClick={handleWithdrawClick}
        className="rounded mt-10 mb-20 p-3 text-white bg-black"
      >
        Withdraw
      </button>
      <input
        onChange={(e) => handleTextChange(e)}
        className="border mr-5"
        placeholder="Amount"
        type="number"
        value={amount}
      ></input>
      <button
        onClick={handleFundClick}
        className="rounded p-3 mt-5 text-white bg-black"
      >
        Fund
      </button>
      <input
        onChange={(e) => handleTextChange(e)}
        className="border mt-10 mr-5"
        placeholder="Lightning Address"
        value={amount}
      ></input>
      <button
        onClick={handleFundClick}
        className="rounded p-3 mt-5 text-white bg-black"
      >
        Save
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
