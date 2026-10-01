type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: React.CSSProperties;
}

const badgeStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: "var(--color-bg-alt)",
    color: "var(--color-text-secondary)",
  },
  success: {
    background: "var(--color-success-light)",
    color: "var(--color-success)",
  },
  warning: {
    background: "var(--color-warning-light)",
    color: "var(--color-warning)",
  },
  danger: {
    background: "var(--color-danger-light)",
    color: "var(--color-danger)",
  },
  info: {
    background: "var(--color-info-light)",
    color: "var(--color-info)",
  },
};

export function Badge({ children, variant = "default", style }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: "var(--radius-sm)",
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...badgeStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
