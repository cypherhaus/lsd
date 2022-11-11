import { observer } from "mobx-react-lite";
import {
  RiFlashlightFill,
  RiSendPlaneFill,
  RiCoinFill,
  RiUserReceivedFill,
} from "react-icons/ri";
import { FUND, LN_ADDRESS, TRANSFER, WITHDRAW } from "../constants/sidebar";
import { useStore } from "../store";
import { formatNumber } from "../utils/number";

const sidebarItems = [
  {
    title: "Pay username",
    icon: <RiSendPlaneFill size={18} color="white" />,
    type: TRANSFER,
  },
  {
    title: "Fund your account",
    icon: <RiCoinFill size={18} color="white" />,
    type: FUND,
  },
  {
    title: "Update LN Address",
    icon: <RiFlashlightFill size={18} color="white" />,
    type: LN_ADDRESS,
  },
  {
    title: "Make a Withdrawal",
    icon: <RiUserReceivedFill size={18} color="white" />,
    type: WITHDRAW,
  },
];

export const Sidebar = observer(() => {
  const { sidebarView, lightningStore } = useStore();

  return (
    <div className="p-4 bg-dark300 min-w-[280px]">
      <p className="text-white text-center">
        Hi {lightningStore?.wallet?.username}!
      </p>
      <p className="mt-2 font-bold text-4xl text-white text-center">
        {lightningStore.wallet?.balance
          ? formatNumber(lightningStore.wallet?.balance)
          : "-"}
      </p>
      <p className="mb-4 text-white text-center">SATS</p>
      <hr className="mb-8" />
      {sidebarItems.map((item) => (
        <div className={`w-full flex pb-4 items-center`}>
          <div
            className={`pr-4 [&>svg]:fill-${
              sidebarView.activePanel === item.type ? "bolt" : "white"
            } `}
          >
            {item.icon}
          </div>
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
