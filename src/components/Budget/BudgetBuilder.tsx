import { Box, InputAdornment, TextField } from "@mui/material";
import { useStore } from "../../store/store";
import { iconMap } from "../../utils/helpers";

export default function BudgetBuilder() {
  const categories = useStore((state) => state.categories);
  // const budgets = useStore((state) => state.budgets);
  // const total = budgets.reduce((acc, curr) => acc + curr.limit, 0);

  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Box
          sx={{
            display: "grid",
            justifyItems: "center",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <p></p>
          <p>Limit</p>
        </Box>
        {categories.map((c) => (
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
              {iconMap[c.name]}
              <p>{c.name}</p>
            </Box>
            <TextField
              name="amount"
              value={0}
              type="number"
              // onChange={(e) => setAmount(e.target.value)}
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
            />
            {/* <p>
              {formatMoney(
                budgets.find((b) => b.category.id === c.id)?.limit ?? 0
              )}
            </p> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
