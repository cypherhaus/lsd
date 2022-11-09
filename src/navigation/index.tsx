import { observer } from "mobx-react-lite";
import { useStore } from "../store";

export const Navigation = observer(() => {
  const { authStore } = useStore();
  return (
    <div className="flex justify-end pt-5 px-5 items-center">
      {authStore.currentUser && (
        <div>
          <span
            onClick={() => authStore.logout()}
            className="ml-8 font-bold cursor-pointer text-offWhite"
          >
            LOGOUT
          </span>
        </div>
      )}
    </div>
  );
});
