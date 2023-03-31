import { RiCalendar2Fill, RiAlarmLine, RiFileList3Line } from "react-icons/ri";

import { PAGE_1_ROUTE, PAGE_2_ROUTE, PAGE_3_ROUTE } from "./routes";

export const SIDEBAR_ITEMS = [
  {
    href: PAGE_1_ROUTE,
    label: "Page1",
    Icon: RiCalendar2Fill,
  },
  {
    href: PAGE_2_ROUTE,
    label: "Page2",
    Icon: RiFileList3Line,
  },
  {
    href: PAGE_3_ROUTE,
    label: "Page3",
    Icon: RiAlarmLine,
  },
];
