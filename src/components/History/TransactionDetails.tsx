import { Box, Button, Chip, Dialog, Typography, useTheme } from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import LittleGuy from "../../assets/limbless-guy.png";
import { useState } from "react";
import { useStore } from "../../store/store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatMoney } from "../../utils/helpers";

interface TransactionDetailsProps {
  transaction: Transaction;
  open: boolean;
  handleClose: () => void;
}

export default function TransactionDetails({
  transaction,
  open,
  handleClose,
}: TransactionDetailsProps) {
  const theme = useTheme();
  const NAME_LENGTH = 13;
  const date = new Date(transaction.date);

  function onClose() {
    console.log("close");
    handleClose();
  }

  function getName() {
    let name: string;
    if (!transaction?.merchantName) {
      name = transaction.name;
    } else {
      name = transaction.merchantName;
    }

    return name.length > NAME_LENGTH ? name.slice(0, 13) + "..." : name;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "1rem 2rem 2rem",
          display: "grid",
          gap: "1rem",
          placeItems: "center",
          position: "relative",
          minWidth: "70vw",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "1.5rem", fontWeight: "300", textAlign: "center" }}
          >
            {getName()}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "rgb(179, 179, 179)",
              textAlign: "center",
            }}
          >
            {date.toLocaleDateString()}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100px",
            height: "100px",
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
              transform: transaction?.logoUrl
                ? ""
                : "scale(1.6) translateY(10px) translateX(1px)",
            }}
          />
        </Box>

        <Typography sx={{ fontSize: "2rem", fontWeight: "100" }}>
          {formatMoney(
            transaction.amount.toString().startsWith("-")
              ? parseInt(transaction.amount.toString().slice(1))
              : transaction.amount,
          )}
        </Typography>
        <Chip
          label={
            transaction.category ? transaction.category.name : "No Category"
          }
        />
        {transaction.location && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.8rem",
            }}
          >
            <Typography sx={{ margin: "0", fontSize: "inherit" }}>
              {transaction?.location.address}
            </Typography>
            <Typography
              sx={{ fontSize: "inherit" }}
            >{`${transaction?.location.city ?? ""} ${transaction?.location.country ?? ""} ${transaction?.location.region ?? ""} ${transaction?.location.postalCode ?? ""} `}</Typography>
            <Typography></Typography>
          </Box>
        )}
        {transaction.website && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              transaction.website.startsWith("http")
                ? transaction.website
                : "https://" + transaction.website
            }
          >
            {transaction.website}
          </a>
        )}
      </Box>
      <Box>
        <Button
          sx={{ width: "100%" }}
          onClick={onClose}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
}
