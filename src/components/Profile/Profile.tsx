import { Box, Button, useTheme } from "@mui/material";
import MonthlyBarChart from "../Graphs/MonthlyBarChart";
import { useStore } from "../../store/store";
import {
  formatMoney,
  getAllTimeStats,
  getLittleGuy,
} from "../../utils/helpers";
import { useNavigate, Outlet } from "react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import FadeIn from "../UI/FadeIn";
import SettingTab from "../Settings/SettingTab";

export default function Profile() {
  const transactions = useStore((state) => state.transactions);
  const allTimeStats = getAllTimeStats(transactions);
  const navigate = useNavigate();
  const theme = useTheme();

  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  const options = useStore((state) => state.profileOptions);
  console.log(options);

  return (
    <Box
      sx={{
        padding: "1rem",
        height: "100%",
      }}
    >
      <FadeIn
        transitionDelay="0.2"
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
        }}
      >
        <img
          style={{
            width: 250,
          }}
          src={getLittleGuy(1)}
        />
      </FadeIn>
      <FadeIn>
        <h1
          style={{
            fontWeight: 200,
            margin: "1rem 2rem",
            marginBottom: "2rem",
            fontSize: "2.5rem",
            fontStyle: "italic",
          }}
        >
          {`${getGreeting()}, Ian.`}
        </h1>
      </FadeIn>

      {location.pathname.endsWith("profile") ? (
        <>
          <Box
            sx={{
              margin: "0 auto",
              display: "flex",
              placeItems: "center",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              width: "75%",
            }}
          >
            {options.map((option, i) => (
              <FadeIn
                transitionDelay={`0.${i + 1}`}
                sx={{ width: "100%" }}
                key={option.name}
              >
                <SettingTab setting={option} key={option.name} />
              </FadeIn>
            ))}
          </Box>
        </>
      ) : (
        <Box>
          <Outlet />
        </Box>
      )}
      {/* <Button sx={{ marginLeft: "auto" }} onClick={() => navigate("/settings")}>
        <FadeIn>
          <SettingsIcon />
        </FadeIn>
      </Button> */}
      {/* <Box>
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
      </Box> */}
    </Box>
  );
}
