import type { SubCategory } from "./Transaction";

export interface PlaidTransactionLocation {
  address?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country?: string | null;
}

export interface PlaidTransactionCategory {
  primary?: string | null;
  detailed?: string | null;
  confidenceLevel?: string | null;
}

export interface Category {
  id: number;
  name: string;
  subCategories?: unknown[];
  transactionType?: string;
}

export interface PlaidTransaction {
  id: string;
  name: string;
  currencyCode?: string | null;
  merchantName?: string;
  accountId?: string;
  amount: number;
  date?: string | null;
  location?: PlaidTransactionLocation | null;
  transactionType?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  plaidCategory?: PlaidTransactionCategory | null;
  categoryIconUrl?: string | null;
  merchantEntityId?: string | null;
  categoryId?: number | null;
  category?: Category | null;
}

export interface CategoryRules {
  id: number;
  name: string;
  categoryId: number;
  category?: Category | null;
  subCategoryId?: number;
  subCategory?: SubCategory;
}
