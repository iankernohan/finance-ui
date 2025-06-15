import { Outlet } from "react-router";

import { Box, useTheme } from "@mui/material";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Header from "../Header/Header";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import { getCategories, getTransactions } from "../Data/data";

export default function PageLayout() {
  const theme = useTheme();
  const setTransactions = useStore((state) => state.setTransactions);
  const setCategories = useStore((state) => state.setCategories);
  const setLoading = useStore((state) => state.setLoading);

  useEffect(() => {
    async function getStuff() {
      setLoading(true);
      const transactions = await getTransactions();
      console.log(transactions);
      const categories = await getCategories();
      setTransactions(transactions);
      setCategories(categories);
      setLoading(false);
    }
    getStuff();
  }, [setTransactions, setCategories, setLoading]);

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
