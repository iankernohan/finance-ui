import { Box, Button, Typography, useTheme } from "@mui/material";
import Transaction from "./Transaction";
import { useStore } from "../../store/store";
import { defaultTransaction } from "../../utils/helpers";
import TuneIcon from "@mui/icons-material/Tune";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import type { Filters } from "../../Types/Transaction";
import ClearIcon from "@mui/icons-material/Clear";
import FadeIn from "../UI/FadeIn";
import CategoryIcon from "@mui/icons-material/Category";

export default function History() {
  const theme = useTheme();
  const transactions = useStore((state) => state.transactions);
  const uncategorizedTransactions = useStore(
    (state) => state.uncategorizedTransactions,
  );
  const loading = useStore((state) => state.loading);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterConditions, setFilterConditions] = useState<Filters | null>(
    null,
  );
  const [numToDelay, setNumToDelay] = useState(0);
  const [uncategorized, setUncategorized] = useState(false);
  function handleCloseFilter() {
    setOpenFilter(false);
  }

  useEffect(() => {
    const navHeight = 84.4;
    const windowHeight = window.innerHeight - navHeight * 2;
    const transactionItemHeight = 82;
    setNumToDelay(windowHeight / transactionItemHeight);
  }, []);

  function handleSetUncategorized() {
    setUncategorized((curr) => !curr);
  }

  function updateFilterConditions(conditions: Filters) {
    setFilterConditions(conditions);
  }

  function clearFilters() {
    setFilterConditions(null);
  }

  function RenderTransaction() {
    return transactions.length ? (
      <>
        {(uncategorized ? uncategorizedTransactions : transactions).map(
          (t, i) => (
            <Box key={t.id}>
              <Transaction transaction={t} />
            </Box>
          ),
        )}
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
        <img style={{ width: 200 }} src="sad-little-guy.png" />
        <Typography variant="body1">Go ahead and add some!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", overflow: "hidden", position: "relative" }}>
      <Box sx={{ height: "100%", overflowY: "scroll", paddingBottom: "2rem" }}>
        {loading ? (
          Array.from({ length: 10 }).map((_x, i) => (
            <Transaction key={i} transaction={defaultTransaction} />
          ))
        ) : (
          <RenderTransaction />
        )}
      </Box>
      <Button
        onClick={handleSetUncategorized}
        sx={{
          position: "absolute",
          bottom: "5rem",
          right: "1rem",
          boxShadow: theme.shadows[10],
          borderRadius: "50%",
          width: "50px",
          minWidth: 0,
          height: "50px",
          padding: 0,
          background: uncategorized
            ? "rgba(255,255,255,0.5)"
            : "rgba(0,0,0,0.5)",
          backdropFilter: "blur(3px)",
          transition: "background 0.3s",
        }}
      >
        <CategoryIcon />
      </Button>
      <Button
        onClick={() => setOpenFilter(true)}
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
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
      {filterConditions && (
        <Button
          onClick={() => clearFilters()}
          sx={{
            position: "absolute",
            bottom: "1rem",
            right: "5rem",
            boxShadow: theme.shadows[10],
            borderRadius: "50%",
            width: "50px",
            minWidth: 0,
            height: "50px",
            padding: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(3px)",
          }}
        >
          <ClearIcon style={{ color: theme.palette.primary.main }} />
        </Button>
      )}
      <Filter
        open={openFilter}
        handleClose={handleCloseFilter}
        filterConitions={filterConditions}
        updateFilterConditions={updateFilterConditions}
      />
    </Box>
  );
}
