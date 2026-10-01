/**
 * Confidence badge per §36:
 * 🟢 High | 🟡 Medium | 🔴 Low
 */

type ConfidenceLevel = "high" | "medium" | "low";

const confidenceConfig: Record<
  ConfidenceLevel,
  { emoji: string; label: string; color: string; bg: string }
> = {
  high: {
    emoji: "🟢",
    label: "High",
    color: "var(--color-confidence-high)",
    bg: "var(--color-success-light)",
  },
  medium: {
    emoji: "🟡",
    label: "Medium",
    color: "var(--color-confidence-medium)",
    bg: "var(--color-warning-light)",
  },
  low: {
    emoji: "🔴",
    label: "Low",
    color: "var(--color-confidence-low)",
    bg: "var(--color-danger-light)",
  },
};

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ConfidenceBadge({
  level,
  showLabel = true,
  size = "sm",
}: ConfidenceBadgeProps) {
  const config = confidenceConfig[level];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: size === "sm" ? "2px 6px" : "3px 8px",
        borderRadius: "var(--radius-sm)",
        fontSize: size === "sm" ? 11 : 12,
        fontWeight: 500,
        background: config.bg,
        color: config.color,
        whiteSpace: "nowrap",
      }}
    >
      <span>{config.emoji}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

/**
 * Convert a 0-1 confidence score to a confidence level.
 */
export function scoreToLevel(score: number): ConfidenceLevel {
  if (score >= 0.7) return "high";
  if (score >= 0.4) return "medium";
  return "low";
}
