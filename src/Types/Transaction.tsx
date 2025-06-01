export type Transaction = {
  id: number;
  amount: number;
  category: Category;
  subCategory?: SubCategory;
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
