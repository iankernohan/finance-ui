import { Box, LinearProgress, useTheme } from "@mui/material";
import { useStore } from "../../store/store";
import BudgetTile from "./BudgetTile";
import { formatMoney, getMonth } from "../../utils/helpers";
import MonthPicker from "../Graphs/MonthPicker";
import { useEffect, useState } from "react";
import type { MonthlySummary } from "../../Types/Transaction";
import { useMonthlySummaries } from "../../hooks/queries/useMonthlySummary";

export default function BudgetBuilder() {
  const theme = useTheme();
  const categories = useStore((state) => state.categories);
  const monthlySummaries = useStore((state) => state.monthlySummaries);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currSummary, setCurrSummary] = useState<MonthlySummary>({
    monthName: "",
    categories: {},
    expenseTotal: 0,
    incomeTotal: 0,
    year,
  });

  useMonthlySummaries(month, year);

  useEffect(() => {
    if (monthlySummaries.length) {
      const summary = monthlySummaries.find(
        (s) => s.monthName === getMonth(month) && s.year === year,
      );
      if (summary) setCurrSummary(summary);
    }
  }, [monthlySummaries, month, year]);

  function handleIncrementMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((curr) => (curr += 1));
    } else {
      setMonth((curr) => (curr += 1));
    }
  }

  function handleDecrementMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((curr) => (curr -= 1));
    } else {
      setMonth((curr) => (curr -= 1));
    }
  }

  function getAmountPrecedingText() {
    const now = new Date();
    let currMonth = false;
    if (
      getMonth(now.getMonth() + 1) === currSummary.monthName &&
      now.getFullYear() === currSummary.year
    ) {
      currMonth = true;
    }

    if (currMonth)
      return totalBudgetLimit - expenseTotal > 0 ? "to spend" : "overspent";
    return totalBudgetLimit - expenseTotal > 0 ? "saved" : "overspent";
  }

  const expenseTotal = categories
    .filter((c) => c.transactionType === "Expense")
    .map((category) =>
      currSummary.categories[category.name]?.reduce(
        (acc, curr) => acc + curr.amount,
        0,
      ),
    )
    .reduce((acc, curr) => acc + (curr ?? 0), 0);

  const totalBudgetLimit = categories
    .filter((c) => c.transactionType === "Expense")
    .reduce((acc, curr) => acc + (curr?.budgetLimit ?? 0), 0);

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
          fontWeight: "300",
        }}
      >
        <MonthPicker
          month={month}
          year={year}
          increment={handleIncrementMonth}
          decrement={handleDecrementMonth}
        />
        <Box sx={{ width: "100%", marginTop: "0", marginBottom: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: {
                color: "rgb(133, 133, 133)",
                fontSize: "0.7rem",
                fontWeight: "300",
              },
            }}
          >
            <p style={{ marginTop: "auto" }}>{formatMoney(expenseTotal)}</p>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color:
                    totalBudgetLimit - expenseTotal > 0
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                }}
              >
                {formatMoney(totalBudgetLimit - expenseTotal)}
              </p>
              <p style={{ marginBottom: "5px" }}>{getAmountPrecedingText()}</p>
            </Box>
            <p style={{ marginTop: "auto" }}>{formatMoney(totalBudgetLimit)}</p>
          </Box>
          <LinearProgress
            variant="determinate"
            color={expenseTotal > totalBudgetLimit ? "error" : "primary"}
            value={
              expenseTotal > totalBudgetLimit
                ? 100
                : (expenseTotal / totalBudgetLimit) * 100
            }
          />
        </Box>
      </Box>
      <Box sx={{ width: "90%", display: "grid", gap: "1rem" }}>
        {categories
          .filter((c) => c.transactionType === "Expense")
          .map((c) => (
            <BudgetTile key={c.id} category={c} monthlySummary={currSummary} />
          ))}
      </Box>
    </Box>
  );
}
