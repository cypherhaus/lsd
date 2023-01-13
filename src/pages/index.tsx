import { Input } from "../components/common/Input";
import { useEffect, useState } from "react";
import { useStore } from "../store";
import { supabase } from "../config/supabase";
import { useRouter } from "next/router";
import { Button } from "../components/common/Button";

export default function Home() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { authView, authStore } = useStore();

  const handleSignup = async () => {
    authView.createUser(email, password);
  };

  const handleLogin = async () => {
    authView.login(email, password);
  };

  const rerieveSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      authStore.setUser(data.session);
      router.push("/dashboard/bookings");
    }
  };

  useEffect(() => {
    rerieveSession();
  }, [authStore.currentUser]);

  return (
    <div className="flex flex-col items-center h-screen p-10 flex-1 justify-center">
      <p className="mt-6 text-xl font-bold text-center mb-2">
        {isSignUp ? "Sign Up" : "Login"}
      </p>

      <Input placeholder="email" value={email} onChange={setEmail} />
      <Input
        type="password"
        onChange={setPassword}
        placeholder="password"
        value={password}
      />
      <Button onClick={isSignUp ? handleSignup : handleLogin}>SUBMIT</Button>
      <div className="cursor-pointer" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Have an account?" : "Don't have an account?"}
      </div>
    </div>
  );
}
