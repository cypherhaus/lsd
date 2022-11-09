import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { Input } from "./common/Input";

export const LNAddress = observer(() => {
  const { walletView } = useStore();
  return (
    <div className="flex flex-col items-center h-full p-10">
      <p className="text-xl font-bold text-center mb-8">
        Update your Lightning Address for withdrawals
      </p>
      <Input
        onChange={walletView.setLightningAddress}
        placeholder="Lightning Address"
        value={walletView.lnAddress}
      />
      <button
        onClick={walletView.handleUpdateAddressClick}
        className="rounded p-3 mt-5 text-white bg-black text-xl font-bold"
      >
        Save
      </button>
    </div>
  );
});
