import { useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";

const Auth = observer(() => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <div className="flex flex-col bg-white gap-4 rounded-xl p-10">
      <p className="text-6xl font-bold text-center text-brandOrange">Welcome</p>

      {isSignUp ? <SignUpForm /> : <LoginForm />}

      <div
        className="text-2xl text-center cursor-pointer"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Have an account?" : "Don't have an account?"}
      </div>
    </div>
  );
});

export default Auth;
