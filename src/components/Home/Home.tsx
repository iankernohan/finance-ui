import { Box, Typography, useTheme } from "@mui/material";
import CategoryCard from "../CategoryCard/CategoryCard";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import AddCardIcon from "@mui/icons-material/AddCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import "./home.css";
import { useStore } from "../../store/store";
import type { JSX } from "react";
import { amountColor, formatMoney, getLittleGuy } from "../../utils/helpers";
import TotalAmount from "./TotalAmount";

const iconMap: Record<string, JSX.Element> = {
  Bills: <ReceiptIcon />,
  Transportation: <CarRepairIcon />,
  Pleasure: <EmojiEmotionsIcon />,
  Food: <RestaurantMenuIcon />,
  Shopping: <ShoppingCartIcon />,
  Salary: <AddCardIcon />,
  Investment: <ShowChartIcon />,
};

export default function Home() {
  const theme = useTheme();
  const transactions = useStore((state) => state.transactions);
  const categories = useStore((state) => state.categories);

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
      className="home"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TotalAmount difference={difference} />
      <hr />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          Expenses <small>({formatMoney(expenseTotal)})</small>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {categories
            .filter((c) => c.transactionType === "Expense")
            .map((category) => {
              const categoryTransactions = expenses.filter(
                (t) => t.category.id === category.id
              );
              const totalAmount = categoryTransactions.reduce(
                (acc, curr) => acc + curr.amount,
                0
              );
              return (
                <CategoryCard
                  key={category.id}
                  title={category.name}
                  amount={formatMoney(totalAmount)}
                  icon={iconMap[category.name] ?? <AttachMoneyIcon />}
                  color={theme.palette.background.paper}
                />
              );
            })}
        </Box>
      </Box>
      <hr style={{ margin: "2rem 0" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          Income <small>({formatMoney(incomeTotal)})</small>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {categories
            .filter((c) => c.transactionType === "Income")
            .map((category) => {
              const categoryTransactions = income.filter(
                (t) => t.category.id === category.id
              );
              const totalAmount = categoryTransactions.reduce(
                (acc, curr) => acc + curr.amount,
                0
              );
              return (
                <CategoryCard
                  key={category.id}
                  title={category.name}
                  amount={formatMoney(totalAmount)}
                  icon={iconMap[category.name]}
                  color={theme.palette.background.paper}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}
