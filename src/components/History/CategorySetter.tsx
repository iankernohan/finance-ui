import { Box, Button, Chip, Dialog } from "@mui/material";
import type { Transaction } from "../../Types/Transaction";
import { useStore } from "../../store/store";
import Parcel from "../UI/Parcel";
import { updateCategory } from "../Data/transactions";

interface TransactionDetailsProps {
  transaction: Transaction;
  open: boolean;
  handleClose: () => void;
}

export default function CategorySetter({
  transaction,
  open,
  handleClose,
}: TransactionDetailsProps) {
  const categories = useStore((state) => state.categories);
  const setUncategorizedTransactions = useStore(
    (state) => state.setUncategorizedTransactions,
  );
  const uncategorizedTransactions = useStore(
    (state) => state.uncategorizedTransactions,
  );
  const transactions = useStore((state) => state.transactions);
  const setTransactions = useStore((state) => state.setTransactions);

  function handleSetCategory(categoryId: number) {
    updateCategory(transaction.id, categoryId)
      .then((r) => {
        transaction.category = r.category;
        transaction.categoryId = r.categoryId;
        const transactionsIndex = transactions.findIndex(
          (t) => t.id == transaction.id,
        );
        const tempTransactions = transactions;
        tempTransactions[transactionsIndex] = transaction;
        setTransactions(tempTransactions);

        const uncategorizedTransactionsIndex =
          uncategorizedTransactions.findIndex((t) => t.id == transaction.id);
        const tempUncategorizedTransactions = uncategorizedTransactions.splice(
          uncategorizedTransactionsIndex,
          1,
        );
        setUncategorizedTransactions(tempUncategorizedTransactions);
        handleClose();
      })
      .catch((e) => console.log(e));
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Parcel
        sx={{
          position: "relative",
        }}
      >
        <Parcel sx={{ boxShadow: "none", gap: "1rem", padding: "none" }}>
          {categories.map((c) => (
            <Chip label={c.name} onClick={() => handleSetCategory(c.id)} />
          ))}
          <Chip label="No Category" onClick={() => handleSetCategory(-1)} />
        </Parcel>
        {/* {subCategories && subCategories.length > 0 && (
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
        )} */}
      </Parcel>
      <Box>
        <Button
          sx={{ width: "100%" }}
          onClick={handleClose}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
}
