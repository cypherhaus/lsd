import { ChangeEvent, useState } from "react";
import { Screen } from "../components/Screen";
import { useStore } from "../store";

export const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [amount, setAmount] = useState<null | number>(null);

  const { lightningView, authStore } = useStore();

  const handleSendClick = () => {
    if (!amount || !username) return;
    lightningView.handlePayUsername(authStore.currentUser.id, username, amount);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };
  return (
    <Screen>
      <div className="mb-5">Transfer to username</div>
      <input
        onChange={(e) => handleTextChange(e)}
        className="border mb-5"
        placeholder="Username"
        value={username}
      />
      <input
        onChange={(e) => handleAmountChange(e)}
        className="border mb-5"
        placeholder="Amount"
        type="number"
        value={amount ? amount : ""}
      ></input>
      <button
        onClick={handleSendClick}
        className="rounded p-3  text-white bg-black"
      >
        Send
      </button>
    </Screen>
  );
};
