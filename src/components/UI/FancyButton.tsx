import { Button, type SxProps, type Theme } from "@mui/material";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "success";

interface FancyButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  sx?: SxProps<Theme>;
}

const getVariantStyles = (variant: ButtonVariant): SxProps<Theme> => {
  const baseStyles: SxProps<Theme> = {
    padding: "0.75rem 1.5rem",
    backdropFilter: "blur(10px)",
    borderRadius: "100px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid",
    "&:active": {
      transform: "translateY(0)",
    },
  };

  const variants: Record<ButtonVariant, SxProps<Theme>> = {
    primary: {
      ...baseStyles,
      background:
        "linear-gradient(135deg, rgba(0, 173, 181, 0.15) 0%, rgba(0, 173, 181, 0.05) 100%)",
      borderColor: "rgba(0, 173, 181, 0.2)",
      color: "#00ADB5",
      "&:hover": {
        background:
          "linear-gradient(135deg, rgba(0, 173, 181, 0.25) 0%, rgba(0, 173, 181, 0.1) 100%)",
        borderColor: "rgba(0, 173, 181, 0.4)",
        boxShadow: "0 8px 16px rgba(0, 173, 181, 0.2)",
        transform: "translateY(-2px)",
      },
    },
    secondary: {
      ...baseStyles,
      background:
        "linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.05) 100%)",
      borderColor: "rgba(96, 165, 250, 0.2)",
      color: "#60A5FA",
      "&:hover": {
        background:
          "linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(96, 165, 250, 0.1) 100%)",
        borderColor: "rgba(96, 165, 250, 0.4)",
        boxShadow: "0 8px 16px rgba(96, 165, 250, 0.2)",
        transform: "translateY(-2px)",
      },
    },
    outline: {
      ...baseStyles,
      background: "transparent",
      borderColor: "rgba(255, 255, 255, 0.2)",
      color: "#EDE9FE",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.4)",
        boxShadow: "0 8px 16px rgba(255, 255, 255, 0.1)",
        transform: "translateY(-2px)",
      },
    },
    danger: {
      ...baseStyles,
      background:
        "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)",
      borderColor: "rgba(239, 68, 68, 0.2)",
      color: "#EF4444",
      "&:hover": {
        background:
          "linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.1) 100%)",
        borderColor: "rgba(239, 68, 68, 0.4)",
        boxShadow: "0 8px 16px rgba(239, 68, 68, 0.2)",
        transform: "translateY(-2px)",
      },
    },
    success: {
      ...baseStyles,
      background:
        "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)",
      borderColor: "rgba(34, 197, 94, 0.2)",
      color: "#22C55E",
      "&:hover": {
        background:
          "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0.1) 100%)",
        borderColor: "rgba(34, 197, 94, 0.4)",
        boxShadow: "0 8px 16px rgba(34, 197, 94, 0.2)",
        transform: "translateY(-2px)",
      },
    },
  };

  return variants[variant];
};

export default function FancyButton({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
  sx,
}: FancyButtonProps) {
  const variantStyles = getVariantStyles(variant);

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{
        ...variantStyles,
        ...(disabled && {
          opacity: 0.5,
          cursor: "not-allowed",
          "&:hover": {
            transform: "none",
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
