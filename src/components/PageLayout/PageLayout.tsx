import { Outlet } from "react-router";

import { Box, useTheme } from "@mui/material";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Header from "../Header/Header";
import { useEffect } from "react";
import { useStore } from "../../store/store";
import { getBudgets, getCategories, getTransactions } from "../Data/data";

export default function PageLayout() {
  const theme = useTheme();
  const setTransactions = useStore((state) => state.setTransactions);
  const setCategories = useStore((state) => state.setCategories);
  const setBudgets = useStore((state) => state.setBudgets);
  const setLoading = useStore((state) => state.setLoading);

  useEffect(() => {
    async function getStuff() {
      setLoading(true);
      const transactions = await getTransactions();
      const categories = await getCategories();
      const budgets = await getBudgets();
      console.log(budgets);
      setTransactions(transactions);
      setCategories(categories);
      setBudgets(budgets);
      setLoading(false);
    }
    getStuff();
  }, [setTransactions, setCategories, setLoading, setBudgets]);

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
      {/* <NavbarMobile /> */}
    </Box>
  );
}
