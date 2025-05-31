import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavItem from "../NavItem/NavItem";
import { Box, useTheme } from "@mui/material";
import "./navbarMobile.css";

export default function NavbarMobile() {
  const theme = useTheme();
  return (
    <Box component="nav">
      <NavItem to="/">
        <HomeIcon />
      </NavItem>
      <NavItem to="/history">
        <HistoryIcon />
      </NavItem>
      <NavItem to="/profile">
        <AccountCircleIcon />
      </NavItem>
    </Box>
  );
}
