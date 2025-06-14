import { Box, Chip, Typography } from "@mui/material";
import Transaction from "./Transaction";
import { useStore } from "../../store/store";

export default function History() {
  const transactions = useStore((state) => state.transactions);
  const reversedTransactions = [...transactions].reverse();

  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Box sx={{ height: "100%", overflowY: "scroll", paddingBottom: "2rem" }}>
        {reversedTransactions.map((t) => (
          <Transaction key={t.id} transaction={t} />
        ))}
      </Box>
    </Box>
  );
}
