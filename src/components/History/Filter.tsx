import { Box, Button, Chip, Dialog, TextField, useTheme } from "@mui/material";
import type { Filters } from "../../Types/Transaction";
import { useStore } from "../../store/store";
import { MobileDatePicker } from "@mui/x-date-pickers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";

type FilterProps = {
  open: boolean;
  handleClose: () => void;
  updateFilterConditions: (conditions: Filters) => void;
  filterConditions: Filters | null;
};

export default function Filter({
  open,
  handleClose,
  updateFilterConditions,
  filterConditions: filterConditions,
}: FilterProps) {
  const theme = useTheme();

  const allCategories = useStore((state) => state.categories);

  let categories;
  if (filterConditions?.transactionType === "Expense") {
    categories = allCategories.filter((c) => c.transactionType === "Expense");
  } else if (filterConditions?.transactionType === "Income") {
    categories = allCategories.filter((c) => c.transactionType === "Income");
  } else {
    categories = allCategories;
  }

  const subCategories: string[] = [];
  if (filterConditions?.category) {
    categories.map((c) => {
      if (filterConditions.category?.includes(c.name)) {
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
      updateFilterConditions({ ...filterConditions, transactionType: type });
    else
      updateFilterConditions({
        ...filterConditions,
        transactionType: undefined,
      });
  }

  function handleCategory(name: string) {
    if (filterConditions?.category?.includes(name)) {
      if (filterConditions.category.length === 1) {
        updateFilterConditions({ ...filterConditions, category: undefined });
      } else {
        updateFilterConditions({
          ...filterConditions,
          category: filterConditions.category?.filter((c) => c !== name),
        });
      }
    } else {
      const updated = filterConditions?.category
        ? [...filterConditions.category, name]
        : [name];
      updateFilterConditions({
        ...filterConditions,
        category: updated,
      });
    }
  }

  function handleStartDate(date: Date | null) {
    if (date) updateFilterConditions({ ...filterConditions, startDate: date });
    else updateFilterConditions({ ...filterConditions, startDate: undefined });
  }

  function handleEndDate(date: Date | null) {
    if (date) updateFilterConditions({ ...filterConditions, endDate: date });
    else updateFilterConditions({ ...filterConditions, endDate: undefined });
  }

  function handleSubCategory(name: string) {
    if (filterConditions?.subCategory?.includes(name)) {
      if (filterConditions.subCategory.length === 1) {
        updateFilterConditions({ ...filterConditions, subCategory: undefined });
      } else {
        updateFilterConditions({
          ...filterConditions,
          subCategory: filterConditions.subCategory?.filter((s) => s !== name),
        });
      }
    } else {
      const updated = filterConditions?.subCategory
        ? [...filterConditions.subCategory, name]
        : [name];
      updateFilterConditions({
        ...filterConditions,
        subCategory: updated,
      });
    }
  }

  function handleMinAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = parseInt(e.target.value);
    updateFilterConditions({
      ...filterConditions,
      minAmount: amount > 0 ? amount : undefined,
    });
  }

  function handleMaxAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = parseInt(e.target.value);
    updateFilterConditions({
      ...filterConditions,
      maxAmount: amount > 0 ? amount : undefined,
    });
  }

  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    updateFilterConditions({
      ...filterConditions,
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
                  filterConditions?.transactionType === i
                    ? theme.palette.primary.dark
                    : undefined,
                color:
                  filterConditions?.transactionType === i
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
                backgroundColor: filterConditions?.category?.includes(c.name)
                  ? theme.palette.primary.dark
                  : undefined,
                color: filterConditions?.category?.includes(c.name)
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
                  backgroundColor: filterConditions?.subCategory?.includes(s)
                    ? theme.palette.primary.dark
                    : undefined,
                  color: filterConditions?.subCategory?.includes(s)
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
              filterConditions?.startDate
                ? dayjs(filterConditions.startDate)
                : undefined
            }
          />
          <Button
            onClick={() => handleStartDate(null)}
            disabled={filterConditions?.startDate === undefined}
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
              filterConditions?.endDate
                ? dayjs(filterConditions.endDate)
                : undefined
            }
          />
          <Button
            onClick={() => handleEndDate(null)}
            disabled={filterConditions?.endDate === undefined}
          >
            <DeleteOutlineIcon />
          </Button>
        </Box>
        <hr style={{ width: "100%" }} />

        <p>Amount</p>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TextField
            value={filterConditions?.minAmount}
            type="number"
            onChange={handleMinAmount}
            label="Min"
            placeholder="0.00"
            fullWidth
          />
          <span>-</span>
          <TextField
            value={filterConditions?.maxAmount}
            type="number"
            onChange={handleMaxAmount}
            label="Max"
            placeholder="0.00"
            fullWidth
          />
        </Box>
        <hr style={{ width: "100%" }} />

        <TextField
          value={filterConditions?.description}
          onChange={handleDescription}
          label="Description"
          fullWidth
        />
      </Box>
    </Dialog>
  );
}
