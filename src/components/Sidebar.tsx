import { observer } from "mobx-react-lite";
import {
  RiFlashlightFill,
  RiPlayCircleFill,
  RiSendPlaneFill,
  RiCoinFill,
  RiUserReceivedFill,
} from "react-icons/ri";
import {
  FUND,
  LN_ADDRESS,
  STREAM,
  TRANSFER,
  WITHDRAW,
} from "../constants/sidebar";
import { useStore } from "../store";
import { formatNumber } from "../utils/number";

const sidebarItems = [
  {
    title: "Transfer to username",
    icon: <RiSendPlaneFill size={20} color="white" />,
    type: TRANSFER,
  },
  {
    title: "Stream to username",
    icon: <RiPlayCircleFill size={20} color="white" />,
    type: STREAM,
  },
  {
    title: "Fund your account",
    icon: <RiCoinFill size={20} color="white" />,
    type: FUND,
  },
  {
    title: "Update LN Address",
    icon: <RiFlashlightFill size={20} color="white" />,
    type: LN_ADDRESS,
  },
  {
    title: "Make a Withdrawal",
    icon: <RiUserReceivedFill size={20} color="white" />,
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
        <div className="w-full flex pb-4">
          <div className="pr-4">{item.icon}</div>
          <div
            onClick={() => sidebarView.handleSidebarItemPress(item.type)}
            className="cursor-pointer pb-2 hover:text-white"
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
});
