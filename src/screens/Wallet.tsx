import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import { Screen } from "../components/Screen";
import { supabase } from "../config/supabase";
import { useStore } from "../store";

export const Wallet = observer(() => {
  const { lightningStore, walletView } = useStore();

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
  }, [lightningStore, lightningStore.charge]);

  if (!lightningStore.wallet) return <div>no profile</div>;

  return (
    <Screen>
      <span className="text-2xl">
        Hello {lightningStore.wallet.username} /{" "}
        {lightningStore.wallet.ln_address ?? "no ln address"}
      </span>

      <input
        onChange={(e) => walletView.setWithdrawAmount(e.target.value)}
        className="border mr-5"
        placeholder="Amount"
        type="number"
        value={walletView.withdrawAmount}
      ></input>
      <button
        onClick={walletView.handleWithdrawClick}
        className="rounded mt-10 mb-20 p-3 text-white bg-black"
      >
        Withdraw
      </button>
      <input
        onChange={(e) => walletView.setFundAmount(e.target.value)}
        className="border mr-5"
        placeholder="Amount"
        type="number"
        value={walletView.fundAmount}
      ></input>
      <button
        onClick={walletView.handleFundClick}
        className="rounded p-3 mt-5 text-white bg-black"
      >
        Fund
      </button>
      <input
        onChange={(e) => walletView.setLightningAddress(e.target.value)}
        className="border mt-10 mr-5"
        placeholder="Lightning Address"
        value={walletView.lnAddress}
      ></input>
      <button
        onClick={walletView.handleUpdateAddressClick}
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
