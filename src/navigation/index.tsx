import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { unauthenticatedNav, authenticatedNav } from "./NavItems";

export const Navigation = observer(() => {
  const { authStore } = useStore();
  const nav = authStore.currentUser ? authenticatedNav : unauthenticatedNav;
  return (
    <div className="flex justify-end pt-5 px-5">
      {nav.map((nav) => (
        <a key={nav.href} className="ml-8 font-bold" href={nav.href}>
          {nav.title}
        </a>
      ))}
      {authStore.currentUser && (
        <div>
          <span
            onClick={() => authStore.logout()}
            className="ml-8 font-bold cursor-pointer"
          >
            LOGOUT
          </span>
          <span className="ml-8 font-bold cursor-pointer bg-black text-white p-2 rounded">
            Balance: 0 SATS
          </span>
        </div>
      )}
    </div>
  );
});
