import {
  RiCalendar2Fill,
  RiAlarmLine,
  RiMacLine,
  RiFileList3Line,
  RiSettings4Line,
} from "react-icons/ri";

import {
  HOURS_ROUTE,
  SHOPFRONT_ROUTE,
  DOGALOGUE_ROUTE,
  BOOKINGS_ROUTE,
  SETTINGS_ROUTE,
} from "./routes";

export const SIDEBAR_ITEMS = [
  {
    href: BOOKINGS_ROUTE,
    label: "Bookings",
    Icon: RiCalendar2Fill,
  },
  {
    href: DOGALOGUE_ROUTE,
    label: "Dogalogue",
    Icon: RiFileList3Line,
  },
  {
    href: HOURS_ROUTE,
    label: "Hours",
    Icon: RiAlarmLine,
  },
  {
    href: SHOPFRONT_ROUTE,
    label: "Shopfront",
    Icon: RiMacLine,
  },
  {
    href: SETTINGS_ROUTE,
    label: "Settings",
    Icon: RiSettings4Line,
  },
];
