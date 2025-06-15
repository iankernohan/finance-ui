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
  confirmedClose: () => void;
  handleClose: () => void;
}

export default function Alert({
  open,
  confirmedClose,
  handleClose,
}: AlertProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <MuiAlert severity="info">
        <AlertTitle>You have unsaved changes.</AlertTitle>
        <Typography>Are you sure you want to close?</Typography>
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            marginTop: "1rem",
          }}
        >
          <Button variant="contained" color="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="outlined" color="secondary" onClick={confirmedClose}>
            Yes
          </Button>
        </Box>
      </MuiAlert>
    </Dialog>
  );
}
