import type { CategoryRules } from "../../Types/PlaidTransactions";
import { summon } from "./utils";

const base = import.meta.env.VITE_API_BASE_URL;

export async function getCategoryRules(): Promise<CategoryRules[]> {
  const rules = await summon(`${base}/CategoryRules/GetCategoryRules`);
  const data = await rules.json();
  return data;
}

export async function updateCategoryRule(
  id: number,
  name: string,
  categoryId: number,
  subCategoryId?: number,
) {
  const rule = await summon(`${base}/CategoryRules/UpdateCategoryRule`, {
    body: JSON.stringify({ id, name, categoryId, subCategoryId }),
  });
  const data = await rule.json();
  return data;
}

export async function addCategoryRule(
  name: string,
  categoryId: number,
  amount: number | null,
) {
  await summon(`${base}/CategoryRules/AddCategoryRule`, {
    body: JSON.stringify({ name, categoryId, amount }),
  });
  return;
}
