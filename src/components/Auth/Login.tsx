import { useEffect, useState } from "react";
import { supabase } from "../Data/supabase";
import { Box, useTheme } from "@mui/material";
import LittleGuy from "../../assets/limbless-guy.png";
import Parcel from "../UI/Parcel";
import { useNavigate } from "react-router";
import { useStore } from "../../store/store";

export function Login() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (user) navigate(-1);
  }, [user, navigate]);

  async function handleLogin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
    } else {
      navigate("/");
      console.log("Logged in:", data);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <Box
      component={"form"}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3rem",
        padding: "5rem 2rem",
      }}
    >
      <Parcel
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "1.75rem",
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          autoComplete="username"
          autoFocus
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          autoComplete="current-password"
        />
        <button
          style={{
            width: "80%",
            height: "2.5rem",
            background: theme.palette.primary.main,
            border: "none",
            boxShadow:
              !email.length || !password.length
                ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                : "0 4px 8px rgba(255, 254, 254, 0.1)",
            borderRadius: "100px",
            marginTop: "1rem",
            transition: "all 0.25s ease-in-out",
          }}
          disabled={Boolean(!email.length || !password.length)}
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
      </Parcel>
      <img
        style={{
          width: "150px",
          height: "150px",
        }}
        src={LittleGuy}
      />
    </Box>
  );
}
