import { Box, Switch } from "@mui/material";
import BackButton from "../UI/BackButton";
import { useStore } from "../../store/store";
import { supabase } from "../Data/supabase";
import { useNavigate } from "react-router";
import { useRef } from "react";
import FancyButton from "../UI/FancyButton";
import { runRulesApplier } from "../Data/categoryRules";
import { useQueryClient } from "@tanstack/react-query";

export default function Settings() {
  const navigate = useNavigate();
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const setLoading = useStore((state) => state.setLoading);
  const setUser = useStore((state) => state.setUser);
  const headingRef = useRef<HTMLElement | null>(null);
  const queryClient = useQueryClient();

  async function handleSignout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out: ", error);
    } else {
      navigate("/login");
      setUser(null);
    }
    setLoading(false);
  }

  async function handleApplyCategoryRules() {
    await runRulesApplier();
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Box ref={headingRef}>
        <BackButton top={8} />
        <h2
          style={{
            textAlign: "center",
            fontWeight: 300,
            fontSize: "2rem",
            margin: 0,
          }}
        >
          Settings
        </h2>
      </Box>
      <Box
        sx={{
          display: "grid",
          alignItems: "end",
          justifyContent: "center",
          gridTemplateRows: "50px 50px 1fr",
          gap: "1rem",
          width: "90%",
          height: `calc(100% - ${headingRef.current?.clientHeight ?? 0}px)`,
          margin: " auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>{`Toggle ${darkMode ? "Light" : "Dark"} Mode`}</p>
          <Switch onChange={toggleDarkMode} />
        </Box>
        <FancyButton onClick={handleApplyCategoryRules}>
          Run Rules Applier
        </FancyButton>
        <FancyButton variant="secondary" onClick={handleSignout}>
          sign out
        </FancyButton>
      </Box>
    </Box>
  );
}
