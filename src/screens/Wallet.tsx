import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import QRCode from "react-qr-code";
import { Screen } from "../components/Screen";
import { useStore } from "../store";

export const Wallet = observer(() => {
  const { lightningStore, authStore } = useStore();
  const [amount, setAmount] = useState<string | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <Screen>
      <div>Withdrawal</div>
      <div>Transactions</div>
      <input
        onChange={(e) => handleTextChange(e)}
        className="border mr-5"
        placeholder="Amount"
        type="number"
      ></input>
      <button
        onClick={() =>
          amount &&
          lightningStore.createCharge(amount, authStore.currentUser.id)
        }
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
