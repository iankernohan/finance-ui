import type { Filters, Transaction } from "../../Types/Transaction";
import { summon } from "./utils";

const base = import.meta.env.VITE_BASE;

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
