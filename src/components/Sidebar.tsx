import { observer } from "mobx-react-lite";
import { FUND, LN_ADDRESS, TRANSFER, WITHDRAW } from "../constants/sidebar";
import { useStore } from "../store";
import { formatNumber } from "../utils/number";
// @ts-ignore
import alternateLogo from "../assets/alternate.png";

const sidebarItems = [
  {
    title: "Pay",
    type: TRANSFER,
  },
  {
    title: "Fund",
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
    <div className="flex items-center flex-col p-4 bg-orange w-[280px]">
      <img
        className="mt-6"
        height={100}
        width={100}
        src={alternateLogo}
        alt="logo"
      />
      <p className="mt-6 font-bold text-5xl text-white text-center">
        {lightningStore.wallet?.balance
          ? formatNumber(lightningStore.wallet?.balance)
          : "0"}
      </p>
      <p className="mb-4 mt-2 text-white text-center">SATS</p>
      {sidebarItems.map((item) => (
        <div className="w-full flex pb-2 items-center text-xl">
          <div
            onClick={() => sidebarView.handleSidebarItemPress(item.type)}
            className={`cursor-pointer pb-2 hover:text-white ${
              sidebarView.activePanel === item.type
                ? "text-white font-bold"
                : "text-black"
            }`}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
});
