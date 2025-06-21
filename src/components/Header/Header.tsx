import { Box, Switch, Typography } from "@mui/material";
import { useStore } from "../../store/store";
import "./header.css";

export default function Header() {
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <Box className="header">
      <h1 style={{ marginLeft: "1rem", fontWeight: "200", fontSize: "2.5rem" }}>
        Finance
      </h1>
      <Switch onChange={toggleDarkMode} />
    </Box>
  );
}
