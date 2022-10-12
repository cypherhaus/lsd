import { observer } from "mobx-react-lite";
import QRCode from "react-qr-code";
import { Screen } from "../components/Screen";
import { useStore } from "../store";

export const Wallet = observer(() => {
  const { lightningStore } = useStore();

  return (
    <Screen>
      <div>Withdrawal</div>
      <div>Transactions</div>
      <input className="border mr-5" placeholder="Amount"></input>
      <button
        onClick={() => lightningStore.createCharge("id", "9000")}
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
