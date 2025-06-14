import { Box } from "@mui/material";
import "./home.css";
import { useStore } from "../../store/store";
import TotalAmount from "./TotalAmount";
import Income from "./Income";
import Expenses from "./Expenses";

export default function Home() {
  const transactions = useStore((state) => state.transactions);
  const expenses = transactions.filter(
    (t) => t.category.transactionType === "Expense"
  );
  const income = transactions.filter(
    (t) => t.category.transactionType === "Income"
  );
  const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
  const difference = incomeTotal - expenseTotal;

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
      <TotalAmount difference={difference} />
      <hr />
      <Income income={income} incomeTotal={incomeTotal} />
      <hr style={{ margin: "2rem 0" }} />
      <Expenses expenses={expenses} expenseTotal={expenseTotal} />
    </Box>
  );
}
