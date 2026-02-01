import { Box } from "@mui/material";
import { useState } from "react";
import type { CategoryRules } from "../../Types/PlaidTransactions";
import CategoryRule from "./CategoryRule";
import AddRule from "./AddRule";
import { useCategoryRules } from "../../hooks/queries/useCategoryRules";

export default function CategoryRules() {
  const [openAddRule, setOpenAddRule] = useState(false);
  const [categoryRules, setCategoryRules] = useState<CategoryRules[]>([]);

  useCategoryRules(setCategoryRules);

  return (
    <Box sx={{ display: "grid", gap: "1rem", paddingBottom: "1rem" }}>
      <button onClick={() => setOpenAddRule(true)}>Add Rule</button>
      {categoryRules.map((r) => (
        <CategoryRule rule={r} />
      ))}
      <AddRule open={openAddRule} onClose={() => setOpenAddRule(false)} />
    </Box>
  );
}
