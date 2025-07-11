import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import CategoryCard from "../CategoryCard/CategoryCard";
import { formatMoney, iconMap } from "../../utils/helpers";
import { useStore } from "../../store/store";
import type { Transaction } from "../../Types/Transaction";
import FadeIn from "../UI/FadeIn";

interface IncomeProps {
  income: Transaction[];
  incomeTotal: number;
}

export default function Income({ income, incomeTotal }: IncomeProps) {
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
        <FadeIn transitionDelay="0.15">
          <Skeleton width={220} height={50} />
        </FadeIn>
      ) : (
        <FadeIn transitionDelay="0.15">
          <Typography textAlign={"center"} variant="h5">
            Income <small>({formatMoney(incomeTotal)})</small>
          </Typography>
        </FadeIn>
      )}
      <FadeIn transitionDelay="0.2">
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
                .filter((c) => c.transactionType === "Income")
                .map((category, i) => {
                  const categoryTransactions = income.filter(
                    (t) => t.category.id === category.id
                  );
                  const totalAmount = categoryTransactions.reduce(
                    (acc, curr) => acc + curr.amount,
                    0
                  );
                  return (
                    <FadeIn transitionDelay={`${i / 20 + 0.25}`}>
                      <CategoryCard
                        key={category.id}
                        categoryId={category.id}
                        title={category.name}
                        amount={totalAmount}
                        icon={iconMap[category.name]}
                        color={theme.palette.background.paper}
                      />
                    </FadeIn>
                  );
                })}
            </>
          )}
        </Box>
      </FadeIn>
    </Box>
  );
}
