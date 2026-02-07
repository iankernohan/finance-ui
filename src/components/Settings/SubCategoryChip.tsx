import { Chip } from "@mui/material";
import type { SubCategory } from "../../Types/Transaction";
import { useState } from "react";
import Alert from "../History/Alert";
import { deleteSubCategory } from "../Data/category";
import { useQueryClient } from "@tanstack/react-query";

export default function SubCategoryChip({
  subCategory,
}: {
  subCategory: SubCategory;
}) {
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);

  async function handleDelete() {
    await deleteSubCategory(subCategory.id);
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    setRemove(false);
    setEdit(false);
  }

  return (
    <>
      <Chip
        onClick={() => setEdit((curr) => !curr)}
        label={subCategory.name}
        onDelete={edit ? () => setRemove(true) : undefined}
      />
      <Alert
        open={remove}
        caption={`Are you sure you want to delete ${subCategory.name}?`}
        title="This action in permanent."
        confirm={handleDelete}
        deny={() => {
          setRemove(false);
          setEdit(false);
        }}
      />
    </>
  );
}
