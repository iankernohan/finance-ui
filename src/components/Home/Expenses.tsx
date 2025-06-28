import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import CategoryCard from "../CategoryCard/CategoryCard";
import { formatMoney, iconMap } from "../../utils/helpers";
import { useStore } from "../../store/store";
import type { Transaction } from "../../Types/Transaction";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FadeIn from "../UI/FadeIn";

interface IncomeProps {
  expenses: Transaction[];
  expenseTotal: number;
}

export default function Expenses({ expenses, expenseTotal }: IncomeProps) {
  const theme = useTheme();
  const categories = useStore((state) => state.categories);
  const loading = useStore((state) => state.loading);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {loading ? (
        <Skeleton width={220} height={50} />
      ) : (
        <FadeIn transitionDelay="0.40">
          <Typography textAlign={"center"} variant="h5">
            Expenses <small>({formatMoney(expenseTotal)})</small>
          </Typography>
        </FadeIn>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <>
            <Skeleton width={150} height={150} sx={{ transform: "none" }} />
            <Skeleton width={150} height={150} sx={{ transform: "none" }} />
          </>
        ) : (
          <>
            {categories
              .filter((c) => c.transactionType === "Expense")
              .map((category, i) => {
                const categoryTransactions = expenses.filter(
                  (t) => t.category.id === category.id
                );
                const totalAmount = categoryTransactions.reduce(
                  (acc, curr) => acc + curr.amount,
                  0
                );
                return (
                  <FadeIn transitionDelay={`${i / 20 + 0.4}`}>
                    <CategoryCard
                      categoryId={category.id}
                      key={category.id}
                      title={category.name}
                      budgetLimit={100}
                      amount={totalAmount}
                      icon={iconMap[category.name] ?? <AttachMoneyIcon />}
                      color={theme.palette.background.paper}
                    />
                  </FadeIn>
                );
              })}
          </>
        )}
      </Box>
    </Box>
  );
}
