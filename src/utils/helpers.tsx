import type { Theme } from "@mui/material";
import type { JSX } from "react";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import AddCardIcon from "@mui/icons-material/AddCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PetsIcon from "@mui/icons-material/Pets";
import EngineeringIcon from "@mui/icons-material/Engineering";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type {
  DataSet,
  Filters,
  Transaction,
  Transaction_Old,
} from "../Types/Transaction";
import HappyLittleGuy from "../assets/happy-little-guy2.png";
import LittleGuyBigMoney from "../assets/little-guy-big-money.png";
import LittleGuyLittleMoney from "../assets/little-guy-little-money.png";
import LittleGuyMoney from "../assets/little-guy-money.png";
import LittleGuy from "../assets/little-guy.png";
import SadLittleGuy from "../assets/sad-little-guy.png";

export function amountColor(amount: number, theme: Theme) {
  if (amount === 0) return theme.palette.grey[700];
  return amount > 0 ? theme.palette.success.main : theme.palette.error.main;
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getLittleGuy(
  amount: number = 0,
  withMoney?: "sm" | "md" | "lg",
) {
  if (withMoney) {
    switch (withMoney) {
      case "sm":
        return LittleGuyLittleMoney;
      case "md":
        return LittleGuyMoney;
      case "lg":
        return LittleGuyBigMoney;
      default:
        return LittleGuyMoney;
    }
  }

  if (amount > 0) return HappyLittleGuy;
  if (amount < 0) return SadLittleGuy;
  return LittleGuy;
}

export const iconMap: Record<string, JSX.Element> = {
  Bills: <ReceiptIcon color="primary" />,
  Transport: <CarRepairIcon color="primary" />,
  Pleasure: <EmojiEmotionsIcon color="primary" />,
  Food: <RestaurantMenuIcon color="primary" />,
  Shopping: <ShoppingCartIcon color="primary" />,
  Salary: <AddCardIcon color="primary" />,
  Investment: <ShowChartIcon color="primary" />,
  Pets: <PetsIcon color="primary" />,
  Healthcare: <FavoriteIcon color="primary" />,
  Unknown: <EngineeringIcon color="primary" />,
};

export function getDay(day: number) {
  if (day === 0) return "Sunday";
  if (day === 1) return "Monday";
  if (day === 2) return "Tuesday";
  if (day === 3) return "Wednesday";
  if (day === 4) return "Thursday";
  if (day === 5) return "Friday";
  if (day === 6) return "Saturday";
  return "Unknown";
}

export function getMonth(month: number) {
  if (month === 1) return "January";
  if (month === 2) return "February";
  if (month === 3) return "March";
  if (month === 4) return "April";
  if (month === 5) return "May";
  if (month === 6) return "June";
  if (month === 7) return "July";
  if (month === 8) return "August";
  if (month === 8) return "September";
  if (month === 10) return "October";
  if (month === 11) return "November";
  if (month === 12) return "December";
  return "Unknown";
}

export function getSuffix(day: number) {
  const j = day % 10;
  const k = day % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}

export const defaultTransaction: Transaction = {
  amount: 0,
  name: "default",
  category: {
    id: 0,
    name: "",
    transactionType: 0,
    subCategories: [],
  },
  date: new Date().toDateString(),
  id: "0",
};

export function getTransactionsForMonth(
  transactions: Transaction_Old[],
  month: number,
  year: number = 2025,
): Transaction_Old[] {
  return transactions.filter((t) => {
    const date = new Date(t.dateCreated);
    return date.getFullYear() === year && date.getMonth() === month;
  });
}

export function getTotalForMonth(
  transactions: Transaction_Old[],
  month: number,
  year: number = 2025,
) {
  const monthlyTransactions = getTransactionsForMonth(
    transactions,
    month,
    year,
  );
  return monthlyTransactions.reduce((sum, t) => {
    if (t.category.transactionType === "Expense") return sum - t.amount;
    else return sum + t.amount;
  }, 0);
}

export function getMontlyTotalsForYear(
  transactions: Transaction_Old[],
  year: number,
) {
  const totals = [];
  for (let i = 0; i < 12; i++) {
    const total = getTotalForMonth(transactions, i, year);
    totals.push(total);
  }
  return totals;
}

export function getStatsForMonth(
  transactions: Transaction_Old[],
  month: number = new Date().getMonth(),
  year: number = new Date().getFullYear(),
) {
  const stats = {
    expenses: 0,
    income: 0,
    expensesCount: 0,
    incomeCount: 0,
  };
  for (const t of transactions) {
    const date = new Date(t.dateCreated);
    if (date.getFullYear() === year && date.getMonth() === month) {
      if (t.category.transactionType === "Expense") {
        stats.expenses += t.amount;
        stats.expensesCount += 1;
      } else {
        stats.income += t.amount;
        stats.incomeCount += 1;
      }
    }
  }
  return stats;
}

export function getMonthlyStatsForYear(
  transactions: Transaction_Old[],
  year: number = new Date().getFullYear(),
) {
  const yearlyStats: DataSet[] = [
    {
      month: "Jan",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "Feb",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "Mar",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "Apr",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "May",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "June",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "July",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "Aug",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "Sept",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "Oct",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "Nov",
      expenses: 0,
      income: 0,
      count: 0,
    },
    {
      month: "Dec",
      expenses: 0,
      income: 0,
      count: 0,
    },
  ];
  function updateMonth(index: number, transaction: Transaction_Old) {
    yearlyStats[index].count += 1;
    if (transaction.category.transactionType == "Expense") {
      yearlyStats[index].expenses += transaction.amount;
    } else {
      yearlyStats[index].income += transaction.amount;
    }
  }
  for (const t of transactions) {
    const date = new Date(t.dateCreated);
    if (date.getFullYear() === year) {
      updateMonth(date.getMonth(), t);
    }
  }
  return yearlyStats;
}

export function getOldestTransaction(transactions: Transaction_Old[]) {
  let oldest = transactions[0];
  let oldestDate = new Date();
  for (const t of transactions) {
    const tDate = new Date(t.dateCreated);
    if (tDate < oldestDate) {
      oldest = t;
      oldestDate = tDate;
    }
  }
  return oldest;
}

export function getAllTimeStats(transactions: Transaction_Old[]) {
  const stats = {
    income: 0,
    expenses: 0,
    incomeCount: 0,
    expenseCount: 0,
  };

  for (const t of transactions) {
    if (t.category.transactionType === "Expense") {
      stats.expenses += t.amount;
      stats.expenseCount += 1;
    } else {
      stats.income += t.amount;
      stats.incomeCount += 1;
    }
  }

  return stats;
}

export function filterTransactions(
  transactions: Transaction_Old[],
  conditions: Filters,
): Transaction_Old[] {
  return transactions.filter((t) => {
    const {
      category,
      description,
      endDate,
      maxAmount,
      minAmount,
      startDate,
      subCategory,
      transactionType,
    } = conditions;
    const date = new Date(t.dateCreated);
    if (category && !category.includes(t.category.name)) return false;
    if (description && !t.description) return false;
    if (
      description &&
      !t.description.toLowerCase().includes(description.toLowerCase())
    )
      return false;
    if (endDate && endDate < date) return false;
    if (maxAmount && maxAmount < t.amount) return false;
    if (minAmount && minAmount > t.amount) return false;
    if (startDate && startDate > date) return false;
    if (
      subCategory &&
      t.subCategory &&
      !subCategory.includes(t.subCategory.name)
    )
      return false;
    if (transactionType && transactionType !== t.category.transactionType)
      return false;
    return true;
  });
}
