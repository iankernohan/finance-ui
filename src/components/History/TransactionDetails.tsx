import {
  Box,
  Button,
  Chip,
  Dialog,
  InputAdornment,
  TextField,
} from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import { useState } from "react";
import { useStore } from "../../store/store";
import Alert from "./Alert";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { updateTransaction } from "../Data/data";

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
  const [alertOpen, setAlertOpen] = useState(false);
  const updateTransactionStore = useStore((state) => state.updateTransaction);
  const categories = useStore((state) => state.categories);
  const subCategories = categories.find(
    (c) => c.id === transaction.category.id
  )?.subCategories;
  const [amount, setAmount] = useState(transaction.amount.toFixed(2));
  const [description, setDescription] = useState<string>(
    transaction.description
  );
  const [subCategory, setSubCategory] = useState(transaction.subCategory);
  const [date, setDate] = useState(transaction.dateCreated);

  function hasChanged() {
    return (
      parseFloat(amount as string) !== transaction.amount ||
      description !== transaction.description ||
      subCategory?.id !== transaction.subCategory?.id ||
      date !== transaction.dateCreated
    );
  }

  function undoChanges() {
    setAmount(transaction.amount.toFixed(2));
    setDescription(transaction.description);
    setSubCategory(transaction.subCategory);
    setDate(transaction.dateCreated);
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const data = {
      amount: parseFloat(amount),
      description,
      dateCreated: date,
      categoryId: transaction.category.id,
      subCategoryId: subCategory === undefined ? null : subCategory.id,
    };
    if (hasChanged()) {
      const updated = await updateTransaction(transaction.id, data);
      updateTransactionStore(updated as Transaction);
      handleClose();
    }
  }

  function onClose() {
    if (hasChanged()) {
      setAlertOpen(true);
    } else {
      handleClose();
    }
  }

  function confirmedClose() {
    handleClose();
  }

  function handleAlertClose() {
    setAlertOpen(false);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "2rem",
          display: "grid",
          gap: "1rem",
          placeItems: "center",
        }}
      >
        <MobileDatePicker
          onChange={(value) => setDate(value?.toDate() as Date)}
          defaultValue={dayjs(date)}
        />
        <TextField
          name="amount"
          value={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          label="Amount"
          variant="standard"
          placeholder="0.00"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              inputMode: "decimal",
            },
          }}
        />
        <Chip label={transaction.category.name} />
        <Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {subCategories?.map((sc) => (
            <Chip
              key={sc.id}
              onClick={() => setSubCategory(sc)}
              label={sc.name.charAt(0).toUpperCase() + sc.name.slice(1)}
              variant={sc.id === subCategory?.id ? "filled" : "outlined"}
            />
          ))}
        </Box>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="filled"
          placeholder="Add a description"
          fullWidth
          multiline
          rows={3}
        />
      </Box>
      <Box>
        {hasChanged() ? (
          <Box>
            <Button
              sx={{ width: "50%", borderRadius: "0" }}
              onClick={undoChanges}
              variant="contained"
              color="primary"
            >
              Undo
            </Button>
            <Button
              sx={{ width: "50%", borderRadius: "0" }}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Box>
        ) : (
          <Button
            sx={{ width: "100%" }}
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        )}
      </Box>
      <Alert
        handleClose={handleAlertClose}
        confirmedClose={confirmedClose}
        open={alertOpen}
      />
    </Dialog>
  );
}
