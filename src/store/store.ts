import { create } from "zustand";
import type {
  Budget,
  Category,
  RecurringTransaction,
  Transaction,
} from "../Types/Transaction";
import type { SettingOption } from "../Types/Settings";

type Store = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  recurringTransactions: RecurringTransaction[];
  setRecurringTransactions: (
    RecurringTransactions: RecurringTransaction[]
  ) => void;
  profileOptions: SettingOption[];
  loading: boolean;
  setLoading: (val: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  transactions: [],
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  categories: [],
  updateTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    })),
  setCategories: (categories: Category[]) => set({ categories }),
  budgets: [],
  setBudgets: (budgets: Budget[]) => set({ budgets }),
  recurringTransactions: [],
  setRecurringTransactions: (recurringTransactions) =>
    set({ recurringTransactions }),
  profileOptions: [
    { name: "Settings", path: "settings" },
    {
      name: "Recurring Transactions",
      path: "recurring-transactions",
    },
    { name: "Statistics", path: "statistics" },
  ],
  loading: false,
  setLoading: (val) => set({ loading: val }),
}));
