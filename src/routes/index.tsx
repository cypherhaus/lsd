import { createBrowserRouter } from "react-router-dom";
import { Auth } from "../screens/Auth";
import { Dashboard } from "../screens/Dashboard";
import { Wallet } from "../screens/Wallet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/wallet",
    element: <Wallet />,
  },
]);
