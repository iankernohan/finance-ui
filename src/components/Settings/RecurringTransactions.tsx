import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import {
  deleteRecurringTransaction,
  getRecurringTransactions,
} from "../Data/data";
import { useStore } from "../../store/store";

export default function RecurringTransactions() {
  const recurringTransactions = useStore(
    (state) => state.recurringTransactions
  );
  const setRecurringTransactions = useStore(
    (state) => state.setRecurringTransactions
  );

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
    fetchRecurringTransactions();
  }, [setRecurringTransactions, recurringTransactions.length]);

  return (
    <Box>
      {recurringTransactions.map((rt) => (
        <Box key={rt.id}>
          <Box>
            {rt.description} - {rt.intervalDays}Days
          </Box>
          <Button onClick={() => handleDelete(rt.id as number)}>Delete</Button>
        </Box>
      ))}
    </Box>
  );
}
