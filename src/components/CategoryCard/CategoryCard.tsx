import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/helpers";

type CategoryCardProps = {
  categoryId: number;
  title: string;
  amount: number;
  color: string;
  icon: React.ReactNode;
  budgetLimit?: number;
};

export default function CategoryCard({
  categoryId,
  title,
  amount,
  color,
  icon,
  budgetLimit,
}: CategoryCardProps) {
  const theme = useTheme();

  const navigate = useNavigate();

  const budgetColor = budgetLimit
    ? {
        color:
          amount > budgetLimit
            ? theme.palette.error.main
            : theme.palette.success.main,
      }
    : {};

  return (
    <Box
      onClick={() => navigate(`/addTransaction/${categoryId}`)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        minWidth: "150px",
        minHeight: "150px",
        borderRadius: "10px",
        background: color,
        boxShadow: theme.shadows[5],
      }}
    >
      <p style={{ fontSize: "1.25rem" }}>{title}</p>
      {icon}
      {budgetLimit && (
        <p style={{ ...budgetColor }}>Limit: {formatMoney(budgetLimit)}</p>
      )}
      <h2 style={{ fontWeight: "600" }}>{formatMoney(amount)}</h2>
    </Box>
  );
}
