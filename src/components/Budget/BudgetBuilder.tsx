import { Box, useTheme } from "@mui/material";
import { useStore } from "../../store/store";
import FadeIn from "../UI/FadeIn";
import BudgetTile from "./BudgetTile";
import { useEffect } from "react";
import { getRecurringTransactions } from "../Data/data";
import { formatMoney } from "../../utils/helpers";
import Loader from "../UI/Loader";

export default function BudgetBuilder() {
  const theme = useTheme();
  const budgets = useStore((state) => state.budgets);
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const totalBudgetAmount = budgets.reduce((acc, curr) => acc + curr.limit, 0);
  const incomeIds = useStore((state) => state.incomeIds);
  const recurringTransactions = useStore(
    (state) => state.recurringTransactions
  );
  const setRecurringTransactions = useStore(
    (state) => state.setRecurringTransactions
  );
  const recurringIncomeAmount = recurringTransactions
    .filter((rt) => incomeIds.includes(rt.categoryId))
    .reduce((a, b) => a + b.amount, 0);
  const savings = recurringIncomeAmount - totalBudgetAmount;

  useEffect(() => {
    async function fetchRecurringTransactions() {
      setLoading(true);
      const res = await getRecurringTransactions();
      setLoading(false);
      setRecurringTransactions(res);
    }
    if (recurringTransactions.length === 0) fetchRecurringTransactions();
  }, [setRecurringTransactions, recurringTransactions.length, setLoading]);

  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontWeight: 200 }}>Monthly Budget</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          margin: "1rem 0",
          height: "4rem",
          fontWeight: "300",
        }}
      >
        {loading ? (
          <Loader width="80" />
        ) : (
          <>
            <p>
              Projected Income:{" "}
              <span style={{ color: theme.palette.success.main }}>
                {formatMoney(recurringIncomeAmount)}
              </span>
            </p>
            <p>
              Savings:{" "}
              <span
                style={{
                  color:
                    savings > 0
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                }}
              >
                {formatMoney(savings)}
              </span>
            </p>
          </>
        )}
      </Box>
      <Box sx={{ width: "80%" }}>
        {budgets.map((b, i) => (
          <FadeIn transitionDelay={`${i / 20}`} key={b.id}>
            <BudgetTile budget={b} />
          </FadeIn>
        ))}
      </Box>
    </Box>
  );
}
