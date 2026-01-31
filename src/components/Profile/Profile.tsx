import { Box, Button } from "@mui/material";
import { useStore } from "../../store/store";
import { getLittleGuy } from "../../utils/helpers";
import { Outlet, useLocation, useNavigate } from "react-router";
import FadeIn from "../UI/FadeIn";
import SettingTab from "../Settings/SettingTab";
import { supabase } from "../Data/supabase";

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  const options = useStore((state) => state.profileOptions);
  const setLoading = useStore((state) => state.setLoading);

  async function handleSignout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out: ", error);
    } else {
      navigate("/login");
    }
    setLoading(false);
  }

  return (
    <Box
      sx={{
        padding: "1rem",
        paddingTop: "2rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {location.pathname.endsWith("profile") ? (
        <>
          <Box
            sx={{
              margin: "0 auto",
              display: "flex",
              placeItems: "center",
              flexDirection: "column",
              gap: "0.5rem",
              justifyContent: "center",
              width: "75%",
            }}
          >
            {options.map((option, i) => (
              <FadeIn
                transitionDelay={`0.${i + 1}`}
                sx={{ width: "100%" }}
                key={option.name}
              >
                <SettingTab setting={option} key={option.name} />
              </FadeIn>
            ))}
            <Button
              sx={{ marginTop: "1rem" }}
              variant="outlined"
              onClick={handleSignout}
            >
              sign out
            </Button>
            {/* <button
              onClick={() =>
                supabase.auth.refreshSession().then((d) => console.log(d))
              }
            >
              refresh
            </button> */}
          </Box>
        </>
      ) : (
        <Box sx={{ overflow: "auto" }}>
          <Outlet />
        </Box>
      )}
      <FadeIn
        transitionDelay="0.5"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 0 10px 10px var(--mui-palette-background-default)",
          width: "100dvw",
          translate: "-1rem 0",
          padding: "1rem",
          paddingBottom: "0",
        }}
      >
        <h1
          style={{
            fontWeight: 200,
            fontSize: "1.5rem",
            fontStyle: "italic",
          }}
        >
          {`${getGreeting()}, Ian.`}
        </h1>
        <img
          style={{
            width: 80,
            // margin: "auto",
            // position: "absolute",
            // right: 40,
            // top: 60,
          }}
          src={getLittleGuy(1)}
        />
      </FadeIn>
    </Box>
  );
}
