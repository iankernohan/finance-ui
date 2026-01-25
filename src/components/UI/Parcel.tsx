import { Box as MuiBox, type SxProps } from "@mui/material";

export default function Parcel({
  children,
  sx,
  className,
}: {
  children: React.ReactNode;
  sx?: SxProps;
  className?: string;
}) {
  return (
    <MuiBox
      sx={{
        padding: "2rem 1rem",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.paper",
        position: "relative",
        ...sx,
      }}
      className={className}
    >
      {children}
    </MuiBox>
  );
}
