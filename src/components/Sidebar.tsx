import { useRouter } from "next/router";
import Link from "next/link";

// Components
import { Tooltip } from "./common/Tooltip";

// Constants
import { SIDEBAR_ITEMS } from "../constants/sidebar";

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="h-full bg-white flex flex-col">
      {SIDEBAR_ITEMS.map((navItem) => {
        const style =
          router.pathname === navItem.href
            ? "text-orange cursor-pointer text-5xl"
            : "cursor-pointer text-5xl";

        return (
          <div
            key={navItem.href}
            className="flex relative border-b-2 border-r-2 p-2"
          >
            <Link href={navItem.href} className="peer">
              <navItem.Icon className={style} />
            </Link>
            <Tooltip text={navItem.label} />
          </div>
        );
      })}
    </aside>
  );
};
