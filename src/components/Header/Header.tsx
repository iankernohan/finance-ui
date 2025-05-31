import { Box, Switch, Typography } from "@mui/material";
import { useStore } from "../../store/store";
import "./header.css";

export default function Header() {
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <Box className="header">
      <Typography variant="h3">Finance</Typography>
      <Switch onChange={toggleDarkMode} />
    </Box>
  );
}
