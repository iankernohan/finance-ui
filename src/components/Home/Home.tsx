import { Box } from "@mui/material";
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
import { formatMoney } from "../../utils/helpers";

export default function Home() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const transactions = useStore((state) => state.transactions);
  const [income, setIncome] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<number | null>(null);

  useEffect(() => {
    const _income = transactions.reduce(
      (acc, curr) =>
        curr.category?.transactionType === 1 ? acc + curr.amount : acc + 0,
      0,
    );
    const _expenses = transactions.reduce(
      (acc, curr) =>
        curr.category?.transactionType === 0 ? acc + curr.amount : acc + 0,
      0,
    );
    setIncome(_income);
    setExpenses(_expenses);
  }, [transactions]);

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
      className="home-page"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <TransactionPieChart /> */}
      <Parcel
        sx={{
          margin: "3rem",
          width: "300px",
          height: "150px",
        }}
      >
        {formatMoney(income ? income * -1 : 0)}
        {formatMoney(expenses ? expenses * -1 : 0)}
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
      <FadeIn>
        <MonthPicker
          month={month}
          year={year}
          increment={handleIncrementMonth}
          decrement={handleDecrementMonth}
        />
      </FadeIn>
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
