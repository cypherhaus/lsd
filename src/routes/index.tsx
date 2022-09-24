import { createBrowserRouter } from "react-router-dom";
import { Auth } from "../screens/Auth";

export const router = createBrowserRouter([
  {
    path: "/wallet",
    element: <div />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <div />,
  },
]);
