export interface TransactionCategory {
  primary?: string | null;
  detailed?: string | null;
  confidenceLevel?: string | null;
}

export interface Category {
  id: number;
  name: string;
  subCategories?: unknown[];
  transactionType?: number;
}
export interface PlaidTransactionLocation {
  address?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country?: string | null;
}

export interface Transaction {
  id: string;
  name: string;
  currencyCode?: string | null;
  merchantName?: string;
  accountId?: string;
  amount: number;
  date: string;
  location?: PlaidTransactionLocation | null;
  transactionType?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  plaidCategory?: TransactionCategory | null;
  categoryIconUrl?: string | null;
  merchantEntityId?: string | null;
  categoryId?: number | null;
  category?: Category | null;
}

export type DataSet = {
  month: string;
  expenses: number;
  income: number;
  count: number;
};

export type Filters = {
  startDate?: Date;
  endDate?: Date;
  numberOfMonths?: number;
  category?: string[];
  subCategory?: string[];
  minAmount?: number;
  maxAmount?: number;
  transactionType?: "Income" | "Expense";
  description?: string;
};

export type Transaction_Old = {
  id: number;
  amount: number;
  description: string;
  category: Category_Old;
  isRecurring?: boolean;
  subCategory?: SubCategory;
  dateCreated: Date;
};

export type Category_Old = {
  id: number;
  name: string;
  subCategories?: SubCategory[];
  transactionType: "Expense" | "Income";
};

export type SubCategory = {
  id: number;
  name: string;
  categoryId: number;
};

export type Budget = {
  id: number;
  limit: number;
  category: Category_Old;
};

export type RecurringTransaction = {
  id?: number;
  amount: number;
  startDate: Date;
  endDate?: Date | null;
  dateCreated?: Date;
  description?: string;
  intervalDays: number;
  categoryId: number;
  subCategoryId?: number | null;
};
