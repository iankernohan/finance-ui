import { Link, Outlet } from "react-router";
import { Alert, Box, Snackbar, useTheme } from "@mui/material";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import { supabase } from "../Data/supabase";
import PageLoader from "../UI/PageLoader";
import { useTransactions } from "../../hooks/queries/useTransactions";
import { useCategories } from "../../hooks/queries/useCategories";
import { useUncategorizedTransactions } from "../../hooks/queries/useUncategorizedTransactions";

export default function PageLayout() {
  const theme = useTheme();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const uncategorizedTransactions = useStore(
    (state) => state.uncategorizedTransactions,
  );
  const [snackBar, setSnackBar] = useState(false);

  useTransactions();
  useCategories();
  useUncategorizedTransactions();

  useEffect(() => {
    async function gatherUser() {
      setLoading(true);
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
      setLoading(false);
    }
    if (!user) gatherUser();
  }, [user, setUser, setLoading]);

  useEffect(() => {
    if (uncategorizedTransactions.length > 0 && user) {
      setSnackBar(true);
    }
  }, [user, uncategorizedTransactions]);

  function handleCloseSnackbar() {
    setSnackBar(false);
  }

  return (
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
  );
}
