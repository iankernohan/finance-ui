// interface AddTransactionProps {}

import {
  Box,
  Button,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useStore } from "../../store/store";
import type { Category } from "../../Types/Transaction";
import { getLittleGuy } from "../../utils/helpers";
import { addTransaction } from "../Data/data";

export default function AddTransaction() {
  const params = useParams();
  const categories = useStore((state) => state.categories);
  const updateTransactions = useStore((state) => state.addTransaction);
  const category = categories.find(
    (c) => c.id.toString() === params.categoryId
  ) as Category;
  const [amount, setAmount] = useState<string>("");
  const [subCategory, setSubCategory] = useState<number | null>(
    category.subCategories?.length ? null : -1
  );
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
    if (parseFloat(amount) > 0 && subCategory !== null) {
      const data = {
        amount: parseFloat(amount),
        categoryId: parseInt(params.categoryId as string),
        subCategoryId: subCategory === -1 ? null : subCategory,
      };

      const res = await addTransaction(data);

      if (res) {
        updateTransactions(res.transaction);
        navigate("/");
      } else {
        alert("Error adding transaction");
      }
    }
  }

  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          placeItems: "center",
          height: "80%",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: "3rem",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {`${
              category.name.charAt(0).toUpperCase() + category.name.slice(1)
            } Transaction`}
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
          <Box sx={{ display: "grid", gap: "0.5rem" }}>
            <Typography variant="h5">Subcategory</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              {category.subCategories?.length ? (
                category.subCategories?.map((sc) => (
                  <Chip
                    onClick={() => setSubCategory(sc.id)}
                    label={sc.name.charAt(0).toUpperCase() + sc.name.slice(1)}
                    variant={subCategory == sc.id ? "filled" : "outlined"}
                  />
                ))
              ) : (
                <Chip label="No subcategories" variant="outlined" />
              )}
            </Box>
          </Box>
        </Box>
        <Button onClick={handleSumbit} variant="contained" color="primary">
          Add Transaction
        </Button>
      </Box>
      <Box sx={{ display: "grid", justifyContent: "center" }}>
        <img
          style={{
            width: "150px",
            translate: "0 -10px",
          }}
          src={`/${getLittleGuy(0, littleGuySize())}`}
        />
      </Box>
    </Box>
  );
}
