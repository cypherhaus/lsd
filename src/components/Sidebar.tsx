import { useRouter } from "next/router";
import { SIDEBAR_ITEMS } from "../constants/sidebar";

export const Sidebar = () => {
  const router = useRouter();
  return (
    <aside className="p-4 w-40 h-full bg-[lightGrey] flex gap-4 flex-col">
      {SIDEBAR_ITEMS.map((navItem) => (
        <div
          key={navItem.href}
          className="cursor-pointer"
          onClick={() => router.push(navItem.href)}
        >
          {navItem.label}
        </div>
      ))}
    </aside>
  );
};