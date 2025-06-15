import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { amountColor, formatMoney, getLittleGuy } from "../../utils/helpers";
import { useStore } from "../../store/store";

interface TotalAmountProps {
  difference: number;
}

export default function TotalAmount({ difference }: TotalAmountProps) {
  const theme = useTheme();
  const loading = useStore((state) => state.loading);

  let message: string;
  if (difference > 0) {
    message = "Way to go!";
  } else if (difference < 0) {
    message = "Maybe spend less next month?";
  } else {
    message = "You are breaking even, maybe save some money?";
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        marginTop: "0.5rem",
      }}
    >
      {loading ? (
        <Skeleton width={200} height={70} sx={{ transform: "none" }} />
      ) : (
        <Typography
          color={amountColor(difference, theme)}
          variant="h2"
          style={{ marginTop: "2rem 0" }}
        >
          {formatMoney(difference)}
        </Typography>
      )}
      <Box
        sx={{ width: "90%", display: "flex", gap: "2rem", alignItems: "end" }}
      >
        {!loading && (
          <>
            <img
              style={{ width: "80px", height: "80px" }}
              src={`./${getLittleGuy(difference)}`}
            />
            <Typography
              sx={{
                display: "grid",
                placeItems: "center",
                padding: "1rem 0.5rem",
                background: theme.palette.background.paper,
                textAlign: "center",
                borderRadius: "10px",
                width: "200px",
                height: "100px",
                position: "relative",
              }}
            >
              <span style={{ position: "relative", zIndex: 20 }}>
                {message}
              </span>
              <span
                style={{
                  position: "absolute",
                  zIndex: 10,
                  left: "-25px",
                  top: "20px",
                  width: 0,
                  height: 0,
                  borderLeft: " 30px solid transparent",
                  borderRight: "30px solid transparent",
                  borderBottom: `20px solid ${theme.palette.background.paper}`,
                  borderRadius: "50% 50% 0 0",
                }}
              ></span>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
