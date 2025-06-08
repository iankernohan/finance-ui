import { create } from "zustand";
import type { Category, Transaction } from "../Types/Transaction";

type Store = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transactions: Transaction) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const useStore = create<Store>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  transactions: [],
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
}));
