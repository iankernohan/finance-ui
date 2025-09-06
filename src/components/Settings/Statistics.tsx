import { Box, useTheme } from "@mui/material";
import FadeIn from "../UI/FadeIn";
import {
  formatMoney,
  getAllTimeStats,
  getLittleGuy,
} from "../../utils/helpers";
import { useStore } from "../../store/store";
import MonthlyBarChart from "../Graphs/MonthlyBarChart";
import BackButton from "../UI/BackButton";

export default function Statistics() {
  const transactions = useStore((state) => state.transactions);
  const allTimeStats = getAllTimeStats(transactions);
  const theme = useTheme();
  return (
    <Box>
      <FadeIn>
        <BackButton top={6} />
        <h2 style={{ textAlign: "center", fontWeight: 300, fontSize: "2rem" }}>
          Statistics
        </h2>
      </FadeIn>
      <Box>
        <FadeIn transitionDelay="0.1">
          <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "1rem",
              }}
            >
              <p>Income</p>
              <p style={{ color: theme.palette.success.main }}>
                {formatMoney(allTimeStats.income)}
              </p>
              <p style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
                Count
              </p>
              <p>{allTimeStats.incomeCount}</p>
              <p>Expenses</p>
              <p style={{ color: theme.palette.error.main }}>
                {formatMoney(allTimeStats.expenses)}
              </p>
              <p style={{ marginLeft: "1rem" }}>Count</p>
              <p>{allTimeStats.expenseCount}</p>
            </Box>
            <img src={getLittleGuy()} style={{ width: 100, height: 100 }} />
          </Box>
        </FadeIn>
      </Box>
      <FadeIn transitionDelay="0.2">
        <hr />
      </FadeIn>
      <Box>
        <FadeIn transitionDelay="0.3">
          <MonthlyBarChart />
        </FadeIn>
      </Box>
    </Box>
  );
}
