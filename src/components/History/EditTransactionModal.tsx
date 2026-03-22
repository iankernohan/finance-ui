import { Box, Modal, useTheme } from "@mui/material";
import Parcel from "../UI/Parcel";
import { useStore } from "../../store/store";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Transaction } from "../../Types/Transaction";
import { updateTransaction } from "../Data/transactions";

export interface CreateRuleModalProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export default function EditTransactionModal({
  open,
  onClose,
  transaction,
}: CreateRuleModalProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const categories = useStore((state) => state.categories);

  const [category, setCategory] = useState(transaction.category?.name ?? "");
  const [subcategory, setSubcategory] = useState(
    transaction.subCategory?.name ?? "",
  );
  const subcategories = categories.find(
    (c) => c.name === category,
  )?.subCategories;

  const selectStyle = {
    padding: "6px 8px",
    borderRadius: "100px",
    outlineColor: theme.palette.primary.main,
  };
  const labelStyle = { fontSize: "1rem", fontWeight: "300" };

  async function handleUpdateTransaction() {
    if (
      category === transaction.category?.name &&
      subcategory === transaction.subCategory?.name
    )
      return;

    const categoryId = categories.find((c) => c.name === category)?.id;
    const subCategoryId = subcategories?.find(
      (c) => c.name === subcategory,
    )?.id;

    await updateTransaction({
      id: transaction.id,
      categoryId,
      subCategoryId,
      currencyCode: null,
      amount: null,
      date: null,
      name: null,
      accountId: null,
      category: null,
      categoryIconUrl: null,
      location: null,
      logoUrl: null,
      merchantEntityId: null,
      merchantName: null,
      plaidCategory: null,
      subCategory: null,
      transactionType: null,
      website: null,
    });

    queryClient.invalidateQueries({
      queryKey: ["transactions"],
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
          <h2 style={{ fontWeight: "300" }}>Edit Transaction</h2>
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
              {categories.map((c) => (
                <option value={c.name} selected={category === c.name}>
                  {c.name}
                </option>
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
                  <option value={s.name} selected={subcategory === s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Box>
          )}
          <button
            disabled={
              category === transaction.category?.name &&
              subcategory === transaction.subCategory?.name
            }
            onClick={handleUpdateTransaction}
          >
            Update
          </button>
        </Parcel>
      </Box>
    </Modal>
  );
}
