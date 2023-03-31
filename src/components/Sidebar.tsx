import { useRouter } from "next/router";
import Link from "next/link";

// Components
import { Tooltip } from "./common/Tooltip";

// Constants
import { SIDEBAR_ITEMS } from "../constants/sidebar";

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="p-4 h-full bg-white flex gap-5 flex-col">
      {SIDEBAR_ITEMS.map((navItem) => {
        const style = router.pathname.includes(navItem.href)
          ? "text-primary cursor-pointer text-5xl"
          : "cursor-pointer text-5xl";

        return (
          <div key={navItem.href} className="flex relative">
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
