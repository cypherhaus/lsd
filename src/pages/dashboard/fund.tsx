import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import QRCode from "react-qr-code";
import { useStore } from "../../store";
import { Input } from "../../components/common/Input";
import { Layout } from "../../components/common/Layout";
import { supabase } from "../../config/supabase";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { successToast } from "../../utils/toast";

const Fund = observer(() => {
  const { dashboardView, lightningStore } = useStore();

  // Subscribe to charges to listen for when invoice is settled
  useEffect(() => {
    if (!lightningStore.charge) return;

    supabase
      .channel("any")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "charges",
          filter: `id=eq.${lightningStore.charge.internalId}`,
        },
        (message: any) => {
          message.new.settled && dashboardView.handleChargeSettled();
        }
      )
      .subscribe();

    return () => supabase.removeAllChannels();
  }, [lightningStore, lightningStore.charge, dashboardView]);

  return (
    <Layout>
      <div className="flex flex-col items-center h-full p-10 flex-1">
        <p className="text-xl font-bold text-center mb-8">
          Create a charge to fund your account
        </p>
        <Input
          onChange={dashboardView.setFundAmount}
          placeholder="Amount"
          type="number"
          value={dashboardView.fundAmount}
        ></Input>
        <button
          onClick={dashboardView.handleFundClick}
          className="p-3 mt-5 text-white bg-primary text-xl font-bold mb-6"
        >
          Fund
        </button>

        {lightningStore.charge && (
          <CopyToClipboard
            text={lightningStore.charge.invoice.request}
            onCopy={() => successToast("Copied Bolt11 to Clipboard")}
          >
            <QRCode
              style={{ height: "auto", maxWidth: "300px", width: "300px" }}
              value={lightningStore.charge.invoice.request}
              viewBox={`0 0 256 256`}
            />
          </CopyToClipboard>
        )}
      </div>
    </Layout>
  );
});

export default Fund;
