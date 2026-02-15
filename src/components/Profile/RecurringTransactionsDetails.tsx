import {
  Box,
  Button,
  Chip,
  Dialog,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import type { RecurringTransaction } from "../../Types/Transaction";
import { useState } from "react";
import { useStore } from "../../store/store";
import {
  deleteRecurringTransaction,
  updateRecurringTransaction,
} from "../Data/data";
import dayjs from "dayjs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Alert from "../History/Alert";
import { MobileDatePicker } from "@mui/x-date-pickers";

interface TransactionDetailsProps {
  transaction: RecurringTransaction;
  open: boolean;
  handleClose: () => void;
}

export default function RecurringTransactionDetails({
  transaction,
  open,
  handleClose,
}: TransactionDetailsProps) {
  const theme = useTheme();
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const recurringTransactions = useStore(
    (state) => state.recurringTransactions,
  );
  const setRecurringTransactions = useStore(
    (state) => state.setRecurringTransactions,
  );
  const categories = useStore((state) => state.categories);
  const categoryName = categories.find(
    (c) => c.id === transaction.categoryId,
  )?.name;
  const [amount, setAmount] = useState(transaction.amount.toFixed(2));
  const [description, setDescription] = useState<string>(
    transaction.description ?? "",
  );
  const [interval, setInterval] = useState(transaction.intervalDays);
  const [endDate, setEndDate] = useState<Date | null>(
    transaction.endDate ?? null,
  );

  function hasChanged() {
    return (
      parseFloat(amount as string) !== transaction.amount ||
      description !== transaction.description ||
      interval !== transaction.intervalDays
    );
  }

  function undoChanges() {
    setAmount(transaction.amount.toFixed(2));
    setDescription(transaction.description ?? "");
    setInterval(transaction.intervalDays);
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const data = {
      ...transaction,
      amount: parseFloat(amount),
      description,
      intervalDays: interval,
    };
    if (hasChanged()) {
      if (transaction.id) {
        await updateRecurringTransaction(transaction.id, data);
        handleClose();
      }
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
    const res = await deleteRecurringTransaction(transaction.id as number);
    if (res) {
      setRecurringTransactions(
        recurringTransactions.filter((rt) => rt.id !== transaction.id),
      );
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
          onChange={(value) => setEndDate(value?.toDate() as Date)}
          defaultValue={dayjs(endDate)}
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
        <Chip label={categoryName} />
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
