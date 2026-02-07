import { Box } from "@mui/material";
import { useStore } from "../../store/store";
import Category from "./Category";

export default function Categories() {
  const categories = useStore((state) => state.categories);

  return (
    <Box sx={{ display: "grid", gap: "1rem", paddingBottom: "2rem" }}>
      {categories.map((category) => (
        <Category category={category} />
      ))}
    </Box>
  );
}
