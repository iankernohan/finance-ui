export type Transaction = {
  id: number;
  amount: number;
  description: string;
  category: Category;
  subCategory?: SubCategory;
  dateCreated: Date;
};

export type Category = {
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

export type DataSet = {
  month: string;
  expenses: number;
  income: number;
  count: number;
};
