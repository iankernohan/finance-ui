// interface AddTransactionProps {}

import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useStore } from "../../store/store";
import type { Category } from "../../Types/Transaction";
import { getLittleGuy } from "../../utils/helpers";
import {
  addRecurringTransaction,
  addTransaction,
  getTransactions,
} from "../Data/data";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function AddTransaction() {
  const params = useParams();
  const categories = useStore((state) => state.categories);
  const updateTransactions = useStore((state) => state.addTransaction);
  const setTransactions = useStore((state) => state.setTransactions);
  const category = categories.find(
    (c) => c.id.toString() === params.categoryId
  ) as Category;
  const [amount, setAmount] = useState<string>("");
  const [subCategory, setSubCategory] = useState<number | null>(
    category.subCategories?.length ? null : -1
  );
  const [description, setDescription] = useState<string>("");
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [interval, setInterval] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(input)) {
      setAmount(input);
    }
  }

  function littleGuySize() {
    if (parseFloat(amount) >= 1000) return "lg";
    if (parseFloat(amount) >= 100) return "md";
    return "sm";
  }

  async function handleSumbit() {
    if (isRecurring) {
      if (parseFloat(amount) > 0 && interval > 0 && startDate !== null) {
        const data = {
          amount: parseFloat(amount),
          description,
          isRecurring,
          categoryId: parseInt(params.categoryId as string),
          subCategoryId: subCategory === -1 ? null : subCategory,
          intervalDays: interval,
          startDate,
          endDate,
        };

        const res = await addRecurringTransaction(data);

        if (res) {
          const updatedTransactions = await getTransactions();
          setTransactions(updatedTransactions);
          navigate("/");
        } else {
          alert("Error adding transaction");
        }
      }
    } else if (parseFloat(amount) > 0 && subCategory !== null) {
      const data = {
        amount: parseFloat(amount),
        description,
        isRecurring,
        categoryId: parseInt(params.categoryId as string),
        subCategoryId: subCategory === -1 ? null : subCategory,
      };

      const res = await addTransaction(data);

      if (res) {
        updateTransactions(res);
        navigate("/");
      } else {
        alert("Error adding transaction");
      }
    }
  }

  return (
    <Box sx={{ height: "100%", overflow: "hidden", padding: "0 2rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          placeItems: "center",
          height: "80%",
          textAlign: "center",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        className="form-container"
      >
        <Box
          sx={{
            display: "grid",
            gap: "2rem",
            padding: "2rem 0",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </Typography>
          <TextField
            value={amount}
            type="number"
            onChange={handleChange}
            label="Amount"
            variant="filled"
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
          {category.subCategories && category.subCategories?.length > 0 && (
            <Box sx={{ display: "grid", gap: "0.5rem" }}>
              <Typography variant="h5">Subcategory</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {category.subCategories?.map((sc) => (
                  <Chip
                    onClick={() => setSubCategory(sc.id)}
                    label={sc.name.charAt(0).toUpperCase() + sc.name.slice(1)}
                    variant={subCategory == sc.id ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </Box>
          )}
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            variant="filled"
            placeholder="Description"
            fullWidth
            multiline
            rows={3}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
            }
            label="Is Recurring"
          />

          <Box
            sx={{
              display: "grid",
              gap: "2rem",
              maxHeight: isRecurring ? "500px" : 0,
              overflow: "hidden",
              transition: "max-height 0.5s ease",
            }}
          >
            <TextField
              value={interval}
              type="number"
              label="Interval (days)"
              variant="filled"
              onChange={(e) => setInterval(parseInt(e.target.value))}
            />
            <MobileDatePicker
              label="Start Date"
              defaultValue={dayjs(startDate)}
              onChange={(value) => setStartDate(value?.toDate() as Date)}
            />
            <MobileDatePicker
              label="End Date"
              onChange={(value) => setEndDate(value?.toDate() as Date)}
            />
          </Box>
          <Button onClick={handleSumbit} variant="contained" color="primary">
            Add Transaction
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "grid", justifyContent: "center" }}>
        <img
          style={{
            width: "150px",
            translate: "0 -10px",
          }}
          src={getLittleGuy(0, littleGuySize())}
        />
      </Box>
    </Box>
  );
}
