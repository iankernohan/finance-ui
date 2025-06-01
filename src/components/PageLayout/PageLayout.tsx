import { Outlet } from "react-router";

import { Box, useTheme } from "@mui/material";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Header from "../Header/Header";
import { useEffect, useState } from "react";

export default function PageLayout() {
  const theme = useTheme();
  const [stuff, setStuff] = useState();

  useEffect(() => {
    async function getStuff() {
      const res = await fetch("http://localhost:5155");
      console.log(res);
      const data = await res.json();
      setStuff(data);
    }
    getStuff();
  }, []);

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
