import { Box } from "@mui/material";
import { useStore } from "../../store/store";
import { getLittleGuy } from "../../utils/helpers";
import { Outlet, useLocation } from "react-router";
import FadeIn from "../UI/FadeIn";
import SettingTab from "../Settings/SettingTab";

export default function Profile() {
  const location = useLocation();
  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  const options = useStore((state) => state.profileOptions);

  return (
    <Box
      sx={{
        padding: "1rem",
        height: "100%",
      }}
    >
      <FadeIn
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontWeight: 200,
            margin: "1rem 2rem",
            marginBottom: "3rem",
            fontSize: "2.5rem",
            fontStyle: "italic",
          }}
        >
          {`${getGreeting()}, Ian.`}
        </h1>
        <img
          style={{
            width: 100,
            // margin: "auto",
            // position: "absolute",
            // right: 40,
            // top: 60,
          }}
          src={getLittleGuy(1)}
        />
      </FadeIn>

      {location.pathname.endsWith("profile") ? (
        <>
          <Box
            sx={{
              margin: "0 auto",
              display: "flex",
              placeItems: "center",
              flexDirection: "column",
              gap: "1rem",
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
          </Box>
        </>
      ) : (
        <Box>
          <Outlet />
        </Box>
      )}
    </Box>
  );
}
