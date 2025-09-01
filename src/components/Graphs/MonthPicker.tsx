import { Box, Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getMonth } from "../../utils/helpers";

type MonthPicketProps = {
  month: number;
  year: number;
  increment: () => void;
  decrement: () => void;
  disableDecrement?: boolean;
};

export default function MonthPicker({
  month,
  year,
  increment,
  decrement,
  disableDecrement,
}: MonthPicketProps) {
  const disableIncrement =
    month === new Date().getMonth() && year === new Date().getFullYear();

  return (
    <Box
      sx={{
        width: "300px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
      }}
    >
      <Button disabled={disableDecrement} onClick={decrement}>
        <KeyboardArrowLeftIcon />
      </Button>
      <Box sx={{ textAlign: "center" }}>
        {getMonth(month)}, {year}
      </Box>
      <Button disabled={disableIncrement} onClick={increment}>
        <KeyboardArrowRightIcon />
      </Button>
    </Box>
  );
}
