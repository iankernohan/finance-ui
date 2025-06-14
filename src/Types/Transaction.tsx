export type Transaction = {
  id: number;
  amount: number;
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
