import { Box, Chip, Skeleton, Typography, useTheme } from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStore } from "../../store/store";
import CategorySetter from "./CategorySetter";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { formatMoney, iconMap } from "../../utils/helpers";
interface TransactionProps {
  transaction: Transaction;
}

export default function Transaction({ transaction }: TransactionProps) {
  const theme = useTheme();
  const [openDetails, setOpenDetails] = useState(false);
  const [openCategorySetter, setOpenCategorySetter] = useState(false);
  const loading = useStore((state) => state.loading);

  const NAME_LENGTH = 13;

  function handleClick() {
    setOpenDetails(true);
  }

  function handleClose() {
    setOpenDetails(false);
    setOpenCategorySetter(false);
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

  function handleOpenCategorySetter() {
    if (transaction?.category) return;
    setOpenCategorySetter(true);
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
      onClick={handleOpenCategorySetter}
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
          <Typography>{getName(transaction)}</Typography>
          <Typography sx={{ color: "rgb(179, 179, 179)" }}>
            {transaction.category?.name ?? "¯\\_(ツ)_/¯"}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={
          transaction.amount.toString().startsWith("-")
            ? { color: theme.palette.success.main }
            : {}
        }
      >
        {formatMoney(parseInt(transaction.amount.toString().replace("-", "")))}
      </Box>
      <CategorySetter
        transaction={transaction}
        open={openCategorySetter}
        handleClose={handleClose}
      />
    </Box>
  );
}
