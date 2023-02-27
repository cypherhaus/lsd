import { useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";

const Auth = observer(() => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <>
      <p className="mt-6 text-xl font-bold text-center mb-2">
        {isSignUp ? "Sign Up" : "Login"}
      </p>

      {isSignUp ? <SignUpForm /> : <LoginForm />}

      <div className="cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Have an account?" : "Don't have an account?"}
      </div>
    </>
  );
});

export default Auth;
