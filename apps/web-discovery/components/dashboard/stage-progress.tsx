import { Card } from "@/components/ui/card";

const stages = [
  { label: "Metric\nDecomposition", short: "Metrics" },
  { label: "Secondary\nResearch", short: "Discovery" },
  { label: "Opportunity\nAreas", short: "Opportunities" },
  { label: "Primary\nResearch", short: "Interviews" },
  { label: "Problem\nDefinition", short: "Problem" },
  { label: "MVP\nHypothesis", short: "MVP" },
  { label: "User\nTesting", short: "Testing" },
  { label: "Results &\nMetrics", short: "Results" },
];

interface StageProgressProps {
  currentStage: number;
}

export function StageProgress({ currentStage }: StageProgressProps) {
  return (
    <Card>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 12 }}>
        Research-First Build Sequence
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {stages.map((stage, i) => {
          const isComplete = i < currentStage;
          const isCurrent = i === currentStage;

          return (
            <div key={stage.short} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 80,
                }}
              >
                {/* Circle indicator */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 600,
                    background: isComplete
                      ? "var(--color-success)"
                      : isCurrent
                        ? "var(--color-accent)"
                        : "var(--color-bg-alt)",
                    color: isComplete || isCurrent
                      ? "white"
                      : "var(--color-text-tertiary)",
                    border: isCurrent
                      ? "2px solid var(--color-accent)"
                      : "2px solid transparent",
                  }}
                >
                  {isComplete ? "✓" : i + 1}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: 10,
                    color: isComplete
                      ? "var(--color-success)"
                      : isCurrent
                        ? "var(--color-accent)"
                        : "var(--color-text-tertiary)",
                    textAlign: "center",
                    fontWeight: isCurrent ? 600 : 400,
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                  }}
                >
                  {stage.label}
                </div>
              </div>

              {/* Connector line */}
              {i < stages.length - 1 && (
                <div
                  style={{
                    width: 20,
                    height: 2,
                    background: isComplete
                      ? "var(--color-success)"
                      : "var(--color-border)",
                    marginBottom: 22,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
