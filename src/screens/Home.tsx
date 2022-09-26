import { Screen } from "../components/Screen";
import { useStore } from "../store";

export const Home = () => {
  const { authStore } = useStore();

  return (
    <Screen>
      <div>Transfer between wallet</div>
      <div>Pay Invoice</div>
    </Screen>
  );
};
