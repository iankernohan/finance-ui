import { Box, Chip, Skeleton, Typography } from "@mui/material";
import Transaction from "./Transaction";
import { useStore } from "../../store/store";
import { defaultTransaction } from "../../utils/helpers";

export default function History() {
  const transactions = useStore((state) => state.transactions);
  const reversedTransactions = [...transactions].reverse();
  const loading = useStore((state) => state.loading);

  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Box sx={{ height: "100%", overflowY: "scroll", paddingBottom: "2rem" }}>
        {loading ? (
          Array.from({ length: 10 }).map((x, i) => (
            <Transaction key={i} transaction={defaultTransaction} />
          ))
        ) : (
          <>
            {reversedTransactions.map((t) => (
              <Transaction key={t.id} transaction={t} />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
