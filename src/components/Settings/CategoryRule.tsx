import { useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import Parcel from "../UI/Parcel";
import EditIcon from "@mui/icons-material/Edit";
import type { CategoryRules } from "../../Types/PlaidTransactions";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../store/store";
import { updateCategoryRule } from "../Data/data";

export default function CategoryRule({ rule }: { rule: CategoryRules }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(rule.name);
  const [category, setCategory] = useState(rule.category?.id?.toString() ?? "");
  const categories = useStore((state) => state.categories);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  async function handleUpdate() {
    if (name !== rule.name || category !== rule.category?.id?.toString()) {
      await updateCategoryRule(rule.id, name, parseInt(category) as number);
    }
  }

  return (
    <Parcel
      sx={{ padding: "0.5rem 1rem", justifyContent: "start", gap: "1rem" }}
    >
      <Box>
        {edit ? (
          <TextField value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <Typography sx={{ fontWeight: "300" }}>{rule.name}</Typography>
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
        {edit ? (
          <Select
            label="Category"
            value={category ?? ""}
            onChange={handleCategoryChange}
          >
            {categories.map((c) => (
              <MenuItem value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        ) : (
          <Typography>{rule.category?.name}</Typography>
        )}
        {edit ? (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setEdit(false)}
              style={{
                display: "grid",
                placeItems: "center",
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(3px)",
                border: "none",
                boxShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              <CloseIcon sx={{ width: "20px" }} />
            </button>
            <button
              disabled={name === rule.name && category === rule.category?.name}
              onClick={handleUpdate}
              style={{
                display: "grid",
                placeItems: "center",
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(3px)",
                border: "none",
                boxShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              <CheckIcon sx={{ width: "20px" }} />
            </button>
          </Box>
        ) : (
          <button
            onClick={() => setEdit(true)}
            style={{
              display: "grid",
              placeItems: "center",
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(3px)",
              border: "none",
              boxShadow: "0 1px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            <EditIcon sx={{ width: "20px" }} />
          </button>
        )}
      </Box>
    </Parcel>
  );
}
