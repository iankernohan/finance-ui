import { Box, Button } from "@mui/material";
import MonthlyBarChart from "../Graphs/MonthlyBarChart";
import { useStore } from "../../store/store";
import { formatMoney, getAllTimeStats } from "../../utils/helpers";
import { useNavigate } from "react-router";
import LittleGuy from "../../assets/little-guy.png";

export default function Profile() {
  const transactions = useStore((state) => state.transactions);
  const allTimeStats = getAllTimeStats(transactions);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "grid", placeItems: "center", padding: "1rem 0" }}>
      <Button onClick={() => navigate("/settings")}>Settings</Button>
      <Box>
        <h1
          style={{
            // textDecoration: "underline",
            fontWeight: "300",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Your All Time Stats
        </h1>
        <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "1rem",
            }}
          >
            <p>Income</p>
            <p>{formatMoney(allTimeStats.income)}</p>
            <p style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>Count</p>
            <p>{allTimeStats.incomeCount}</p>
            <p>Expenses</p>
            <p>{formatMoney(allTimeStats.expenses)}</p>
            <p style={{ marginLeft: "1rem" }}>Count</p>
            <p>{allTimeStats.expenseCount}</p>
          </Box>
          <img src={LittleGuy} style={{ width: 100, height: 100 }} />
        </Box>
      </Box>
      <hr />
      <Box>
        <h2
          style={{
            // textDecoration: "underline",
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          Your Monthly Stats
        </h2>
        <MonthlyBarChart />
      </Box>
    </Box>
  );
}
