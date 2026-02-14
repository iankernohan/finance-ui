import { create } from "zustand";
import type {
  Budget,
  Category,
  MonthlySummary,
  RecurringTransaction,
  Transaction,
} from "../Types/Transaction";
import type { SettingOption } from "../Types/Settings";
import type { User } from "@supabase/supabase-js";

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
  updateBudget: (budget: Budget) => void;
  recurringTransactions: RecurringTransaction[];
  setRecurringTransactions: (
    RecurringTransactions: RecurringTransaction[],
  ) => void;
  profileOptions: SettingOption[];
  loading: boolean;
  setLoading: (val: boolean) => void;
  incomeIds: number[];
  uncategorizedTransactions: Transaction[];
  setUncategorizedTransactions: (transactions: Transaction[]) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  monthlySummaries: MonthlySummary[];
  setMonthlySummaries: (summary: MonthlySummary) => void;
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
        t.id === transaction.id ? transaction : t,
      ),
    })),
  setCategories: (categories: Category[]) => set({ categories }),
  budgets: [],
  setBudgets: (budgets: Budget[]) => set({ budgets }),
  updateBudget: (budget: Budget) =>
    set((state) => ({
      budgets: state.budgets.map((b) => (b.id === budget.id ? budget : b)),
    })),
  recurringTransactions: [],
  setRecurringTransactions: (recurringTransactions) =>
    set({ recurringTransactions }),
  profileOptions: [
    { name: "Settings", path: "settings" },
    { name: "Category Rules", path: "categoryRules" },
    {
      name: "Recurring Transactions",
      path: "recurring-transactions",
    },
    { name: "Statistics", path: "statistics" },
    { name: "Categories", path: "categories" },
  ],
  loading: false,
  setLoading: (val) => set({ loading: val }),
  incomeIds: [6, 7],
  uncategorizedTransactions: [],
  setUncategorizedTransactions: (transactions: Transaction[]) =>
    set({ uncategorizedTransactions: transactions }),
  user: null,
  setUser: (user) => set({ user }),
  monthlySummaries: [],
  setMonthlySummaries: (summary: MonthlySummary) =>
    set((state) => {
      if (
        state.monthlySummaries.find((s) => s.monthName === summary.monthName)
      ) {
        return {};
      }
      return {
        monthlySummaries: [...state.monthlySummaries, summary],
      };
    }),
}));
