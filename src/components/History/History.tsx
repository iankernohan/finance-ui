import { Box, Button, Typography, useTheme } from "@mui/material";
import Transaction from "./Transaction";
import { useStore } from "../../store/store";
import TuneIcon from "@mui/icons-material/Tune";
import Filter from "./Filter";
import { useEffect, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CategoryIcon from "@mui/icons-material/Category";

export default function History() {
  const theme = useTheme();
  const transactions = useStore((state) => state.transactions);
  const setTransactions = useStore((state) => state.setTransactions);
  const page = useStore((state) => state.page);
  const filters = useStore((state) => state.filters);
  const setFilters = useStore((state) => state.setFilters);
  const incrementPage = useStore((state) => state.incrementPage);
  const uncategorizedTransactions = useStore(
    (state) => state.uncategorizedTransactions,
  );
  const loading = useStore((state) => state.loading);
  const [openFilter, setOpenFilter] = useState(false);
  const [uncategorized, setUncategorized] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => console.log(page), [page]);

  const handleScroll = () => {
    const OFFSET = 250;
    if (!ref.current || loading) return;

    if (
      ref.current.scrollHeight - OFFSET <=
      ref.current.scrollTop + ref.current.clientHeight
    ) {
      incrementPage();
    }
  };

  function handleCloseFilter() {
    setOpenFilter(false);
  }

  function handleSetUncategorized() {
    setUncategorized((curr) => !curr);
  }

  function handleClearFilters() {
    setTransactions([]);
    setFilters(null);
  }

  function RenderTransaction() {
    return transactions.length ? (
      <>
        {(uncategorized ? uncategorizedTransactions : transactions).map((t) => (
          <Box key={t.id}>
            <Transaction transaction={t} />
          </Box>
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
        <img style={{ width: 200 }} src="sad-little-guy.png" />
        <Typography variant="body1">Go ahead and add some!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", overflow: "hidden", position: "relative" }}>
      <Box
        ref={ref}
        onScroll={handleScroll}
        sx={{ height: "100%", overflowY: "scroll", paddingBottom: "2rem" }}
      >
        <RenderTransaction />
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
      {filters && (
        <Button
          onClick={handleClearFilters}
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
      <Filter open={openFilter} handleClose={handleCloseFilter} />
    </Box>
  );
}
