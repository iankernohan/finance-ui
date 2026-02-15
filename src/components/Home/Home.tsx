import { Box, Typography } from "@mui/material";
import "./home.css";
import { useStore } from "../../store/store";
// import TotalAmount from "./TotalAmount";
// import Income from "./Income";
// import Expenses from "./Expenses";
import MonthPicker from "../Graphs/MonthPicker";
import { useEffect, useState } from "react";
import FadeIn from "../UI/FadeIn";
import LittleGuy from "../../assets/limbless-guy.png";
import Parcel from "../UI/Parcel";
import { formatMoney, getMonth } from "../../utils/helpers";
import { useMonthlySummaries } from "../../hooks/queries/useMonthlySummary";
import type { MonthlySummary } from "../../Types/Transaction";
import PieChart from "./PieChart";

export default function Home() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [income, setIncome] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<number | null>(null);
  const [currSummary, setCurrSummary] = useState<MonthlySummary>({
    monthName: "",
    categories: {},
    expenseTotal: 0,
    incomeTotal: 0,
    year,
  });

  const transactions = useStore((state) => state.transactions);
  const monthlySummaries = useStore((state) => state.monthlySummaries);

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
      className="home-page"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        marginTop: "1rem",
      }}
    >
      <FadeIn>
        <MonthPicker
          month={month}
          year={year}
          increment={handleIncrementMonth}
          decrement={handleDecrementMonth}
        />
      </FadeIn>
      {/* <TransactionPieChart /> */}
      <Parcel
        sx={{
          padding: "1rem",
          width: "300px",
          height: "150px",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
            fontWeight: 200,
            color:
              currSummary.incomeTotal * -1 - currSummary.expenseTotal > 0
                ? "green"
                : "red",
          }}
        >
          {formatMoney(
            Math.abs(currSummary.incomeTotal * -1 - currSummary.expenseTotal),
          )}
        </p>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <p
            style={{
              fontWeight: "200",
              fontSize: "0.8rem",
              color: "rgb(136, 136, 136)",
            }}
          >
            +{formatMoney(currSummary.incomeTotal * -1)}
          </p>
          <p
            style={{
              fontWeight: "200",
              fontSize: "0.8rem",
              color: "rgb(136, 136, 136)",
            }}
          >
            -{formatMoney(currSummary.expenseTotal)}
          </p>
        </Box>
        {/* {formatMoney(expenses ? expenses * -1 : 0)} */}
        <img
          style={{
            width: "80px",
            height: "80px",
            position: "absolute",
            bottom: "-10px",
            left: "0px",
            zIndex: 0,
          }}
          src={LittleGuy}
        />
      </Parcel>
      <PieChart monthlySummary={currSummary} />

      {/* <FadeIn>
        <TotalAmount month={month} year={year} difference={difference} />
      </FadeIn>
      <FadeIn>
        <hr />
      </FadeIn>
      <Income income={income} incomeTotal={incomeTotal} />
      <FadeIn>
        <hr style={{ margin: "2rem 0" }} />
      </FadeIn>
      <Expenses expenses={expenses} expenseTotal={expenseTotal} /> */}
    </Box>
  );
}
