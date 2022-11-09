import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { Input } from "./common/Input";

export const Withdraw = observer(() => {
  const { walletView } = useStore();
  return (
    <div className="flex flex-col items-center h-full p-10">
      <p className="text-xl font-bold text-center mb-8">Make a withdrawal</p>
      <Input
        type="number"
        onChange={walletView.setWithdrawAmount}
        placeholder="Amount"
        value={walletView.withdrawAmount}
      />
      <button
        onClick={walletView.handleWithdrawClick}
        className="rounded p-3 mt-5 text-white bg-black text-xl font-bold"
      >
        Withdraw
      </button>
    </div>
  );
});
