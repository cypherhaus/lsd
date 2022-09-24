import { useState } from "react";
import { useStore } from "../store";
import { Page } from "../components/Page";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState<string>("danramac");
  const [email, setEmail] = useState<string>("dr.mcgrane@gmail.com");
  const [password, setPassword] = useState<string>("passwordtest");

  const { authStore } = useStore();

  const handleSignup = async () => authStore.signUp(email, username, password);
  const handleLogin = async () => authStore.login(email, password);

  return (
    <Page>
      <div className="flex flex-col items-center justify-center w-full h-full">
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
        <div onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Have an account?" : "Don't have an account?"}
        </div>
      </div>
    </Page>
  );
};
