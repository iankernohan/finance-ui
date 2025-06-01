import { Box, Typography, useTheme } from "@mui/material";
import CategoryCard from "../CategoryCard/CategoryCard";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import AddCardIcon from "@mui/icons-material/AddCard";
import "./home.css";
import { useStore } from "../../store/store";

const iconMap = {
  Transportation: <CarRepairIcon />,
  Food: <RestaurantMenuIcon />,
  Salary: <AddCardIcon />,
};

export default function Home() {
  const theme = useTheme();
  const transactions = useStore((state) => state.transactions);
  const expenses = transactions.filter(
    (t) => t.category.transactionType === "Expense"
  );
  const income = transactions.filter(
    (t) => t.category.transactionType === "Income"
  );
  const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);

  function amountColor(amount: number) {
    if (amount === 0) return theme.palette.grey[700];
    return amount > 0 ? theme.palette.success.main : theme.palette.error.main;
  }

  function formatMoney(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  return (
    <Box
      className="home"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography color={amountColor(incomeTotal - expenseTotal)} variant="h2">
        {formatMoney(incomeTotal - expenseTotal)}
      </Typography>
      <Box sx={{ marginTop: "2rem" }}>
        <Typography textAlign={"center"} variant="h5">
          Expenses
        </Typography>
        <Typography
          textAlign={"center"}
          color={theme.palette.grey[800]}
          variant="h5"
        >
          {formatMoney(expenseTotal)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {expenses.map((transaction) => (
            <CategoryCard
              key={transaction.id}
              title={transaction.category.name}
              amount={formatMoney(transaction.amount)}
              icon={iconMap[transaction.category.name]} // MAYBE STORE IMAGE IN BACKEND
              color={theme.palette.grey[200]}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ marginTop: "3rem" }}>
        <Typography textAlign={"center"} variant="h5">
          Income
        </Typography>
        <Typography
          textAlign={"center"}
          color={theme.palette.grey[800]}
          variant="h5"
        >
          {formatMoney(incomeTotal)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {income.map((transaction) => (
            <CategoryCard
              key={transaction.id}
              title={transaction.category.name}
              amount={formatMoney(transaction.amount)}
              icon={iconMap[transaction.category.name]}
              color={theme.palette.grey[200]}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
