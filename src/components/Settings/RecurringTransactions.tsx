import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getRecurringTransactions } from "../Data/data";
import { useStore } from "../../store/store";
import { formatMoney } from "../../utils/helpers";
import FadeIn from "../UI/FadeIn";
import BackButton from "../UI/BackButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RecurringTransactionDetails from "../Profile/RecurringTransactionsDetails";

export default function RecurringTransactions() {
  const theme = useTheme();
  const recurringTransactions = useStore(
    (state) => state.recurringTransactions
  );
  const setRecurringTransactions = useStore(
    (state) => state.setRecurringTransactions
  );
  const categories = useStore((state) => state.categories);
  const [openDetails, setOpenDetails] = useState(false);

  function handleClick() {
    setOpenDetails(true);
  }

  function handleClose() {
    setOpenDetails(false);
  }

  useEffect(() => {
    async function fetchRecurringTransactions() {
      const res = await getRecurringTransactions();
      console.log(res);
      setRecurringTransactions(res);
    }
    if (recurringTransactions.length === 0) fetchRecurringTransactions();
  }, [setRecurringTransactions, recurringTransactions.length]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
        width: "90%",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <FadeIn>
        <BackButton top={22} />
        <h2 style={{ textAlign: "center", fontWeight: 300, fontSize: "2rem" }}>
          Recurring Transactions
        </h2>
      </FadeIn>
      {recurringTransactions.map((rt, i) => {
        const category = categories.find((c) => c.id === rt.categoryId);
        return (
          <FadeIn
            key={rt.id}
            sx={{
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "30% 30% auto",
              gap: "1rem",
              transitionDelay: `0.${i + 1}s`,
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
      })}
    </Box>
  );
}
