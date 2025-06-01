import { Box, Typography, useTheme } from "@mui/material";
import CategoryCard from "../CategoryCard/CategoryCard";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import AddCardIcon from "@mui/icons-material/AddCard";
import "./home.css";

export default function Home() {
  const theme = useTheme();

  const amount = 2352;

  function amountColor(amount: number) {
    if (amount === 0) return theme.palette.grey[700];
    return amount > 0 ? theme.palette.success.main : theme.palette.error.main;
  }

  function formatMoney(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  return (
    <Box
      className="home"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography color={amountColor(amount)} variant="h2">
        {formatMoney(amount)}
      </Typography>
      <Box sx={{ marginTop: "2rem" }}>
        <Typography textAlign={"center"} variant="h5">
          Expenses
        </Typography>
        <Typography
          textAlign={"center"}
          color={theme.palette.grey[800]}
          variant="h5"
        >
          {formatMoney(468)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <CategoryCard
            title="Food"
            amount={formatMoney(274)}
            color="lightblue"
            icon={<RestaurantMenuIcon />}
          />
          <CategoryCard
            title="Vehicle"
            amount={formatMoney(274)}
            color="hotpink"
            icon={<CarRepairIcon />}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: "3rem" }}>
        <Typography textAlign={"center"} variant="h5">
          Income
        </Typography>
        <Typography
          textAlign={"center"}
          color={theme.palette.grey[800]}
          variant="h5"
        >
          {formatMoney(468)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <CategoryCard
            title="Salary"
            amount={formatMoney(824.46)}
            color="lightgreen"
            icon={<AddCardIcon />}
          />
        </Box>
      </Box>
    </Box>
  );
}
