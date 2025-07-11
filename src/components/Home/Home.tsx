import { Box } from "@mui/material";
import "./home.css";
import { useStore } from "../../store/store";
import TotalAmount from "./TotalAmount";
import Income from "./Income";
import Expenses from "./Expenses";
import MonthPicker from "../Graphs/MonthPicker";
import { useState } from "react";
import { getTransactionsForMonth } from "../../utils/helpers";
import FadeIn from "../UI/FadeIn";

export default function Home() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const allransactions = useStore((state) => state.transactions);
  const transactions = getTransactionsForMonth(allransactions, month, year);
  const expenses = transactions.filter(
    (t) => t.category.transactionType === "Expense"
  );
  const income = transactions.filter(
    (t) => t.category.transactionType === "Income"
  );
  const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
  const difference = incomeTotal - expenseTotal;

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
    <Box
      className="home page"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
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
      <FadeIn transitionDelay="0.05">
        <TotalAmount month={month} year={year} difference={difference} />
      </FadeIn>
      <FadeIn transitionDelay="0.1">
        <hr />
      </FadeIn>
      <Income income={income} incomeTotal={incomeTotal} />
      <FadeIn transitionDelay="0.35">
        <hr style={{ margin: "2rem 0" }} />
      </FadeIn>
      <Expenses expenses={expenses} expenseTotal={expenseTotal} />
    </Box>
  );
}
