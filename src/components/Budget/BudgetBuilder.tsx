import { Box, Chip } from "@mui/material";
import { useStore } from "../../store/store";

export default function BudgetBuilder() {
  const categories = useStore((state) => state.categories);
  return (
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {categories.map((c) => (
          <Chip label={c.name} />
        ))}
      </Box>
    </Box>
  );
}
