import { Box, Switch } from "@mui/material";
import FadeIn from "../UI/FadeIn";
// import SettingTab from "./SettingTab";
import type { SettingOption } from "../../Types/Settings";
import BackButton from "../UI/BackButton";
import { useStore } from "../../store/store";

export default function Settings() {
  // const settingsOptions: SettingOption[] = [
  //   {
  //     name: "View Recurring Transactions",
  //     path: "recurring-transactions",
  //   },
  // ];

  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <Box sx={{ position: "relative" }}>
      <FadeIn>
        <BackButton top={8} />
        <h2 style={{ textAlign: "center", fontWeight: 300, fontSize: "2rem" }}>
          Settings
        </h2>
      </FadeIn>
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
        {/* {settingsOptions.map((setting, i) => (
          <FadeIn
            transitionDelay={`0.${i + 1}`}
            sx={{
              display: "flex",
            }}
            key={setting.name}
          >
            <SettingTab setting={setting} />
          </FadeIn>
        ))} */}
      </Box>
    </Box>
  );
}
