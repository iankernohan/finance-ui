import { Box } from "@mui/material";
import "./header.css";
import { NavLink } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SavingsIcon from "@mui/icons-material/Savings";

export default function Header() {
  return (
    <Box className="header">
      <NavLink className="link" to="/">
        <HomeIcon />
      </NavLink>
      <NavLink className="link" to="/history">
        <HistoryIcon />
      </NavLink>
      <NavLink className="link" to="/budget/budgetBuilder">
        <SavingsIcon />
      </NavLink>
      <NavLink className="link" to="/profile">
        <AccountCircleIcon />
      </NavLink>
    </Box>
  );
}
