import { Outlet } from "react-router";

import { Box, useTheme } from "@mui/material";
// import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import {
  getBudgets,
  getCategories,
  getTransactions,
  getTransactionsByCategory,
} from "../Data/data";
import { supabase } from "../Data/supabase";
// import PlaidConnect from "../Data/plaidConnection";

export default function PageLayout() {
  const theme = useTheme();
  const setTransactions = useStore((state) => state.setTransactions);
  const setCategories = useStore((state) => state.setCategories);
  const setBudgets = useStore((state) => state.setBudgets);
  const setLoading = useStore((state) => state.setLoading);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    let mounted = true;
    async function gatherUser() {
      const user = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(user.data.user);
    }
    gatherUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      data?.subscription?.unsubscribe();
    };
  }, [setUser]);

  useEffect(() => {
    async function getStuff() {
      if (!user) return;
      setLoading(true);
      const transactions = await getTransactions();
      const categories = await getCategories();
      const budgets = await getBudgets();
      const transactionsByCategory = await getTransactionsByCategory();
      console.log(transactionsByCategory);
      setTransactions(transactions);
      setCategories(categories);
      setBudgets(budgets);
      setLoading(false);
    }
    getStuff();
  }, [setTransactions, setCategories, setLoading, setBudgets, user]);

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
        {/* <PlaidConnect userId="test-prod" /> */}
      </Box>
      {/* <NavbarMobile /> */}
    </Box>
  );
}
