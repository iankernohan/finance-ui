import { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Parcel from "../UI/Parcel";
import EditIcon from "@mui/icons-material/Edit";
import type { CategoryRules } from "../../Types/PlaidTransactions";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../store/store";
import { useQueryClient } from "@tanstack/react-query";
import { updateCategoryRule } from "../Data/categoryRules";
import type { SubCategory } from "../../Types/Transaction";

export default function CategoryRule({ rule }: { rule: CategoryRules }) {
  const theme = useTheme();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(rule.name);
  const [category, setCategory] = useState(rule.category?.id?.toString() ?? "");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const categories = useStore((state) => state.categories);
  const queryClient = useQueryClient();

  useEffect(() => {
    const cat = categories.find((c) => c.id.toString() === category);
    setSubCategories(cat?.subCategories ?? []);
  }, [category, categories]);
  console.log(rule);
  async function handleUpdate() {
    if (
      name !== rule.name ||
      category !== rule.category?.id?.toString() ||
      subCategory !== rule.subCategoryId?.toString()
    ) {
      await updateCategoryRule(
        rule.id,
        name,
        parseInt(category) as number,
        parseInt(subCategory),
      );
      queryClient.invalidateQueries({ queryKey: ["categoryRules"] });
      setEdit(false);
    }
  }

  return (
    <Parcel
      sx={{ padding: "0.5rem 1rem", justifyContent: "start", gap: "1rem" }}
    >
      <Box>
        {edit ? (
          <TextField
            sx={{
              ".MuiInputBase-root": {
                input: {
                  padding: "0",
                  outline: "none",
                },
                fieldset: {
                  border: "none",
                  borderBottom: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "0",
                },
              },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p style={{ fontWeight: "200", fontSize: "1.2rem" }}>{rule.name}</p>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "end" }}>
          {edit ? (
            <>
              <Select
                value={category ?? ""}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  ".MuiSelect-select": {
                    padding: "0.25rem",
                    paddingRight: "2rem",
                  },
                }}
              >
                {categories.map((c) => (
                  <MenuItem value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
              <Select
                value={subCategory ?? ""}
                onChange={(e) => setSubCategory(e.target.value)}
                sx={{
                  ".MuiSelect-select": {
                    padding: "0.25rem",
                    paddingRight: "2rem",
                  },
                }}
              >
                {subCategories.map((c) => (
                  <MenuItem value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
            </>
          ) : (
            <>
              <p style={{ fontWeight: 300 }}>{rule.category?.name}</p>
              <p
                style={{
                  color: "rgb(137, 137, 137)",
                  fontWeight: "200",
                  fontSize: "0.8rem",
                }}
              >
                {rule.subCategory?.name ?? "No sub-category"}
              </p>
            </>
          )}
        </Box>
        {edit ? (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setEdit(false)}
              style={{
                width: 30,
                height: 30,
              }}
            >
              <CloseIcon sx={{ width: "20px" }} />
            </button>
            <button
              disabled={name === rule.name && category === rule.category?.name}
              onClick={handleUpdate}
              style={{
                width: 30,
                height: 30,
              }}
            >
              <CheckIcon sx={{ width: "20px" }} />
            </button>
          </Box>
        ) : (
          <button
            onClick={() => setEdit(true)}
            style={{
              width: 30,
              height: 30,
            }}
          >
            <EditIcon sx={{ width: "20px" }} />
          </button>
        )}
      </Box>
    </Parcel>
  );
}
