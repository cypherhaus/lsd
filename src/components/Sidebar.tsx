import { observer } from "mobx-react-lite";
import { FUND, LN_ADDRESS, TRANSFER, WITHDRAW } from "../constants/sidebar";
import { useStore } from "../store";
import { formatNumber } from "../utils/number";
// @ts-ignore

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
    <div className="flex items-center flex-col p-4 bg-white w-[280px]">
      {/* <img
        className="mt-6"
        height={100}
        width={100}
        src={alternateLogo}
        alt="logo"
      /> */}
      <p className="mt-6 font-bold text-5xl text-cypherhaus text-center">
        {lightningStore.wallet?.balance
          ? formatNumber(lightningStore.wallet?.balance)
          : "0"}
      </p>
      <p className="mb-4 mt-2 text-cypherhaus text-center">SATS</p>
      {sidebarItems.map((item) => (
        <div key={item.title} className="w-full flex pb-2 items-center text-xl">
          <div
            onClick={() => sidebarView.handleSidebarItemPress(item.type)}
            className={`cursor-pointer pb-2 hover:text-cypherhaus ${
              sidebarView.activePanel === item.type
                ? "text-cypherhaus font-bold"
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
