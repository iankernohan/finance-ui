import {
  Alert as MuiAlert,
  Dialog,
  Button,
  AlertTitle,
  Typography,
  Box,
} from "@mui/material";

interface AlertProps {
  open: boolean;
  confirm: () => void;
  deny: () => void;
  title: string;
  caption: string;
}

export default function Alert({
  open,
  confirm,
  deny,
  title,
  caption,
}: AlertProps) {
  return (
    <Dialog open={open} onClose={deny}>
      <MuiAlert severity="info">
        <AlertTitle>{title}</AlertTitle>
        <Typography>{caption}</Typography>
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            marginTop: "1rem",
          }}
        >
          <Button variant="contained" color="secondary" onClick={deny}>
            No
          </Button>
          <Button variant="outlined" color="secondary" onClick={confirm}>
            Yes
          </Button>
        </Box>
      </MuiAlert>
    </Dialog>
  );
}
