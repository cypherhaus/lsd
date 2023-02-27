import { useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";

const Auth = observer(() => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <div className="p-10 bg-white">
      <p className="text-6xl font-bold text-center text-brandOrange mb-2">
        {isSignUp ? "Sign Up" : "Welcome"}
      </p>

      {isSignUp ? <SignUpForm /> : <LoginForm />}

      <div className="text-2xl text-center cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Have an account?" : "Don't have an account?"}
      </div>
    </div>
  );
});

export default Auth;
