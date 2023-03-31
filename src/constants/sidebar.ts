import {
  RiFlashlightLine,
  RiAddCircleLine,
  RiChatForwardLine,
  RiArrowLeftRightFill,
} from "react-icons/ri";

import {
  FUND_ROUTE,
  LN_ADDRESS_ROUTE,
  WITHDRAW_ROUTE,
  TRANSFER_ROUTE,
} from "./routes";

export const SIDEBAR_ITEMS = [
  {
    href: FUND_ROUTE,
    label: "Fund",
    Icon: RiAddCircleLine,
  },
  {
    href: LN_ADDRESS_ROUTE,
    label: "Lightning Address",
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
