import { Box, Typography, useTheme } from "@mui/material";

type CategoryCardProps = {
  title: string;
  amount: string | number;
  color: string;
  icon: React.ReactNode;
};

export default function CategoryCard({
  title,
  amount,
  color,
  icon,
}: CategoryCardProps) {
  const theme = useTheme();

  return (
    <Box
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
      <Typography variant="h6">{title}</Typography>
      {icon}
      <Typography sx={{ fontWeight: "600" }} variant="h5">
        {amount}
      </Typography>
    </Box>
  );
}
