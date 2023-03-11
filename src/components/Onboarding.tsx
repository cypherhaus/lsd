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
    setBusinessName,
    handleBusinessInfo,
    handleLogoutClick,
    onboardingError,
    businessName,
  } = authView;

  return (
    <div className="flex flex-col gap-5 bg-white rounded-xl p-10">
      <div className="text-5xl font-bold text-center">Business Info</div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <Input
            onChange={(e) => setBusinessName(e.target.value)}
            error={!!onboardingError}
            value={businessName}
            placeholder="Business Name"
          />
          {onboardingError && <ErrorLabel>{onboardingError}</ErrorLabel>}
        </div>
        <Button onClick={handleBusinessInfo} type="submit">
          NEXT
        </Button>
      </div>
      <div
        onClick={handleLogoutClick}
        className="text-2xl text-center cursor-pointer"
      >
        logout
      </div>
    </div>
  );
});

export default Onboarding;
