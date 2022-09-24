import { Navigation } from "./components/Navigation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
`;

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/wallet",
      element: <div />,
    },
    {
      path: "/",
      element: <div />,
    },
  ]);

  return (
    <Wrapper>
      <Navigation />
      <RouterProvider router={router} />
    </Wrapper>
  );
};

export default App;
