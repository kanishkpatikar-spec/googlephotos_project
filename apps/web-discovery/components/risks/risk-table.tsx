"use client";

interface Risk {
  id: string;
  category: string;
  description: string;
  severity: string;
  likelihood: string;
  mitigation: string;
}

interface RiskTableProps {
  risks: Risk[];
}

export function RiskTable({ risks }: RiskTableProps) {
  const getBadgeColor = (level: string) => {
    if (level === "High") return "var(--color-okabe-vermilion)";
    if (level === "Medium") return "var(--color-okabe-orange)";
    return "var(--color-okabe-sky)";
  };

  return (
    <div className="glass-panel" style={{ borderRadius: "12px", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.05)" }}>
            <th style={{ padding: "16px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Category</th>
            <th style={{ padding: "16px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Description</th>
            <th style={{ padding: "16px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Severity</th>
            <th style={{ padding: "16px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Likelihood</th>
            <th style={{ padding: "16px", color: "var(--color-text-secondary)", fontWeight: 600 }}>Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((r, i) => (
            <tr key={r.id} style={{ borderTop: "1px solid var(--glass-border)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
              <td style={{ padding: "16px", fontWeight: 600, color: "var(--color-text-primary)" }}>{r.category}</td>
              <td style={{ padding: "16px", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>{r.description}</td>
              <td style={{ padding: "16px" }}>
                <span style={{ 
                  padding: "4px 8px", 
                  borderRadius: "4px", 
                  fontSize: "0.75rem", 
                  fontWeight: 700, 
                  textTransform: "uppercase",
                  color: "white",
                  background: getBadgeColor(r.severity)
                }}>
                  {r.severity}
                </span>
              </td>
              <td style={{ padding: "16px" }}>
                <span style={{ 
                  padding: "4px 8px", 
                  borderRadius: "4px", 
                  fontSize: "0.75rem", 
                  fontWeight: 700, 
                  textTransform: "uppercase",
                  color: "white",
                  background: getBadgeColor(r.likelihood)
                }}>
                  {r.likelihood}
                </span>
              </td>
              <td style={{ padding: "16px", color: "var(--color-text-tertiary)", fontSize: "0.9rem" }}>{r.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
