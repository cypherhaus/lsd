import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import { Screen } from "../components/Screen";
import { useStore } from "../store";

export const Home = observer(() => {
  const { walletView, authStore } = useStore();

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    walletView.setSendUsername(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    walletView.setSendAmount(e.target.value);
  };
  return (
    <Screen>
      <div className="mb-5">Transfer to username</div>
      <input
        onChange={(e) => handleTextChange(e)}
        className="border mb-5"
        placeholder="Username"
        value={walletView.sendUsername}
      />
      <input
        onChange={(e) => handleAmountChange(e)}
        className="border mb-5"
        placeholder="Amount"
        type="number"
        value={walletView.sendAmount}
      ></input>
      <button
        onClick={() => walletView.handlePayUsername(authStore.currentUser.id)}
        className="rounded p-3  text-white bg-black"
      >
        Send
      </button>
    </Screen>
  );
});
