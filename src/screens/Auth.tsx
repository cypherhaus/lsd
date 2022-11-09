import { useState } from "react";
import { useStore } from "../store";
import { observer } from "mobx-react-lite";
import { Input } from "../components/common/Input";

export const Auth = observer(() => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("danramac");
  const [email, setEmail] = useState<string>("dr.mcgrane@gmail.com");
  const [password, setPassword] = useState<string>("passwordtest");

  const { authView } = useStore();

  const handleSignup = async () => {
    authView.createUser(email, username, password);
  };

  const handleLogin = async () => authView.login(email, password);

  return (
    <div className="p-10">
      <div className="flex flex-col items-center justify-center">
        <p>{isSignUp ? "Sign Up" : "Login"}</p>
        {isSignUp && (
          <Input
            placeholder="username"
            onChange={setUsername}
            value={username}
          />
        )}

        <Input placeholder="email" value={email} onChange={setEmail} />
        <Input
          type="password"
          onChange={setPassword}
          placeholder="password"
          value={password}
        />
        <button onClick={() => (isSignUp ? handleSignup() : handleLogin())}>
          SUBMIT
        </button>
        <div className="cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Have an account?" : "Don't have an account?"}
        </div>
      </div>
    </div>
  );
});
