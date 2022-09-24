// font-size: 18px;
// margin: 0px 15px;
// text-decoration: none;
// margin-bottom: 2rem;
// color: black;
// cursor: pointer;
// font-weight: bold;
import { unauthenticatedNav, authenticatedNav } from "./NavItems";

export const Navigation = () => {
  return (
    <div>
      {unauthenticatedNav.map((nav) => (
        <a className="mr-8 mt-5 font-bold" href={nav.href}>
          {nav.title}
        </a>
      ))}
    </div>
  );
};
