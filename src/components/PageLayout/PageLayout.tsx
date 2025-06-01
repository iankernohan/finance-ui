import { Outlet } from "react-router";

import { Box, useTheme } from "@mui/material";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";

export default function PageLayout() {
  const theme = useTheme();
  const setTransactions = useStore((state) => state.setTransactions);

  useEffect(() => {
    async function getStuff() {
      const res = await fetch("http://localhost:5028/getAllData");
      const data = await res.json();
      console.log(data);
      setTransactions(data);
    }
    getStuff();
  }, [setTransactions]);

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
