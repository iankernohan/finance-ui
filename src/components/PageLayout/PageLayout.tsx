import { Link, Outlet, useNavigate } from "react-router";

import { Alert, Box, Snackbar, useTheme } from "@mui/material";
// import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { getBudgets, getTransactions } from "../Data/data";
import {
  getPlaidTransactions,
  getUncategorizedTransactions,
  getTransactionsByCategory,
} from "../Data/transactions";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import { supabase } from "../Data/supabase";
import PageLoader from "../UI/PageLoader";
import { useTransactions } from "../../hooks/queries/useTransactions";
import { useCategories } from "../../hooks/queries/useCategories";
import { useUncategorizedTransactions } from "../../hooks/queries/useUncategorizedTransactions";
// import PlaidConnect from "../Data/plaidConnection";

export default function PageLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const setBudgets = useStore((state) => state.setBudgets);
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const uncategorizedTransactions = useStore(
    (state) => state.uncategorizedTransactions,
  );
  const [snackBar, setSnackBar] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useTransactions();
  useCategories();
  useUncategorizedTransactions();

  useEffect(() => {
    let mounted = true;
    async function gatherUser() {
      const user = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(user.data.user);
    }
    gatherUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      // setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      data?.subscription?.unsubscribe();
    };
  }, [setUser]);

  useEffect(() => {
    async function getStuff() {
      if (!user) {
        return;
      }
      setLoading(true);
      const threeMonths = await getPlaidTransactions("prod", {
        numberOfMonths: 1,
      });
      const budgets = await getBudgets();
      const transactionsByCategory = await getTransactionsByCategory();
      setBudgets(budgets);
      setLoading(false);
    }
    getStuff();
  }, [setLoading, setBudgets, user, navigate]);

  useEffect(() => {
    if (uncategorizedTransactions.length > 0) {
      setSnackBar(true);
    }
  }, [uncategorizedTransactions]);

  function handleCloseSnackbar() {
    setSnackBar(false);
  }

  return user ? (
    <Box
      className="page-layout"
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
      component={"main"}
    >
      {loading && <PageLoader />}
      <Header />
      <Box className="outlet">
        <Outlet />
        {/* <PlaidConnect userId="test-prod" /> */}
      </Box>
      {/* <NavbarMobile /> */}
      <Snackbar
        open={snackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            "& .MuiAlert-message": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <Box>
            You have {uncategorizedTransactions.length} uncategorized
            transactions!
          </Box>
          <Link to={"/"}>
            <ArrowRightIcon />
          </Link>
        </Alert>
      </Snackbar>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100dvw",
        height: "100dvh",
        background: theme.palette.background.default,
        fontSize: "2rem",
      }}
    >
      Not signed in.
    </Box>
  );
}
