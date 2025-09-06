import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

export default function BackButton({
  top = 28,
  left = 0,
  absolute = true,
}: {
  top?: number;
  left?: number;
  absolute?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ position: absolute ? "absolute" : "relative", top, left }}
      onClick={() => navigate(-1)}
    >
      <ArrowBackIcon color="secondary" />
    </Button>
  );
}
