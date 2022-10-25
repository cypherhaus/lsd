import { ChangeEvent, useState } from "react";
import { Screen } from "../components/Screen";
import { Navigation } from "../navigation";

export const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSendClick = () => {};

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
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
        value={amount}
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
