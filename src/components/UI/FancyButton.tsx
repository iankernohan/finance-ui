import type { ReactNode, CSSProperties } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "success";

interface FancyButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

const getVariantStyles = (
  variant: ButtonVariant,
  disabled: boolean,
): CSSProperties => {
  const baseStyles: CSSProperties = {
    padding: "0.75rem 1.5rem",
    backdropFilter: "blur(10px)",
    borderRadius: "100px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    border: "1px solid",
    opacity: disabled ? 0.5 : 1,
    outline: "none",
  };

  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: {
      ...baseStyles,
      background:
        "linear-gradient(135deg, rgba(0, 173, 181, 0.15) 0%, rgba(0, 173, 181, 0.05) 100%)",
      borderColor: "rgba(0, 173, 181, 0.2)",
      color: "#00ADB5",
    },
    secondary: {
      ...baseStyles,
      background:
        "linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.05) 100%)",
      borderColor: "rgba(96, 165, 250, 0.2)",
      color: "#60A5FA",
    },
    outline: {
      ...baseStyles,
      background: "transparent",
      borderColor: "rgba(255, 255, 255, 0.2)",
      color: "#EDE9FE",
    },
    danger: {
      ...baseStyles,
      background:
        "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)",
      borderColor: "rgba(239, 68, 68, 0.2)",
      color: "#EF4444",
    },
    success: {
      ...baseStyles,
      background:
        "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)",
      borderColor: "rgba(34, 197, 94, 0.2)",
      color: "#22C55E",
    },
  };

  return variants[variant];
};

const getHoverStyles = (variant: ButtonVariant): CSSProperties => {
  const hoverStyles: Record<ButtonVariant, CSSProperties> = {
    primary: {
      background:
        "linear-gradient(135deg, rgba(0, 173, 181, 0.25) 0%, rgba(0, 173, 181, 0.1) 100%)",
      borderColor: "rgba(0, 173, 181, 0.4)",
      boxShadow: "0 8px 16px rgba(0, 173, 181, 0.2)",
      transform: "translateY(-2px)",
    },
    secondary: {
      background:
        "linear-gradient(135deg, rgba(96, 165, 250, 0.25) 0%, rgba(96, 165, 250, 0.1) 100%)",
      borderColor: "rgba(96, 165, 250, 0.4)",
      boxShadow: "0 8px 16px rgba(96, 165, 250, 0.2)",
      transform: "translateY(-2px)",
    },
    outline: {
      background: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.4)",
      boxShadow: "0 8px 16px rgba(255, 255, 255, 0.1)",
      transform: "translateY(-2px)",
    },
    danger: {
      background:
        "linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.1) 100%)",
      borderColor: "rgba(239, 68, 68, 0.4)",
      boxShadow: "0 8px 16px rgba(239, 68, 68, 0.2)",
      transform: "translateY(-2px)",
    },
    success: {
      background:
        "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0.1) 100%)",
      borderColor: "rgba(34, 197, 94, 0.4)",
      boxShadow: "0 8px 16px rgba(34, 197, 94, 0.2)",
      transform: "translateY(-2px)",
    },
  };

  return hoverStyles[variant];
};

export default function FancyButton({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
}: FancyButtonProps) {
  const variantStyles = getVariantStyles(variant, disabled);
  const hoverStyles = getHoverStyles(variant);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variantStyles,
        width: fullWidth ? "100%" : "auto",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        const baseStyles = getVariantStyles(variant, disabled);
        Object.assign(e.currentTarget.style, baseStyles);
        e.currentTarget.style.width = fullWidth ? "100%" : "auto";
      }}
    >
      {children}
    </button>
  );
}
