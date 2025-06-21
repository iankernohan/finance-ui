import {
  Box,
  Chip,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Popover,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import type { FilterConditions } from "../../Types/Transaction";
import { useState } from "react";
import { useStore } from "../../store/store";

type FilterProps = {
  open: boolean;
  handleClose: () => void;
  updateFilterConditions: (conditions: FilterConditions) => void;
};

export default function Filter({
  open,
  handleClose,
  updateFilterConditions,
}: FilterProps) {
  const theme = useTheme();

  const allCategories = useStore((state) => state.categories);
  const [conditions, setConditions] = useState<FilterConditions>({});

  let categories;
  if (conditions.transactionType === "Expense") {
    categories = allCategories.filter((c) => c.transactionType === "Expense");
  } else if (conditions.transactionType === "Income") {
    categories = allCategories.filter((c) => c.transactionType === "Income");
  } else {
    categories = allCategories;
  }

  function onClose() {
    updateFilterConditions(conditions);
    handleClose();
  }

  function handleTransactionType(type: "Income" | "Expense" | undefined) {
    if (type) setConditions((curr) => ({ ...curr, transactionType: type }));
    else setConditions((curr) => ({ ...curr, transactionType: undefined }));
  }

  function handleCategory(name: string) {
    if (conditions.category?.includes(name)) {
      if (conditions.category.length === 1) {
        setConditions((curr) => ({ ...curr, category: undefined }));
      } else {
        setConditions((curr) => ({
          ...curr,
          category: curr.category?.filter((c) => c !== name),
        }));
      }
    } else {
      const updated = conditions.category
        ? [...conditions.category, name]
        : [name];
      setConditions((curr) => ({
        ...curr,
        category: updated,
      }));
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ padding: "1rem" }}>
        <p>Transaction Type</p>
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          {[null, "Expense", "Income"].map((i) => (
            <Chip
              onClick={() =>
                handleTransactionType(i as "Income" | "Expense" | undefined)
              }
              label={i ?? "All"}
              sx={{
                backgroundColor:
                  conditions.transactionType === i
                    ? theme.palette.primary.dark
                    : undefined,
                color:
                  conditions.transactionType === i
                    ? theme.palette.text.disabled
                    : undefined,
              }}
            />
          ))}
        </Box>
        <hr />
        <p>Category</p>
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {categories.map((c) => (
            <Chip
              label={c.name}
              onClick={() => handleCategory(c.name)}
              sx={{
                backgroundColor: conditions.category?.includes(c.name)
                  ? theme.palette.primary.dark
                  : undefined,
                color: conditions.category?.includes(c.name)
                  ? theme.palette.text.disabled
                  : undefined,
              }}
            />
          ))}
        </Box>
      </Box>
    </Dialog>
  );
}
