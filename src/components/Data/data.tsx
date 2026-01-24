import type {
  Budget,
  RecurringTransaction,
  Transaction,
} from "../../Types/Transaction";
import { supabase } from "./supabase";

// const base = "https://finance-api-0eu8.onrender.com";
const base = "http://localhost:5028";

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
  },
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

export async function updateBudget(id: number, limit: number) {
  const res = await fetch(`${base}/UpdateBudget`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, limit }),
  });
  if (!res.ok) {
    return null;
  }
  console.log(res);
  const result: Budget = await res.json();
  return result;
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

export async function getRecurringTransactions() {
  const res = await fetch(`${base}/GetAllRecurringTransactions`);
  const data = await res.json();
  return data;
}

export async function deleteRecurringTransaction(id: number) {
  const res = await fetch(`${base}/DeleteRecurringTransaction/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return null;
  }
  const result: RecurringTransaction = await res.json();
  return result;
}

export async function updateRecurringTransaction(
  id: number,
  transaction: RecurringTransaction,
) {
  const res = await fetch(`${base}/UpdateRecurringTransaction/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) {
    return null;
  }
  const result: RecurringTransaction = await res.json();
  return result;
}

// --------------------------------------PLAID---------------------------------------- //

export async function exchangePublicToken(
  public_token: string,
  userId: string,
) {
  await fetch(`${base}/plaid/exchange_public_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicToken: public_token, userId }),
  });
}

export async function fetchToken(userId: string) {
  const res = await fetch(`${base}/plaid/create_link_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data.link_token;
}

export async function getBankTransactions(userId: string) {
  const res = await fetch(`${base}/plaid/transactions/${userId}`, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getCategorizedTransactions({
  userId,
  page = 1,
  pageSize = 20,
}: {
  userId: string;
  page?: number;
  pageSize?: number;
}) {
  const transactions = await fetch(`${base}/plaid/categorizedTransactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, page, pageSize }),
  });
  const data = await transactions.json();
  return data;
}

export async function getTransactionsByCategory(categoryNames?: string[]) {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  const res = await fetch(`${base}/plaid/TransactionsByCategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ categoryNames }),
  });
  const data = await res.json();
  return data;
}

// --------------------------------------PLAID---------------------------------------- //
