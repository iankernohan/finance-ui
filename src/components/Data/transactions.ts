import type {
  Filters,
  MonthlySummary,
  Transaction,
} from "../../Types/Transaction";
import { summon } from "./utils";
import * as fs from "fs";
import * as path from "path";

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

  const filePath = path.join(__dirname, "seed.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

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

export async function getMonthlySummary(
  month: number,
  year: number,
): Promise<MonthlySummary> {
  const res = await summon(`${base}/Transactions/MonthlySummary`, {
    body: JSON.stringify({ month, year }),
  });
  const data = await res.json();
  return data;
}
