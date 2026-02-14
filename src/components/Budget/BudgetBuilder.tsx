import { Box, useTheme } from "@mui/material";
import { useStore } from "../../store/store";
import FadeIn from "../UI/FadeIn";
import BudgetTile from "./BudgetTile";
import { getMonth } from "../../utils/helpers";
import Loader from "../UI/Loader";
import MonthPicker from "../Graphs/MonthPicker";
import { useEffect, useState } from "react";
import type { MonthlySummary } from "../../Types/Transaction";
import { useMonthlySummaries } from "../../hooks/queries/useMonthlySummary";

export default function BudgetBuilder() {
  const theme = useTheme();
  const categories = useStore((state) => state.categories);
  const monthlySummaries = useStore((state) => state.monthlySummaries);
  const loading = useStore((state) => state.loading);

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
      <FadeIn>
        <h1 style={{ fontWeight: 200 }}>Monthly Budget</h1>
      </FadeIn>
      <FadeIn
        transitionDelay="0.1"
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
        <>
          <MonthPicker
            month={month}
            year={year}
            increment={handleIncrementMonth}
            decrement={handleDecrementMonth}
          />
        </>
      </FadeIn>
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
