import {
  Box,
  Button,
  Chip,
  Dialog,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import type { Transaction_Old } from "../../Types/Transaction";
import { useState } from "react";
import { useStore } from "../../store/store";
import Alert from "./Alert";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { deleteTransaction, updateTransaction } from "../Data/data";
import dayjs from "dayjs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface TransactionDetailsProps {
  transaction: Transaction_Old;
  open: boolean;
  handleClose: () => void;
}

export default function ManualTransactionDetails({
  transaction,
  open,
  handleClose,
}: TransactionDetailsProps) {
  const theme = useTheme();
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const updateTransactionStore = useStore((state) => state.updateTransaction);
  const transactions = useStore((state) => state.transactions);
  const setTransactions = useStore((state) => state.setTransactions);
  const categories = useStore((state) => state.categories);
  const subCategories = categories.find(
    (c) => c.id === transaction.category.id,
  )?.subCategories;
  const [amount, setAmount] = useState(transaction.amount.toFixed(2));
  const [description, setDescription] = useState<string>(
    transaction.description,
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
      updateTransactionStore(updated as Transaction_Old);
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

  async function handleDelete() {
    const deleted = await deleteTransaction(transaction.id);
    if (deleted === null) {
      console.log("failed");
    } else {
      const updatedTransactions = transactions.filter(
        (t) => t.id !== deleted.id,
      );
      setTransactions(updatedTransactions);
      handleDeleteAlertClose();
    }
  }

  function handleDeleteAlertClose() {
    setDeleteAlertOpen(false);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "3rem 2rem",
          display: "grid",
          gap: "1rem",
          placeItems: "center",
          position: "relative",
        }}
      >
        <Box
          onClick={() => setDeleteAlertOpen(true)}
          sx={{
            position: "absolute",
            top: "8px",
            left: "5px",
            padding: "0.25rem",
            display: "grid",
            placeItems: "center",
            borderRadius: "5px",
            "&:hover, &:active": {
              background: theme.palette.background.default,

              ".MuiSvgIcon-root": {
                color: theme.palette.text.primary,
              },
            },
          }}
        >
          <DeleteOutlineIcon color="action" />
        </Box>
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
        {subCategories && subCategories.length > 0 && (
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
        )}
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
        deny={handleAlertClose}
        confirm={confirmedClose}
        open={alertOpen}
        title="Are you sure you want to close?"
        caption="You have unsaved changes."
      />
      <Alert
        deny={handleDeleteAlertClose}
        confirm={handleDelete}
        open={deleteAlertOpen}
        title="Are you sure you want to delete this transaction?"
        caption="This action cannot be undone."
      />
    </Dialog>
  );
}
