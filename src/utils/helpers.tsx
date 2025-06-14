import type { Theme } from "@mui/material";
import type { JSX } from "react";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import AddCardIcon from "@mui/icons-material/AddCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

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
  withMoney?: "sm" | "md" | "lg"
) {
  if (withMoney) {
    switch (withMoney) {
      case "sm":
        return "little-guy-little-money.png";
      case "md":
        return "little-guy-money.png";
      case "lg":
        return "little-guy-big-money.png";
      default:
        return "little-guy-money.png";
    }
  }

  if (amount > 0) return "happy-little-guy.png";
  if (amount < 0) return "sad-little-guy.png";
  return "little-guy.png";
}

export const iconMap: Record<string, JSX.Element> = {
  Bills: <ReceiptIcon />,
  Transportation: <CarRepairIcon />,
  Pleasure: <EmojiEmotionsIcon />,
  Food: <RestaurantMenuIcon />,
  Shopping: <ShoppingCartIcon />,
  Salary: <AddCardIcon />,
  Investment: <ShowChartIcon />,
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
