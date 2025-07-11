import {
  Box,
  Button,
  Chip,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Transaction from "./Transaction";
import { useStore } from "../../store/store";
import { defaultTransaction, filterTransactions } from "../../utils/helpers";
import TuneIcon from "@mui/icons-material/Tune";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import type { FilterConditions } from "../../Types/Transaction";
import ClearIcon from "@mui/icons-material/Clear";
import FadeIn from "../UI/FadeIn";

export default function History() {
  const theme = useTheme();

  const [openFilter, setOpenFilter] = useState(false);
  const [filterConitions, setFilterConditions] =
    useState<FilterConditions | null>(null);
  const [numToDelay, setNumToDelay] = useState(0);

  const allTransactions = useStore((state) => state.transactions);
  const transactions = filterConitions
    ? filterTransactions(allTransactions, filterConitions)
    : allTransactions;
  const reversedTransactions = [...transactions].reverse();
  const loading = useStore((state) => state.loading);

  function handleCloseFilter() {
    setOpenFilter(false);
  }

  function updateFilterConditions(conditions: FilterConditions) {
    setFilterConditions(conditions);
  }

  function clearFilters() {
    setFilterConditions(null);
  }

  useEffect(() => {
    const navHeight = 84.4;
    const windowHeight = window.innerHeight - navHeight * 2;
    const transactionItemHeight = 82;
    setNumToDelay(windowHeight / transactionItemHeight);
  }, []);

  function RenderTransaction() {
    return transactions.length ? (
      <>
        {reversedTransactions.map((t, i) => (
          <FadeIn transitionDelay={`${i < numToDelay ? i / 20 : 0}`}>
            <Transaction key={t.id} transaction={t} />
          </FadeIn>
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
    <Box sx={{ height: "100%", overflow: "hidden", position: "relative" }}>
      <Box sx={{ height: "100%", overflowY: "scroll", paddingBottom: "2rem" }}>
        {loading ? (
          Array.from({ length: 10 }).map((x, i) => (
            <Transaction key={i} transaction={defaultTransaction} />
          ))
        ) : (
          <RenderTransaction />
        )}
      </Box>
      {filterConitions && (
        <Button
          onClick={() => clearFilters()}
          sx={{
            position: "absolute",
            bottom: "5rem",
            left: "1rem",
            boxShadow: theme.shadows[10],
            borderRadius: "50%",
            width: "50px",
            minWidth: 0,
            height: "50px",
            padding: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <ClearIcon style={{ color: theme.palette.primary.main }} />
        </Button>
      )}
      <Button
        onClick={() => setOpenFilter(true)}
        sx={{
          position: "absolute",
          bottom: "1rem",
          left: "1rem",
          boxShadow: theme.shadows[10],
          borderRadius: "50%",
          width: "50px",
          minWidth: 0,
          height: "50px",
          padding: 0,
          background: theme.palette.background.paper,
        }}
      >
        <TuneIcon style={{ color: theme.palette.primary.main }} />
      </Button>
      <Filter
        open={openFilter}
        handleClose={handleCloseFilter}
        filterConitions={filterConitions}
        updateFilterConditions={updateFilterConditions}
      />
    </Box>
  );
}
