import { BarChart } from "@mui/x-charts";
import { scaleTickNumberByRange } from "@mui/x-charts/internals";
import { formatMoney, getMonthlyStatsForYear } from "../../utils/helpers";
import { useStore } from "../../store/store";
import { useTheme } from "@mui/material";

export default function YearlyBarChart() {
  const theme = useTheme();
  const transactions = useStore((state) => state.transactions);
  const dataset = getMonthlyStatsForYear(transactions, 2025);

  const chartSetting = {
    xAxis: [
      {
        label: "Amount ($)",
        scaleTickNumberByRange,
      },
    ],
    height: 500,
  };
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ dataKey: "month", scaleType: "band" }]}
      series={[
        {
          dataKey: "expenses",
          label: "Expenses",
          color: theme.palette.success.main,
          valueFormatter: (value: number | null) =>
            value !== null ? formatMoney(value) : "",
        },
        {
          dataKey: "income",
          label: "Income",
          color: theme.palette.error.main,
          valueFormatter: (value: number | null) =>
            value !== null ? formatMoney(value) : "",
        },
      ]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
