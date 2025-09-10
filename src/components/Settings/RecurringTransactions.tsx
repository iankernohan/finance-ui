import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getRecurringTransactions } from "../Data/data";
import { useStore } from "../../store/store";
import { formatMoney } from "../../utils/helpers";
import FadeIn from "../UI/FadeIn";
import BackButton from "../UI/BackButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RecurringTransactionDetails from "../Profile/RecurringTransactionsDetails";
import Loader from "../UI/Loader";

export default function RecurringTransactions() {
  const theme = useTheme();
  const recurringTransactions = useStore(
    (state) => state.recurringTransactions
  );
  const setRecurringTransactions = useStore(
    (state) => state.setRecurringTransactions
  );
  const loading = useStore((state) => state.loading);
  const setLoading = useStore((state) => state.setLoading);
  const [openDetails, setOpenDetails] = useState(false);

  function handleClick() {
    setOpenDetails(true);
  }

  function handleClose() {
    setOpenDetails(false);
  }

  useEffect(() => {
    async function fetchRecurringTransactions() {
      setLoading(true);
      const res = await getRecurringTransactions();
      setLoading(false);
      setRecurringTransactions(res);
    }
    if (recurringTransactions.length === 0) fetchRecurringTransactions();
  }, [setRecurringTransactions, recurringTransactions.length, setLoading]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        position: "relative",
      }}
    >
      <FadeIn>
        <BackButton top={22} />
        <h2
          style={{
            textAlign: "center",
            fontWeight: 300,
            fontSize: "2rem",
            width: "80%",
            margin: "auto",
          }}
        >
          Recurring Transactions
        </h2>
      </FadeIn>
      {loading ? (
        <Loader width="100px" height="100px" style={{ margin: "auto" }} />
      ) : (
        recurringTransactions.map((rt, i) => {
          return (
            <FadeIn
              key={rt.id}
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "30% 30% auto",
                gap: "1rem",
                transitionDelay: `0.${i + 1}s`,
                width: "90%",
                margin: "auto",
              }}
            >
              <p>{formatMoney(rt.amount)}</p>
              <p>{rt.intervalDays} days</p>
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
                <RecurringTransactionDetails
                  transaction={rt}
                  handleClose={handleClose}
                  open={openDetails}
                />
              )}
            </FadeIn>
          );
        })
      )}
    </Box>
  );
}
