import { useRouter } from "next/router";
import { SIDEBAR_ITEMS } from "../constants/sidebar";

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="pt-8 p-4 w-60 h-full bg-white flex gap-4 flex-col">
      {SIDEBAR_ITEMS.map((navItem) => {
        const style = router.pathname.includes(navItem.href)
          ? "cursor-pointer font-button text-2xl font-medium"
          : "cursor-pointer font-button text-2xl font-extrabold";

        return (
          <div
            key={navItem.href}
            className={style}
            onClick={() => router.push(navItem.href)}
          >
            {navItem.label}
          </div>
        );
      })}
    </aside>
  );
};
