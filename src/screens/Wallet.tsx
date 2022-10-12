import { Screen } from "../components/Screen";
import { useStore } from "../store";

export const Wallet = () => {
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
    </Screen>
  );
};
