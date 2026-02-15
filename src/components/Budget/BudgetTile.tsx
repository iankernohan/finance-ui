import {
  Box,
  Dialog,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import { formatMoney, iconMap } from "../../utils/helpers";
import type { Category, MonthlySummary } from "../../Types/Transaction";
import { useState } from "react";
import Parcel from "../UI/Parcel";
import { updateCategory } from "../Data/category";
import { useQueryClient } from "@tanstack/react-query";

interface BudgetTileProp {
  category: Category;
  monthlySummary: MonthlySummary;
}

export default function BudgetTile({
  category,
  monthlySummary,
}: BudgetTileProp) {
  const queryClient = useQueryClient();
  const [addBudget, setAddBudget] = useState(false);
  const [amount, setAmount] = useState(category.budgetLimit);

  const totalAmount = monthlySummary.categories[category.name]?.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );

  function getValue() {
    if (!totalAmount) return 0;
    return (totalAmount / category.budgetLimit!) * 100;
  }

  async function handleAddBudget() {
    const updated = await updateCategory(
      category.id,
      category.name,
      category.transactionType,
      amount,
    );
    if (updated) {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
    setAddBudget(false);
  }

  return (
    <Parcel
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        {iconMap[category.name]}
        <p style={{ fontSize: "1.2rem", fontWeight: "200" }}>{category.name}</p>
      </Box>
      <Box sx={{ width: "100%" }}>
        {category.budgetLimit ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: {
                  color: "rgb(133, 133, 133)",
                  fontSize: "0.7rem",
                  fontWeight: "300",
                },
              }}
            >
              <p>{formatMoney(totalAmount ?? 0)}</p>
              <p>{formatMoney(category.budgetLimit)}</p>
            </Box>
            <LinearProgress
              color={getValue() >= 100 ? "error" : "primary"}
              variant="determinate"
              value={getValue() > 100 ? 100 : getValue()}
            />
          </>
        ) : (
          <button onClick={() => setAddBudget(true)} style={{ width: "100%" }}>
            Add Budget
          </button>
        )}
      </Box>
      {addBudget && (
        <Dialog open={addBudget} onClose={() => setAddBudget(false)}>
          <Parcel sx={{ gap: "2rem" }}>
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
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  inputMode: "decimal",
                },
              }}
              sx={{ marginTop: "0.5rem" }}
            />
            <button onClick={handleAddBudget} style={{ width: "100%" }}>
              Add
            </button>
          </Parcel>
        </Dialog>
      )}
    </Parcel>
  );
}

// <Box
//   sx={{
//     display: "grid",
//     placeItems: "center",
//     width: "100px",
//     textAlign: "center",
//   }}
// >
//   {iconMap[category.name]}
//   <p>{category.name}</p>
// </Box>
// <TextField
//   name="amount"
//   value={amount}
//   type="number"
//   onChange={(e) => setAmount(parseFloat(e.target.value))}
//   variant="standard"
//   placeholder="0.00"
//   fullWidth
//   slotProps={{
//     input: {
//       startAdornment: <InputAdornment position="start">$</InputAdornment>,
//       inputMode: "decimal",
//     },
//   }}
//   sx={{ marginTop: "0.5rem" }}
// />
// <Box
//   sx={{
//     height:
//       category.budgetLimit === amount ||
//       (category.budgetLimit === 0 && Number.isNaN(amount))
//         ? "0px"
//         : "50px",
//     overflow: "hidden",
//     gridColumn: "span 2",
//     display: "flex",
//     justifyContent: "center",
//     gap: "4rem",
//     marginTop: "0.5rem",
//     transition: "height 0.3s",
//   }}
// >
//   <IconButton onClick={handleClear}>
//     <CloseIcon color="error" />
//   </IconButton>
//   <IconButton onClick={handleUpdate}>
//     <CheckIcon color="success" />
//   </IconButton>
// </Box>
