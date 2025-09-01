import { Box, Button, useTheme } from "@mui/material";
import MonthlyBarChart from "../Graphs/MonthlyBarChart";
import { useStore } from "../../store/store";
import { formatMoney, getAllTimeStats } from "../../utils/helpers";
import { useNavigate } from "react-router";
import LittleGuy from "../../assets/little-guy.png";
import SettingsIcon from "@mui/icons-material/Settings";
import FadeIn from "../UI/FadeIn";

export default function Profile() {
  const transactions = useStore((state) => state.transactions);
  const allTimeStats = getAllTimeStats(transactions);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ display: "grid", placeItems: "center", padding: "1rem 0" }}>
      <Button sx={{ marginLeft: "auto" }} onClick={() => navigate("/settings")}>
        <FadeIn>
          <SettingsIcon />
        </FadeIn>
      </Button>
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
            <img src={LittleGuy} style={{ width: 100, height: 100 }} />
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
