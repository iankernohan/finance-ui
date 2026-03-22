import { Box, Modal, useTheme } from "@mui/material";
import Parcel from "../UI/Parcel";
import { useStore } from "../../store/store";
import { useState } from "react";
import { addCategoryRule } from "../Data/categoryRules";
import { useQueryClient } from "@tanstack/react-query";
import type { Transaction } from "../../Types/Transaction";

export interface CreateRuleModalProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export default function CreateRuleModal({
  open,
  onClose,
  transaction,
}: CreateRuleModalProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const categories = useStore((state) => state.categories);

  const [name, setName] = useState(
    transaction.merchantName ? transaction.merchantName : transaction.name,
  );
  const [category, setCategory] = useState(transaction.category?.name ?? "");
  const [subcategory, setSubcategory] = useState(
    transaction.subCategory?.name ?? "",
  );
  const [hasAmount, setHasAmount] = useState(false);
  const [amount, setAmount] = useState(0);
  const subcategories = categories.find(
    (c) => c.name === category,
  )?.subCategories;

  const selectStyle = {
    padding: "6px 8px",
    borderRadius: "100px",
    outlineColor: theme.palette.primary.main,
  };
  const labelStyle = { fontSize: "1rem", fontWeight: "300" };

  async function handleAddRule() {
    if (name == "" || category == "") return;

    const categoryId = categories.find((c) => c.name === category)?.id;
    const subCategoryId = subcategories?.find(
      (c) => c.name === subcategory,
    )?.id;
    if (!categoryId || !subCategoryId) return;

    await addCategoryRule(
      name,
      categoryId,
      subCategoryId,
      amount > 0 ? amount : null,
    );
    queryClient.invalidateQueries({
      queryKey: ["categoryRules", "transactions"],
    });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Parcel
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "30px",
              height: "30px",
              position: "absolute",
              top: 34,
              right: 20,
            }}
          >
            X
          </button>
          <h2 style={{ fontWeight: "300" }}>Create Rule</h2>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <label style={labelStyle}>Rule Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <label style={labelStyle} htmlFor="categories">
              Category
            </label>
            <select
              style={selectStyle}
              id="categories"
              name="categories"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">None</option>
              {categories.map((category) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </select>
          </Box>
          {subcategories && subcategories.length > 0 && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <label style={labelStyle} htmlFor="subcategories">
                Subcategory
              </label>
              <select
                onChange={(e) => setSubcategory(e.target.value)}
                style={selectStyle}
                id="subcategories"
                name="subcategories"
              >
                <option value="">None</option>
                {subcategories.map((s) => (
                  <option value={s.name}>{s.name}</option>
                ))}
              </select>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <label style={labelStyle}>Amount?</label>
            <input
              style={{
                width: "fit-content",
                height: "fit-content",
              }}
              type="checkbox"
              onChange={() => setHasAmount((curr) => !curr)}
            />
          </Box>
          {hasAmount && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "100%",
              }}
            >
              <label style={labelStyle}>Amount</label>
              <input
                onChange={(e) =>
                  setAmount(parseFloat(parseFloat(e.target.value).toFixed(2)))
                }
                value={amount}
                type="number"
                step="0.01"
                min="0"
                max="10"
              />
            </Box>
          )}
          <button disabled={!name || !category} onClick={handleAddRule}>
            Add and Run Rule
          </button>
        </Parcel>
      </Box>
    </Modal>
  );
}
