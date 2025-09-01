import { Box, Button, Fade } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FadeIn from "../UI/FadeIn";

export default function Settings() {
  const settingsOptions = [
    {
      name: "View Recurring Transactions",
      path: "recurring-transactions",
    },
  ];

  console.log(location.pathname.endsWith("settings"));
  const navigate = useNavigate();
  return (
    <Box>
      <FadeIn>
        <h1 style={{ textAlign: "center" }}>Settings</h1>
      </FadeIn>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {location.pathname.endsWith("settings") ? (
          settingsOptions.map((setting, i) => (
            <FadeIn
              transitionDelay={`0.${i + 1}`}
              sx={{
                display: "flex",
              }}
              key={setting.name}
            >
              <Box
                component="button"
                sx={{
                  all: "unset",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                  padding: "1rem",
                }}
                onClick={() => navigate(setting.path)}
              >
                <p>{setting.name}</p>
                <KeyboardArrowRightIcon />
              </Box>
            </FadeIn>
          ))
        ) : (
          <Box>
            <Button
              sx={{ position: "absolute", top: 72, left: 0 }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </Button>
            <Outlet />
          </Box>
        )}
      </Box>
    </Box>
  );
}
