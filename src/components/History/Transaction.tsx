import { Box, Chip, Typography } from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import { getDay } from "../../utils/helpers";
interface TransactionProps {
  transaction: Transaction;
}

export default function Transaction({ transaction }: TransactionProps) {
  const [openDetails, setOpenDetails] = useState(false);
  function handleClose() {
    setOpenDetails(false);
  }

  function handleClick() {
    console.log("click");
    setOpenDetails((prev) => !prev);
  }

  return (
    <Box
      key={transaction.id}
      onClick={handleClick}
      sx={{
        display: "grid",
        gridTemplateColumns: "25% 1fr 1fr",
        justifyContent: "space-evenly",
        borderBottom: "1px solid gray",
        padding: "1.5rem 2rem",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography fontSize={"0.75rem"} color="text.primary">
          {getDay(new Date(transaction.dateCreated).getDay())}
        </Typography>
        <Typography fontSize={"0.75rem"} color="text.primary">
          {new Date(transaction.dateCreated).getMonth()}/
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
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Chip label={transaction.category.name} />
        {transaction.subCategory && (
          <Chip label={transaction.subCategory.name} />
        )}
      </Box>
      {/* {new Date(t.dateCreated).toLocaleDateString()} */}
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
