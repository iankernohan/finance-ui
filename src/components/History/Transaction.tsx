import { Box, Typography, useTheme } from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import { useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { formatMoney, iconMap } from "../../utils/helpers";
import TransactionDetails from "./TransactionDetails";
interface TransactionProps {
  transaction: Transaction;
}

export default function Transaction({ transaction }: TransactionProps) {
  const theme = useTheme();
  const [openDetails, setOpenDetails] = useState(false);

  const NAME_LENGTH = 13;

  function handleClick() {
    if (openDetails === false) setOpenDetails(true);
  }

  function handleClose() {
    setOpenDetails(false);
  }

  function getName(transaction: Transaction) {
    let name: string;
    if (!transaction?.merchantName) {
      name = transaction.name;
    } else {
      name = transaction.merchantName;
    }

    return name.length > NAME_LENGTH ? name.slice(0, 13) + "..." : name;
  }

  function getIcon(category?: string) {
    if (category) return iconMap[category];
    return <QuestionMarkIcon />;
  }

  return (
    <Box
      key={transaction.id}
      sx={{
        display: "flex",
        padding: "1.5rem 1rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onClick={handleClick}
    >
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            overflow: "hidden",
            borderRadius: "12px",
            background: theme.palette.background.paper,
            "& svg": {
              color: theme.palette.primary.main,
              width: "40px",
              height: "40px",
            },
            display: "grid",
            placeItems: "center",
          }}
        >
          {transaction.logoUrl ? (
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={transaction.logoUrl}
            />
          ) : (
            getIcon(transaction.category?.name)
          )}
        </Box>
        <Box>
          <p>{getName(transaction)}</p>
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "end" }}>
            <p style={{ color: "rgb(179, 179, 179)" }}>
              {transaction.category?.name ?? "¯\\_(ツ)_/¯"}
            </p>
            {transaction.subCategory && (
              <>
                <p style={{ color: "rgb(179, 179, 179)" }}>-</p>
                <p style={{ color: "rgb(179, 179, 179)", fontSize: "0.9rem" }}>
                  {transaction.subCategory.name}
                </p>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          fontWeight: "300",
          ...(transaction.amount.toString().startsWith("-")
            ? { color: theme.palette.success.main }
            : {}),
        }}
      >
        {formatMoney(
          parseFloat(transaction.amount.toString().replace("-", "")),
        )}
      </Box>
      <TransactionDetails
        transaction={transaction}
        open={openDetails}
        handleClose={handleClose}
      />
    </Box>
  );
}
