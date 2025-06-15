import type { Transaction } from "../../Types/Transaction";

export async function getTransactions() {
  const res = await fetch("http://localhost:5028/getTransactions");
  const data = await res.json();
  return data;
}

export async function getCategories() {
  const res = await fetch("http://localhost:5028/getAllCategories");
  const data = await res.json();
  return data;
}

export async function addTransaction(data: {
  amount: number;
  description: string;
  categoryId: number;
  subCategoryId: number | null;
}) {
  const res = await fetch("http://localhost:5028/addTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    return null;
  }
  const result = await res.json();
  return result;
}

export async function updateTransaction(
  id: number,
  transaction: {
    amount: number;
    description: string;
    dateCreated: Date;
    categoryId: number;
    subCategoryId: number | null;
  }
) {
  const res = await fetch(`http://localhost:5028/updateTransaction/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) {
    return null;
  }
  const result: Transaction = await res.json();
  return result;
}
