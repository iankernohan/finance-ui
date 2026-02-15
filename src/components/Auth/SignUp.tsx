import { useEffect, useState } from "react";
import { supabase } from "../Data/supabase";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(-1);
  });

  async function handleSignUp() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log("Signed up:", data);
  }

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}
