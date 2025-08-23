// interface AddTransactionProps {}

import {
  Box,
  Button,
  Chip,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useStore } from "../store/store";
import type { Category } from "../Types/Transaction";
import { useState } from "react";
import { getLittleGuy } from "../utils/helpers";

export default function AddTransaction() {
  const params = useParams();
  const categories = useStore((state) => state.categories);
  const category = categories.find(
    (c) => c.id.toString() === params.categoryId
  ) as Category;
  const [amount, setAmount] = useState<number>(0);
  const [subCategory, setSubCategory] = useState<number | null>(null);

  function littleGuySize() {
    if (amount >= 1000) return "lg";
    if (amount >= 100) return "md";
    return "sm";
  }

  function handleSumbit() {
    if (amount > 0 && subCategory) {
      const data = {
        amount,
        category: params.categoryId,
        subCategory,
      };

      console.log(data);
    }
  }

  return (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "grid",
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
            onChange={(e) => setAmount(parseInt(e.target.value))}
            label="Amount"
            variant="filled"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
          />
          <Box sx={{ display: "grid", gap: "0.5rem" }}>
            <Typography variant="h5">Subcategory</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
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
