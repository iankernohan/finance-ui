import { Box, Chip, Dialog, DialogTitle } from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import type { Dispatch, SetStateAction } from "react";
import { formatMoney } from "../../utils/helpers";

interface TransactionDetailsProps {
  transaction: Transaction;
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

export default function TransactionDetails({
  transaction,
  open,
  handleClose,
}: TransactionDetailsProps) {
  console.log(transaction);
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          padding: "2rem",
          display: "grid",
          gap: "1rem",
          placeItems: "center",
        }}
      >
        <Box>{new Date(transaction.dateCreated).toLocaleDateString()}</Box>
        <Box>{formatMoney(transaction.amount)}</Box>
        <Box>{transaction.category.name}</Box>
        <Box>
          {transaction.category.subCategories?.map((sc) => (
            <Chip
              key={sc.id}
              label={sc.name}
              variant={
                sc.id === transaction.subCategory?.id ? "filled" : "outlined"
              }
            />
          ))}
        </Box>
      </Box>
    </Dialog>
  );
}
