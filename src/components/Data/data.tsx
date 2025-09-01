import type {
  RecurringTransaction,
  Transaction,
} from "../../Types/Transaction";

const base = "https://finance-api-0eu8.onrender.com";

export async function getTransactions() {
  const res = await fetch(`${base}/getTransactions`);
  const data = await res.json();
  return data;
}

export async function getCategories() {
  const res = await fetch(`${base}/getAllCategories`);
  const data = await res.json();
  return data;
}

export async function addTransaction(data: {
  amount: number;
  description: string;
  categoryId: number;
  subCategoryId: number | null;
}) {
  const res = await fetch(`${base}/addTransaction`, {
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
  const res = await fetch(`${base}/updateTransaction/${id}`, {
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

export async function deleteTransaction(id: number) {
  const res = await fetch(`${base}/DeleteTransaction/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return null;
  }
  const result: Transaction = await res.json();
  return result;
}

export async function getBudgets() {
  const res = await fetch(`${base}/GetAllBudgets`);
  const data = await res.json();
  return data;
}

export async function addRecurringTransaction(data: RecurringTransaction) {
  const res = await fetch(`${base}/AddRecurringTransaction`, {
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
