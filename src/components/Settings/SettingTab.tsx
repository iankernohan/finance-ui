import { Box } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router";
import type { SettingOption } from "../../Types/Settings";

interface SettingTabProps {
  setting: SettingOption;
  width?: string;
}

export default function SettingTab({ setting }: SettingTabProps) {
  const navigate = useNavigate();
  return (
    <Box
      component="button"
      sx={{
        all: "unset",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        padding: "1rem",
        width: "100%",
      }}
      onClick={() => navigate(setting.path)}
    >
      <p>{setting.name}</p>
      <KeyboardArrowRightIcon />
    </Box>
  );
}
