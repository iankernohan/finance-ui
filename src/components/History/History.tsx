import { Box, Chip, Skeleton, Typography } from "@mui/material";
import Transaction from "./Transaction";
import { useStore } from "../../store/store";
import { defaultTransaction } from "../../utils/helpers";

export default function History() {
  const transactions = useStore((state) => state.transactions);
  const reversedTransactions = [...transactions].reverse();
  const loading = useStore((state) => state.loading);

  function RenderTransaction() {
    return transactions.length ? (
      <>
        {reversedTransactions.map((t) => (
          <Transaction key={t.id} transaction={t} />
        ))}
      </>
    ) : (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h4">No Transactions</Typography>
        </Box>
        <img style={{ width: 200 }} src="/sad-little-guy.png" />
        <Typography variant="body1">Go ahead and add some!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Box sx={{ height: "100%", overflowY: "scroll", paddingBottom: "2rem" }}>
        {loading ? (
          Array.from({ length: 10 }).map((x, i) => (
            <Transaction key={i} transaction={defaultTransaction} />
          ))
        ) : (
          <RenderTransaction />
        )}
      </Box>
    </Box>
  );
}
