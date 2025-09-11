import { Box } from "@mui/material";
import { useStore } from "../../store/store";
import FadeIn from "../UI/FadeIn";
import BudgetTile from "./BudgetTile";

export default function BudgetBuilder() {
  const budgets = useStore((state) => state.budgets);
  // const total = budgets.reduce((acc, curr) => acc + curr.limit, 0);

  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "80%" }}>
        {budgets.map((b, i) => (
          <FadeIn transitionDelay={`${i / 20}`} key={b.id}>
            <BudgetTile budget={b} />
          </FadeIn>
        ))}
      </Box>
    </Box>
  );
}
