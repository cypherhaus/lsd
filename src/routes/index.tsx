import { createBrowserRouter } from "react-router-dom";
import { Auth } from "../screens/Auth";
import { Dashboard } from "../screens/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);
