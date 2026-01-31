import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getCategoryRules } from "../Data/data";
import type { CategoryRules } from "../../Types/PlaidTransactions";
import CategoryRule from "./CategoryRule";

export default function CategoryRules() {
  const [categoryRules, setCategoryRules] = useState<CategoryRules[]>([]);

  const getStuff = useCallback(async () => {
    const rules = await getCategoryRules();
    setCategoryRules(rules);
    console.log(rules);
  }, []);

  useEffect(() => {
    getStuff();
  }, [getStuff]);

  return (
    <Box sx={{ display: "grid", gap: "1rem", paddingBottom: "1rem" }}>
      {categoryRules.map((r) => (
        <CategoryRule rule={r} />
      ))}
    </Box>
  );
}
