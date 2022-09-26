import { createBrowserRouter } from "react-router-dom";
import { Auth } from "../screens/Auth";
import { Home } from "../screens/Home";
import { Wallet } from "../screens/Wallet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
