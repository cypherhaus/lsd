import { Navigation } from "./navigation";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const App = () => {
  return (
    <>
      <Navigation />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
