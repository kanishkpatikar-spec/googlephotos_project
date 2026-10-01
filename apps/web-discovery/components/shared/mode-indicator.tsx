/**
 * Mode indicator showing DEMO or RESEARCH mode (§42).
 * Reads APP_MODE from environment.
 */
export function ModeIndicator() {
  const mode = process.env.NEXT_PUBLIC_APP_MODE || "demo";
  const isDemo = mode === "demo";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: "var(--radius-md)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        background: isDemo
          ? "var(--color-mode-demo-bg)"
          : "var(--color-mode-research-bg)",
        color: isDemo ? "var(--color-mode-demo)" : "var(--color-mode-research)",
        border: `1px solid ${isDemo ? "var(--color-mode-demo)" : "var(--color-mode-research)"}`,
        borderColor: isDemo
          ? "rgba(217, 119, 6, 0.2)"
          : "rgba(37, 99, 235, 0.2)",
      }}
    >
      <span>{isDemo ? "⚠️" : "🔬"}</span>
      <span>{isDemo ? "DEMO MODE" : "RESEARCH MODE"}</span>
    </div>
  );
}
