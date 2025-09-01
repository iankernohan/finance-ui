import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import {
  deleteRecurringTransaction,
  getRecurringTransactions,
} from "../Data/data";
import { useStore } from "../../store/store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatMoney } from "../../utils/helpers";
import FadeIn from "../UI/FadeIn";

export default function RecurringTransactions() {
  const recurringTransactions = useStore(
    (state) => state.recurringTransactions
  );
  const setRecurringTransactions = useStore(
    (state) => state.setRecurringTransactions
  );
  const categories = useStore((state) => state.categories);

  async function handleDelete(id: number) {
    const res = await deleteRecurringTransaction(id);
    console.log(res);
    if (res) {
      setRecurringTransactions(
        recurringTransactions.filter((rt) => rt.id !== id)
      );
    }
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
      }}
    >
      {recurringTransactions.map((rt) => {
        const category = categories.find((c) => c.id === rt.categoryId);
        return (
          <FadeIn
            key={rt.id}
            sx={{
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "25% 20% 20% auto",
              gap: "1rem",
            }}
          >
            <p>{category?.name}</p>
            <p>{formatMoney(rt.amount)}</p>
            <p>{rt.intervalDays} days</p>
            <Button
              variant="contained"
              onClick={() => handleDelete(rt.id as number)}
            >
              <DeleteOutlineIcon />
            </Button>
          </FadeIn>
        );
      })}
    </Box>
  );
}
