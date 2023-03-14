import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Components
import { Tooltip } from "./common/Tooltip";

// Constants
import { SIDEBAR_ITEMS } from "../constants/sidebar";

export const Sidebar = () => {
  const router = useRouter();
  const [hover, setHover] = useState("");

  return (
    <aside className="p-4 h-full bg-white flex gap-5 flex-col">
      {SIDEBAR_ITEMS.map((navItem) => {
        const style = router.pathname.includes(navItem.href)
          ? "text-brandOrange cursor-pointer text-5xl"
          : "cursor-pointer text-5xl";

        return (
          <Link
            key={navItem.href}
            href={navItem.href}
            className="flex flex-row relative"
            onMouseEnter={() => setHover(navItem.href)}
            onMouseLeave={() => setHover("")}
          >
            <navItem.Icon className={style} />
            {hover == navItem.href && <Tooltip text={navItem.label} />}
          </Link>
        );
      })}
    </aside>
  );
};
