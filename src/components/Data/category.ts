import { summon } from "./utils";

const base = import.meta.env.VITE_BASE;

export async function getCategories() {
  const res = await summon(`${base}/Category/GetAllCategories`);
  const data = await res.json();
  return data;
}

export async function addCategory(name: string, transactionType: number) {
  const res = await summon(`${base}/Category/AddCategory`, {
    body: JSON.stringify({ name, transactionType }),
  });
  const data = await res.json();
  return data;
}

export async function updateCategory(
  id: number,
  name: string,
  transactionType: number,
) {
  const res = await summon(`${base}/Category/UpdateCategory`, {
    body: JSON.stringify({ id, name, transactionType }),
  });
  const data = await res.json();
  return data;
}

export async function addSubCategory(name: string, categoryId: number) {
  const res = await summon(`${base}/Category/AddSubCategory`, {
    body: JSON.stringify({ name, categoryId }),
  });
  return res;
}

export async function updateSubCategory(
  id: number,
  name: string,
  categoryId: number,
) {
  const res = await summon(`${base}/Category/UpdateSubCategory`, {
    body: JSON.stringify({ id, name, categoryId }),
  });
  const data = await res.json();
  return data;
}

export async function deleteSubCategory(subCategoryId: number) {
  const res = await summon(`${base}/Category/DeleteSubCategory`, {
    body: JSON.stringify(subCategoryId),
  });
  return res;
}
