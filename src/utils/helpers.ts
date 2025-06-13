import type { Theme } from "@mui/material";

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

export function getLittleGuy(amount: number = 0) {
  if (amount > 0) return "happy-little-guy.png";
  if (amount < 0) return "sad-little-guy.png";
  return "little-guy.png";
}
