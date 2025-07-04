import { Box, Chip } from "@mui/material";
import { useStore } from "../../store/store";
import { formatMoney } from "../../utils/helpers";

export default function BudgetBuilder() {
  const categories = useStore((state) => state.categories);
  const budgets = useStore((state) => state.budgets);
  const total = budgets.reduce((acc, curr) => acc + curr.limit, 0);

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box>
        {budgets.map((budget) => (
          <Box>
            {budget.category.name}: {formatMoney(budget.limit)}
            <hr />
          </Box>
        ))}
        <p>Total: {formatMoney(total)}</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {categories.map((c) => (
          <Chip label={c.name} />
        ))}
      </Box>
    </Box>
  );
}
