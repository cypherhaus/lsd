import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { Input } from "./common/Input";

export const Withdraw = observer(() => {
  const { dashboardView, lightningStore } = useStore();

  if (!lightningStore?.wallet?.ln_address) {
    return (
      <div className="flex flex-col items-center h-full p-10 flex-1">
        <p className="text-xl font-bold text-center mb-8">
          You must Add a Lightning Address before you can make withdrawals
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full p-10 flex-1">
      <p className="text-xl font-bold text-center mb-8">Make a withdrawal</p>

      <p className="text-xl text-center mb-8">
        Your satoshis will be sent to {lightningStore.wallet.ln_address}
      </p>
      <Input
        type="number"
        onChange={dashboardView.setWithdrawAmount}
        placeholder="Amount"
        value={dashboardView.withdrawAmount}
      />
      <button
        onClick={dashboardView.handleWithdrawClick}
        className="rounded p-3 mt-5 text-white bg-cypherhaus text-xl font-bold"
      >
        Withdraw
      </button>
    </div>
  );
});
