import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { NavLink } from "react-router-dom";
import { unauthenticatedNav, authenticatedNav } from "./NavItems";

export const Navigation = observer(() => {
  const { authStore } = useStore();
  const nav = authStore.currentUser ? authenticatedNav : unauthenticatedNav;
  return (
    <div className="flex justify-end pt-5 px-5">
      {nav.map((nav) => (
        <NavLink key={nav.href} className="ml-8 font-bold" to={nav.href}>
          {nav.title}
        </NavLink>
      ))}
      {authStore.currentUser && (
        <div>
          <span
            onClick={() => authStore.logout()}
            className="ml-8 font-bold cursor-pointer"
          >
            LOGOUT
          </span>
        </div>
      )}
    </div>
  );
});
