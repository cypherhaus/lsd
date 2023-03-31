import {
  RiFlashlightLine,
  RiChatForwardLine,
  RiArrowLeftRightFill,
} from "react-icons/ri";

import { FUND_ROUTE, WITHDRAW_ROUTE, TRANSFER_ROUTE } from "./routes";

export const SIDEBAR_ITEMS = [
  {
    href: FUND_ROUTE,
    label: "Fund",
    Icon: RiFlashlightLine,
  },
  {
    href: TRANSFER_ROUTE,
    label: "Transfer",
    Icon: RiArrowLeftRightFill,
  },
  {
    href: WITHDRAW_ROUTE,
    label: "Withdrawal",
    Icon: RiChatForwardLine,
  },
];
