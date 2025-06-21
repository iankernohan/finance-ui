import { BarChart } from "@mui/x-charts";
import { getOldestTransaction, getStatsForMonth } from "../../utils/helpers";
import { useStore } from "../../store/store";
import { Box, useTheme } from "@mui/material";
import MonthPicker from "./MonthPicker";
import { useState } from "react";

export default function MonthlyBarChart() {
  const theme = useTheme();

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const transactions = useStore((state) => state.transactions);
  const monthlyStats = getStatsForMonth(transactions, month, year);

  const oldestTransaction = getOldestTransaction(transactions);
  const oldestDate = new Date(oldestTransaction?.dateCreated);

  function handleIncrementMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((curr) => (curr += 1));
    } else {
      setMonth((curr) => (curr += 1));
    }
  }

  function handleDecrementMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((curr) => (curr -= 1));
    } else {
      setMonth((curr) => (curr -= 1));
    }
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <MonthPicker
        month={month}
        year={year}
        increment={handleIncrementMonth}
        decrement={handleDecrementMonth}
        disableDecrement={
          oldestDate.getMonth() === month && oldestDate.getFullYear() === year
        }
      />
      <BarChart
        xAxis={[{ data: ["Expenses", "Income"] }]}
        series={[{ data: [monthlyStats.expenses, monthlyStats.income] }]}
        height={300}
        sx={{
          "& .MuiBarElement-series-auto-generated-id-0:first-child": {
            fill: theme.palette.error.main,
          },
          "& .MuiBarElement-series-auto-generated-id-0:last-child": {
            fill: theme.palette.success.main,
          },
        }}
      />
    </Box>
  );
}
