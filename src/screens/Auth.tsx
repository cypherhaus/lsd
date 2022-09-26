import { useState } from "react";
import { useStore } from "../store";
import { Screen } from "../components/Screen";
import { observer } from "mobx-react-lite";

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
    <Screen>
      <div className="flex flex-col items-center justify-center">
        <p>{isSignUp ? "Sign Up" : "Login"}</p>
        {isSignUp && (
          <input
            className="my-2 border-2 border-black"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        )}

        <input
          className="my-2 border-2 border-black"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="my-2 border-2 border-black"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
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
    </Screen>
  );
});
