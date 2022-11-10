import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { Input } from "./common/Input";

export const Stream = observer(() => {
  const { dashboardView, authStore } = useStore();
  return (
    <div className="flex flex-col items-center h-full p-10 flex-1">
      <p className="text-xl font-bold text-center mb-8">Stream to username</p>
      <Input
        onChange={dashboardView.setSendUsername}
        placeholder="Username"
        value={dashboardView.sendUsername}
      />
      <button
        onClick={() =>
          dashboardView.handlePayUsername(authStore.currentUser.id)
        }
        className="rounded p-3 mt-5 text-white bg-black text-xl font-bold"
      >
        Start
      </button>
    </div>
  );
});
