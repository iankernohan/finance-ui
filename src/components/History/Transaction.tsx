import { Box, Chip, Typography, useTheme } from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import MoreVertIcon from "@mui/icons-material/MoreVert";
interface TransactionProps {
  transaction: Transaction;
}

export default function Transaction({ transaction }: TransactionProps) {
  const theme = useTheme();
  const [openDetails, setOpenDetails] = useState(false);

  function handleClick() {
    setOpenDetails(true);
  }

  function handleClose() {
    setOpenDetails(false);
  }

  return (
    <Box
      key={transaction.id}
      sx={{
        display: "grid",
        gridTemplateColumns: "15% 25% 45% 15%",
        borderBottom: "1px solid gray",
        padding: "1.5rem 1rem",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{ textDecoration: "underline" }}
          fontSize={"0.75rem"}
          color="text.primary"
        >
          {new Date(transaction.dateCreated).getMonth() + 1}/
          {new Date(transaction.dateCreated).getDate()}
        </Typography>
      </Box>
      <Typography
        color={
          transaction.category.transactionType === "Expense"
            ? "error"
            : "success"
        }
      >
        {transaction.category.transactionType === "Expense" ? "-" : "+"}$
        {(transaction.amount as number).toFixed(2)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "0.5rem",
          // justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Chip label={transaction.category.name} />
        {transaction.subCategory && (
          <Chip label={transaction.subCategory.name} />
        )}
      </Box>
      <Box
        onClick={handleClick}
        sx={{
          display: "grid",
          placeItems: "center",
          borderRadius: "5px",
          justifySelf: "end",
          background: theme.palette.background.paper,
          padding: "0.25rem",
        }}
      >
        <MoreVertIcon />
      </Box>
      {openDetails && (
        <TransactionDetails
          transaction={transaction}
          open={openDetails}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
}
