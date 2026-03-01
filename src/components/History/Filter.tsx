import { Box, Button, Chip, Dialog, TextField, useTheme } from "@mui/material";
import { useStore } from "../../store/store";
import { MobileDatePicker } from "@mui/x-date-pickers";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";

type FilterProps = {
  open: boolean;
  handleClose: () => void;
};

export default function Filter({ open, handleClose }: FilterProps) {
  const theme = useTheme();

  const allCategories = useStore((state) => state.categories);
  const filters = useStore((state) => state.filters);
  const updateFilters = useStore((state) => state.updateFilters);

  let categories;
  if (filters?.transactionType === "Expense") {
    categories = allCategories.filter((c) => c.transactionType === "Expense");
  } else if (filters?.transactionType === "Income") {
    categories = allCategories.filter((c) => c.transactionType === "Income");
  } else {
    categories = allCategories;
  }

  const subCategories: string[] = [];
  if (filters?.category) {
    categories.map((c) => {
      if (filters.category?.includes(c.name)) {
        c.subCategories?.forEach((s) => {
          subCategories.push(s.name);
        });
      }
    });
  }

  function onClose() {
    // updateFilters(filterConitions);
    handleClose();
  }

  function handleTransactionType(type: "Income" | "Expense" | undefined) {
    if (type) updateFilters({ transactionType: type });
    else
      updateFilters({
        transactionType: undefined,
      });
  }

  function handleCategory(name: string) {
    if (filters?.category?.includes(name)) {
      if (filters.category.length === 1) {
        updateFilters({ category: undefined });
      } else {
        updateFilters({
          category: filters.category?.filter((c) => c !== name),
        });
      }
    } else {
      const updated = filters?.category ? [...filters.category, name] : [name];
      updateFilters({
        category: updated,
      });
    }
  }

  function handleStartDate(date: Date | null) {
    if (date) updateFilters({ startDate: date });
    else updateFilters({ startDate: undefined });
  }

  function handleEndDate(date: Date | null) {
    if (date) updateFilters({ endDate: date });
    else updateFilters({ endDate: undefined });
  }

  function handleSubCategory(name: string) {
    if (filters?.subCategory?.includes(name)) {
      if (filters.subCategory.length === 1) {
        updateFilters({ subCategory: undefined });
      } else {
        updateFilters({
          subCategory: filters.subCategory?.filter((s) => s !== name),
        });
      }
    } else {
      const updated = filters?.subCategory
        ? [...filters.subCategory, name]
        : [name];
      updateFilters({
        subCategory: updated,
      });
    }
  }

  function handleMinAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = parseInt(e.target.value);
    updateFilters({
      minAmount: amount > 0 ? amount : undefined,
    });
  }

  function handleMaxAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const amount = parseInt(e.target.value);
    updateFilters({
      maxAmount: amount > 0 ? amount : undefined,
    });
  }

  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    updateFilters({
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
                  filters?.transactionType === i
                    ? theme.palette.primary.dark
                    : undefined,
                color:
                  filters?.transactionType === i
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
                backgroundColor: filters?.category?.includes(c.name)
                  ? theme.palette.primary.dark
                  : undefined,
                color: filters?.category?.includes(c.name)
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
                  backgroundColor: filters?.subCategory?.includes(s)
                    ? theme.palette.primary.dark
                    : undefined,
                  color: filters?.subCategory?.includes(s)
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
            value={filters?.startDate ? dayjs(filters.startDate) : undefined}
          />
          <Button
            onClick={() => handleStartDate(null)}
            disabled={filters?.startDate === undefined}
          >
            <DeleteOutlineIcon />
          </Button>
        </Box>
        <hr style={{ width: "100%" }} />

        <p>End Date</p>
        <Box sx={{ display: "flex" }}>
          <MobileDatePicker
            onChange={(value) => handleEndDate(value?.toDate() as Date)}
            value={filters?.endDate ? dayjs(filters.endDate) : undefined}
          />
          <Button
            onClick={() => handleEndDate(null)}
            disabled={filters?.endDate === undefined}
          >
            <DeleteOutlineIcon />
          </Button>
        </Box>
        <hr style={{ width: "100%" }} />

        <p>Amount</p>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TextField
            value={filters?.minAmount}
            type="number"
            onChange={handleMinAmount}
            label="Min"
            placeholder="0.00"
            fullWidth
          />
          <span>-</span>
          <TextField
            value={filters?.maxAmount}
            type="number"
            onChange={handleMaxAmount}
            label="Max"
            placeholder="0.00"
            fullWidth
          />
        </Box>
        <hr style={{ width: "100%" }} />

        <TextField
          value={filters?.description}
          onChange={handleDescription}
          label="Description"
          fullWidth
        />
      </Box>
    </Dialog>
  );
}
