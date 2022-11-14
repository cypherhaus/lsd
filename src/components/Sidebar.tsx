import { observer } from "mobx-react-lite";
import { FUND, LN_ADDRESS, TRANSFER, WITHDRAW } from "../constants/sidebar";
import { useStore } from "../store";
import { formatNumber } from "../utils/number";
import { JuicePackSVG } from "./JuicePackSVG";

const sidebarItems = [
  {
    title: "Pay username",
    type: TRANSFER,
  },
  {
    title: "Fund your account",
    type: FUND,
  },
  {
    title: "Update LN Address",
    type: LN_ADDRESS,
  },
  {
    title: "Make a Withdrawal",
    type: WITHDRAW,
  },
];

export const Sidebar = observer(() => {
  const { sidebarView, lightningStore } = useStore();

  return (
    <div className="flex flex-col p-4 bg-dark300 w-[280px]">
      <JuicePackSVG width={35} />
      <p className="mt-6 font-bold text-5xl text-white text-center">
        {lightningStore.wallet?.balance
          ? formatNumber(lightningStore.wallet?.balance)
          : "0"}
      </p>
      <p className="mb-4 mt-2 text-white text-center">SATS</p>
      <hr className="mb-8" />
      {sidebarItems.map((item) => (
        <div className="w-full flex pb-4 items-center text-xl">
          <div
            onClick={() => sidebarView.handleSidebarItemPress(item.type)}
            className={`cursor-pointer pb-2 hover:text-bolt ${
              sidebarView.activePanel === item.type
                ? "text-bolt font-bold"
                : "text-white"
            }`}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
});
