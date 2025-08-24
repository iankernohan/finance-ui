import { Box, Switch, Typography } from "@mui/material";
import { useStore } from "../../store/store";
import "./header.css";
import { NavLink } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <Box className="header">
      <NavLink className="link" to="/">
        <HomeIcon />
        <Typography>Home</Typography>
      </NavLink>
      <NavLink className="link" to="/history">
        <HistoryIcon />
        <Typography>History</Typography>
      </NavLink>
      <NavLink className="link" to="/profile">
        <AccountCircleIcon />
        <Typography>Me</Typography>
      </NavLink>
    </Box>
  );
}
