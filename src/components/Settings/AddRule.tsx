import {
  Box,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useStore } from "../../store/store";
import Parcel from "../UI/Parcel";
import Alert from "../History/Alert";
import { addCategoryRule } from "../Data/data";
import { useQueryClient } from "@tanstack/react-query";

export default function AddRule({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<number | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const categories = useStore((state) => state.categories);
  const queryClient = useQueryClient();

  function handleClose() {
    if (name === "" && category === null) return onClose();
    setOpenAlert(true);
  }

  async function handleAddRule() {
    if (category && name !== "") {
      await addCategoryRule(name, category);
      queryClient.invalidateQueries({ queryKey: ["categoryRules"] });
      onClose();
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Parcel
        sx={{
          padding: "1rem 2rem",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            label="Category"
            value={category ?? ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button onClick={handleClose} style={{ width: "90px" }}>
            Cancel
          </button>
          <button
            disabled={name === "" || category === null}
            onClick={handleAddRule}
            style={{ width: "90px" }}
          >
            Add
          </button>
        </Box>
      </Parcel>
      <Alert
        deny={() => setOpenAlert(false)}
        confirm={onClose}
        open={openAlert}
        title="Are you sure you want to close?"
        caption="You have unsaved changes."
      />
    </Dialog>
  );
}
