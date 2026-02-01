import type { CategoryRules } from "../../Types/PlaidTransactions";
import type {
  Budget,
  Filters,
  RecurringTransaction,
  Transaction,
  Transaction_Old,
} from "../../Types/Transaction";
import { summon } from "./utils";

// const base = "https://finance-api-0eu8.onrender.com";
const base = "http://localhost:5028";

// --------------------------------------PLAID---------------------------------------- //

export async function getPlaidTransactions(userId: string, filters?: Filters) {
  const res = await summon(`${base}/Transactions/Transactions`, {
    body: JSON.stringify({ userId, page: 1, pageSize: 500, filters }),
  });
  const data = await res.json();
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
  const transactions = await summon(
    `${base}/Transactions/CategorizedTransactions`,
    {
      body: JSON.stringify({ userId, page, pageSize }),
    },
  );
  const data = await transactions.json();
  return data;
}

export async function getTransactionsByCategory(categoryNames?: string[]) {
  const res = await summon(`${base}/Transactions/TransactionsByCategory`, {
    body: JSON.stringify({ categoryNames }),
  });

  const data = await res.json();
  return data;
}

export async function getUncategorizedTransactions(userId: string) {
  const transactions = await summon(
    `${base}/Transactions/UncategorizedTransactions`,
    {
      body: JSON.stringify({ userId, page: 1, pageSize: 500 }),
    },
  );
  const data = await transactions.json();
  return data;
}

export async function getCategoryRules(): Promise<CategoryRules[]> {
  const rules = await summon(`${base}/Transactions/GetCategoryRules`);
  const data = await rules.json();
  return data;
}

export async function updateCategoryRule(
  id: number,
  name: string,
  categoryId: number,
) {
  const rule = await summon(`${base}/Transactions/UpdateCategoryRule`, {
    body: JSON.stringify({ id, name, categoryId }),
  });
  const data = await rule.json();
  return data;
}

export async function addCategoryRule(name: string, categoryId: number) {
  await summon(`${base}/Transactions/AddCategoryRule`, {
    body: JSON.stringify({ name, categoryId }),
  });
  return;
}

export async function updateCategory(
  transactionId: string,
  categoryId: number,
): Promise<Transaction> {
  const transactions = await summon(`${base}/Transactions/UpdateCategory`, {
    body: JSON.stringify({ transactionId, categoryId }),
  });
  const data = await transactions.json();
  return data;
}

export async function exchangePublicToken(
  public_token: string,
  userId: string,
) {
  await summon(`${base}/Plaid/ExchangePublicToken`, {
    body: JSON.stringify({ publicToken: public_token, userId }),
  });
}

export async function fetchToken(userId: string) {
  const res = await summon(`${base}/Plaid/CreateLinkToken`, {
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  return data.link_token;
}

// --------------------------------------PLAID---------------------------------------- //

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
  const result: Transaction_Old = await res.json();
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
  const result: Transaction_Old = await res.json();
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
