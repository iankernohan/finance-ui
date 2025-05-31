import { Outlet } from "react-router";

import { Box, useTheme } from "@mui/material";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Header from "../Header/Header";

export default function PageLayout() {
  const theme = useTheme();

  return (
    <Box
      className="page-layout"
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
      component={"main"}
    >
      <Header />
      <Box className="outlet">
        <Outlet />
      </Box>
      <NavbarMobile />
    </Box>
  );
}
