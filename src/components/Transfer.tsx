import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { Input } from "./common/Input";

export const Transfer = observer(() => {
  const { walletView, authStore } = useStore();
  return (
    <div>
      <div className="mb-5">Transfer to username</div>
      <Input
        onChange={walletView.setSendUsername}
        placeholder="Username"
        value={walletView.sendUsername}
      />
      <Input
        onChange={walletView.setSendAmount}
        placeholder="Amount"
        type="number"
        value={walletView.sendAmount}
      />
      <button
        onClick={() => walletView.handlePayUsername(authStore.currentUser.id)}
        className="rounded p-3  text-white bg-black"
      >
        Send
      </button>
    </div>
  );
});
