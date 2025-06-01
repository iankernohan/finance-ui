import { create } from "zustand";
import type { Transaction } from "../Types/Transaction";

type Store = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transactions: Transaction) => void;
};

export const useStore = create<Store>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  transactions: [],
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
}));
