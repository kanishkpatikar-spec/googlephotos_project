/**
 * Evidence labels per §35:
 * EVIDENCE | OBSERVATION | HYPOTHESIS | DECISION
 */

type LabelType = "EVIDENCE" | "OBSERVATION" | "HYPOTHESIS" | "DECISION";

const labelConfig: Record<
  LabelType,
  { color: string; bg: string; emoji: string }
> = {
  EVIDENCE: {
    color: "var(--color-label-evidence)",
    bg: "var(--color-label-evidence-bg)",
    emoji: "📋",
  },
  OBSERVATION: {
    color: "var(--color-label-observation)",
    bg: "var(--color-label-observation-bg)",
    emoji: "👁️",
  },
  HYPOTHESIS: {
    color: "var(--color-label-hypothesis)",
    bg: "var(--color-label-hypothesis-bg)",
    emoji: "💡",
  },
  DECISION: {
    color: "var(--color-label-decision)",
    bg: "var(--color-label-decision-bg)",
    emoji: "✅",
  },
};

interface EvidenceLabelProps {
  label: LabelType;
  size?: "sm" | "md";
}

export function EvidenceLabel({ label, size = "sm" }: EvidenceLabelProps) {
  const config = labelConfig[label];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: size === "sm" ? "2px 6px" : "3px 8px",
        borderRadius: "var(--radius-sm)",
        fontSize: size === "sm" ? 10 : 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        background: config.bg,
        color: config.color,
        whiteSpace: "nowrap",
      }}
    >
      <span>{config.emoji}</span>
      <span>{label}</span>
    </span>
  );
}
