import React from "react";
import { Input } from "./common/Input";
import { Button } from "./common/Button";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";

const Onboarding = observer(() => {
  const { authView } = useStore();

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-10">
      <div className="text-5xl mb-3 font-bold text-center">
        Business Info
      </div>
      <div className="flex flex-col">
        <Input
          onChange={(e) => authView.setBusinessName(e.target.value)}
          error={!!authView.onboardingError}
          value={authView.businessName}
          placeholder="Business Name"
        />
        <Button onClick={authView.handleBusinessInfo} type="submit">
          NEXT
        </Button>
      </div>
    </div>
  );
});

export default Onboarding;
