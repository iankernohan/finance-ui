import { Box, Button, Switch } from "@mui/material";
import BackButton from "../UI/BackButton";
import { useStore } from "../../store/store";
import { supabase } from "../Data/supabase";
import { useNavigate } from "react-router";

export default function Settings() {
  const navigate = useNavigate();
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const setLoading = useStore((state) => state.setLoading);
  const setUser = useStore((state) => state.setUser);

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

  return (
    <Box sx={{ position: "relative" }}>
      <Box>
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
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "90%",
          margin: "2rem auto",
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
        <Button
          sx={{ marginTop: "1rem" }}
          variant="outlined"
          onClick={handleSignout}
        >
          sign out
        </Button>
      </Box>
    </Box>
  );
}
