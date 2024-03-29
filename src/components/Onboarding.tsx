import React from "react";
import { Input } from "./common/Input";
import { Button } from "./common/Button";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";

// Components
import { ErrorLabel } from "./common/ErrorLabel";

const Onboarding = observer(() => {
  const { authView } = useStore();
  const {
    setUsername,
    handleUsername,
    handleLogoutClick,
    onboardingError,
    username,
  } = authView;

  return (
    <div className="flex flex-col gap-5 bg-white p-10">
      <div className="text-5xl font-bold text-center">Username</div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <Input
            onChange={setUsername}
            value={username}
            placeholder="Username"
          />
          {onboardingError && <ErrorLabel>{onboardingError}</ErrorLabel>}
        </div>
        <Button onClick={handleUsername} type="submit">
          NEXT
        </Button>
      </div>
      <div
        onClick={handleLogoutClick}
        className="text-2xl text-center cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
});

export default Onboarding;
