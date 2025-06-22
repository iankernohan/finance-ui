import {
  Box,
  Button,
  Chip,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Popover,
  Radio,
  RadioGroup,
  TextField,
  useTheme,
} from "@mui/material";
import type { FilterConditions } from "../../Types/Transaction";
import { useState } from "react";
import { useStore } from "../../store/store";
import { MobileDatePicker } from "@mui/x-date-pickers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";

type FilterProps = {
  open: boolean;
  handleClose: () => void;
  updateFilterConditions: (conditions: FilterConditions) => void;
  filterConitions: FilterConditions | null;
};

export default function Filter({
  open,
  handleClose,
  updateFilterConditions,
  filterConitions,
}: FilterProps) {
  const theme = useTheme();

  const allCategories = useStore((state) => state.categories);
  // const [conditions, setConditions] = useState<FilterConditions>({});

  let categories;
  if (filterConitions?.transactionType === "Expense") {
    categories = allCategories.filter((c) => c.transactionType === "Expense");
  } else if (filterConitions?.transactionType === "Income") {
    categories = allCategories.filter((c) => c.transactionType === "Income");
  } else {
    categories = allCategories;
  }

  const subCategories: string[] = [];
  if (filterConitions?.category) {
    categories.map((c) => {
      if (filterConitions.category?.includes(c.name)) {
        c.subCategories?.forEach((s) => {
          subCategories.push(s.name);
        });
      }
    });
  }

  function onClose() {
    // updateFilterConditions(filterConitions);
    handleClose();
  }

  function handleTransactionType(type: "Income" | "Expense" | undefined) {
    if (type)
      updateFilterConditions({ ...filterConitions, transactionType: type });
    else
      updateFilterConditions({
        ...filterConitions,
        transactionType: undefined,
      });
  }

  function handleCategory(name: string) {
    if (filterConitions?.category?.includes(name)) {
      if (filterConitions.category.length === 1) {
        updateFilterConditions({ ...filterConitions, category: undefined });
      } else {
        updateFilterConditions({
          ...filterConitions,
          category: filterConitions.category?.filter((c) => c !== name),
        });
      }
    } else {
      const updated = filterConitions?.category
        ? [...filterConitions.category, name]
        : [name];
      updateFilterConditions({
        ...filterConitions,
        category: updated,
      });
    }
  }

  function handleStartDate(date: Date | null) {
    if (date) updateFilterConditions({ ...filterConitions, startDate: date });
    else updateFilterConditions({ ...filterConitions, startDate: undefined });
  }

  function handleEndDate(date: Date | null) {
    if (date) updateFilterConditions({ ...filterConitions, endDate: date });
    else updateFilterConditions({ ...filterConitions, endDate: undefined });
  }

  function handleSubCategory(name: string) {
    if (filterConitions?.subCategory?.includes(name)) {
      if (filterConitions.subCategory.length === 1) {
        updateFilterConditions({ ...filterConitions, subCategory: undefined });
      } else {
        updateFilterConditions({
          ...filterConitions,
          subCategory: filterConitions.subCategory?.filter((s) => s !== name),
        });
      }
    } else {
      const updated = filterConitions?.subCategory
        ? [...filterConitions.subCategory, name]
        : [name];
      updateFilterConditions({
        ...filterConitions,
        subCategory: updated,
      });
    }
  }

  function handleMinAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = parseInt(e.target.value);
    updateFilterConditions({
      ...filterConitions,
      minAmount: amount > 0 ? amount : undefined,
    });
  }

  function handleMaxAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = parseInt(e.target.value);
    updateFilterConditions({
      ...filterConitions,
      maxAmount: amount > 0 ? amount : undefined,
    });
  }

  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    updateFilterConditions({
      ...filterConitions,
      description: input ? input : undefined,
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "2rem",
          maxHeight: "70dvh",
          overflow: "auto",
          "& p": {
            marginBottom: "0.5rem",
          },
        }}
      >
        <p>Transaction Type</p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
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
                  filterConitions?.transactionType === i
                    ? theme.palette.primary.dark
                    : undefined,
                color:
                  filterConitions?.transactionType === i
                    ? theme.palette.text.disabled
                    : undefined,
              }}
            />
          ))}
        </Box>
        <hr style={{ width: "100%" }} />

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
                backgroundColor: filterConitions?.category?.includes(c.name)
                  ? theme.palette.primary.dark
                  : undefined,
                color: filterConitions?.category?.includes(c.name)
                  ? theme.palette.text.disabled
                  : undefined,
              }}
            />
          ))}
        </Box>
        <hr style={{ width: "100%" }} />

        <Box
          sx={{
            height: subCategories.length ? "auto" : "0px",
            maxHeight: subCategories.length ? undefined : "0px",
            overflow: "hidden",
          }}
        >
          <p>SubCategory</p>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {subCategories.map((s) => (
              <Chip
                label={s}
                onClick={() => handleSubCategory(s)}
                sx={{
                  backgroundColor: filterConitions?.subCategory?.includes(s)
                    ? theme.palette.primary.dark
                    : undefined,
                  color: filterConitions?.subCategory?.includes(s)
                    ? theme.palette.text.disabled
                    : undefined,
                }}
              />
            ))}
          </Box>
          <hr style={{ width: "100%" }} />
        </Box>

        <p>Start Date</p>
        <Box sx={{ display: "flex" }}>
          <MobileDatePicker
            onChange={(value) => handleStartDate(value?.toDate() as Date)}
            value={
              filterConitions?.startDate
                ? dayjs(filterConitions.startDate)
                : undefined
            }
          />
          <Button
            onClick={() => handleStartDate(null)}
            disabled={filterConitions?.startDate === undefined}
          >
            <DeleteOutlineIcon />
          </Button>
        </Box>
        <hr style={{ width: "100%" }} />

        <p>End Date</p>
        <Box sx={{ display: "flex" }}>
          <MobileDatePicker
            onChange={(value) => handleEndDate(value?.toDate() as Date)}
            value={
              filterConitions?.endDate
                ? dayjs(filterConitions.endDate)
                : undefined
            }
          />
          <Button
            onClick={() => handleEndDate(null)}
            disabled={filterConitions?.endDate === undefined}
          >
            <DeleteOutlineIcon />
          </Button>
        </Box>
        <hr style={{ width: "100%" }} />

        <p>Amount</p>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TextField
            value={filterConitions?.minAmount}
            type="number"
            onChange={handleMinAmount}
            label="Min"
            placeholder="0.00"
            fullWidth
          />
          <span>-</span>
          <TextField
            value={filterConitions?.maxAmount}
            type="number"
            onChange={handleMaxAmount}
            label="Max"
            placeholder="0.00"
            fullWidth
          />
        </Box>
        <hr style={{ width: "100%" }} />

        <TextField
          value={filterConitions?.description}
          onChange={handleDescription}
          label="Description"
          fullWidth
        />
      </Box>
    </Dialog>
  );
}
