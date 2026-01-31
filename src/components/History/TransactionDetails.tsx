import { Box, Button, Chip, Dialog, Typography, useTheme } from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import LittleGuy from "../../assets/limbless-guy.png";
import { useState } from "react";
import { useStore } from "../../store/store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface TransactionDetailsProps {
  transaction: Transaction;
  open: boolean;
  handleClose: () => void;
}

export default function ManualTransactionDetails({
  transaction,
  open,
  handleClose,
}: TransactionDetailsProps) {
  const theme = useTheme();
  //   const subCategories = categories.find(
  //     (c) => c.id === transaction.category.id,
  //   )?.subCategories;

  function onClose() {
    handleClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "3rem 2rem",
          display: "grid",
          gap: "1rem",
          placeItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={transaction?.logoUrl ?? LittleGuy}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        <Typography>{transaction.amount}</Typography>
        <Chip
          label={
            transaction.category ? transaction.category.name : "No Category"
          }
        />
        {/* {subCategories && subCategories.length > 0 && (
          <Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {subCategories?.map((sc) => (
              <Chip
                key={sc.id}
                onClick={() => setSubCategory(sc)}
                label={sc.name.charAt(0).toUpperCase() + sc.name.slice(1)}
                variant={sc.id === subCategory?.id ? "filled" : "outlined"}
              />
            ))}
          </Box>
        )} */}
        <Typography>{transaction.merchantName}</Typography>
      </Box>
      <Box>
        <Button
          sx={{ width: "100%" }}
          onClick={handleClose}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
}
