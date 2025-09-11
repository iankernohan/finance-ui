import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { iconMap } from "../../utils/helpers";
import type { Budget } from "../../Types/Transaction";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { updateBudget } from "../Data/data";
import { useStore } from "../../store/store";

interface BudgetTileProp {
  budget: Budget;
}

export default function BudgetTile({ budget }: BudgetTileProp) {
  const updateBudgetStore = useStore((state) => state.updateBudget);
  const [amount, setAmount] = useState(budget.limit);

  function handleClear() {
    setAmount(budget.limit);
  }

  async function handleUpdate() {
    const updated = await updateBudget(budget.id, amount);
    if (updated) {
      updateBudgetStore(updated);
      budget.limit = updated.limit; // Doing this because `updateBudgetStore` isn't working properly
    }
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: "100px",
          textAlign: "center",
        }}
      >
        {iconMap[budget.category.name]}
        <p>{budget.category.name}</p>
      </Box>
      <TextField
        name="amount"
        value={amount}
        type="number"
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        variant="standard"
        placeholder="0.00"
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputMode: "decimal",
          },
        }}
        sx={{ marginTop: "0.5rem" }}
      />
      <Box
        sx={{
          height:
            budget.limit === amount ||
            (budget.limit === 0 && Number.isNaN(amount))
              ? "0px"
              : "50px",
          overflow: "hidden",
          gridColumn: "span 2",
          display: "flex",
          justifyContent: "center",
          gap: "4rem",
          marginTop: "0.5rem",
          transition: "height 0.3s",
        }}
      >
        <IconButton onClick={handleClear}>
          <CloseIcon color="error" />
        </IconButton>
        <IconButton onClick={handleUpdate}>
          <CheckIcon color="success" />
        </IconButton>
      </Box>
    </Box>
  );
}
