import { observer } from "mobx-react-lite";
import { useStore } from "../store";

export const Navigation = observer(() => {
  const { authStore, lightningStore } = useStore();
  return (
    <div className="flex justify-end pt-5 px-5 items-center">
      {authStore.currentUser && (
        <div className="flex flex-1 justify-between">
          <span
            onClick={() => authStore.logout()}
            className="font-bold cursor-pointer text-black"
          >
            hi {lightningStore.wallet?.username}!
          </span>
          <span
            onClick={() => authStore.logout()}
            className="font-bold cursor-pointer text-black"
          >
            LOGOUT
          </span>
        </div>
      )}
    </div>
  );
});
