// Show these Nav Items if the app is Authenticated
export const authenticatedNav = [
  {
    href: "/",
    title: "HOME",
  },
  {
    href: "/wallet",
    title: "WALLET",
  },
  {
    href: "/logout",
    title: "LOGOUT",
  },
];

// Show these Nav Items if the app is Not authenticated
export const unauthenticatedNav = [
  {
    href: "/",
    title: "HOME",
  },
  {
    href: "/auth",
    title: "LOGIN",
  },
];
