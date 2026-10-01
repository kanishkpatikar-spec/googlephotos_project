"use client";

interface ComparisonData {
  successRate: number;
  avgQueries: number;
  abandonmentRate: number;
  subjectiveDifficulty: number;
  tasksStarted: number;
  targetsSelected: number;
}

interface ComparisonTableProps {
  baseline: ComparisonData;
  mvp: ComparisonData;
}

export function ComparisonTable({ baseline, mvp }: ComparisonTableProps) {
  const metrics = [
    { label: "Success Rate (%)", base: baseline.successRate, mvp: mvp.successRate, isBetter: mvp.successRate > baseline.successRate },
    { label: "Task Abandonment (%)", base: baseline.abandonmentRate, mvp: mvp.abandonmentRate, isBetter: mvp.abandonmentRate < baseline.abandonmentRate },
    { label: "Average Queries Needed", base: baseline.avgQueries, mvp: mvp.avgQueries, isBetter: mvp.avgQueries < baseline.avgQueries },
    { label: "Subjective Difficulty (1-5)", base: baseline.subjectiveDifficulty, mvp: mvp.subjectiveDifficulty, isBetter: mvp.subjectiveDifficulty < baseline.subjectiveDifficulty },
  ];

  return (
    <div className="glass-panel" style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "32px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.05)" }}>
            <th style={{ padding: "16px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Metric</th>
            <th style={{ padding: "16px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Baseline Search</th>
            <th style={{ padding: "16px", color: "var(--color-okabe-sky)", fontWeight: 600 }}>MVP AI Search</th>
            <th style={{ padding: "16px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Delta</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m, i) => {
            const delta = m.mvp - m.base;
            const deltaDisplay = delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1);
            
            return (
              <tr key={i} style={{ borderTop: "1px solid var(--glass-border)" }}>
                <td style={{ padding: "16px", fontWeight: 500 }}>{m.label}</td>
                <td style={{ padding: "16px", color: "var(--color-text-secondary)" }}>{m.base || 0}</td>
                <td style={{ padding: "16px", fontWeight: 700, color: "white" }}>{m.mvp || 0}</td>
                <td style={{ 
                  padding: "16px", 
                  fontWeight: 600,
                  color: m.isBetter ? "var(--color-okabe-green)" : "var(--color-okabe-orange)"
                }}>
                  {delta === 0 ? "-" : deltaDisplay}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ padding: "12px 16px", fontSize: "0.8rem", color: "var(--color-text-tertiary)", background: "rgba(0,0,0,0.2)" }}>
        * 1 = Very Easy, 5 = Very Difficult. Note: Small sample sizes do not yield statistically significant results.
      </div>
    </div>
  );
}
