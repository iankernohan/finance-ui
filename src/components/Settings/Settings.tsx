import { Box, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

export default function Settings() {
  const settingsOptions = [
    {
      name: "View Recurring Transactions",
      path: "/recurring-transactions",
    },
  ];

  console.log(location.pathname.endsWith("settings"));
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h1">Settings</Typography>
      <Box>
        {location.pathname.endsWith("settings") ? (
          settingsOptions.map((setting) => (
            <Box
              component="button"
              onClick={() => navigate("recurring-transactions")}
            >
              {setting.name}
            </Box>
          ))
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}
