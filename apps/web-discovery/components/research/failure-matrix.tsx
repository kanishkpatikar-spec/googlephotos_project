"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Observation {
  id: string;
  observationText: string;
  category: string | null;
  label: string;
  participantAlias?: string;
}

interface FailureMatrixProps {
  observations: Observation[];
}

export function FailureMatrix({ observations }: FailureMatrixProps) {
  // Group observations by category (which acts as our proxy for Failure Modes / Taxonomy)
  const groupedObservations = observations.reduce((acc, obs) => {
    const category = obs.category || "General Observation";
    if (!acc[category]) acc[category] = [];
    acc[category].push(obs);
    return acc;
  }, {} as Record<string, Observation[]>);

  const categories = Object.keys(groupedObservations).sort((a, b) => {
    if (a === "General Observation") return 1;
    if (b === "General Observation") return -1;
    return a.localeCompare(b);
  });

  if (observations.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: "center", border: "1px dashed var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text-tertiary)" }}>
        No observations or AI insights generated yet.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {categories.map(category => (
        <Card key={category}>
          <CardHeader 
            title={category} 
            description={`${groupedObservations[category].length} observation(s) mapped to this category.`}
          />
          <div style={{ padding: "0 16px 16px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)", textAlign: "left", color: "var(--color-text-secondary)" }}>
                  <th style={{ padding: "8px 12px", width: "15%" }}>Source</th>
                  <th style={{ padding: "8px 12px", width: "20%" }}>Type</th>
                  <th style={{ padding: "8px 12px", width: "65%" }}>Observation / Insight</th>
                </tr>
              </thead>
              <tbody>
                {groupedObservations[category].map(obs => (
                  <tr key={obs.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "12px", verticalAlign: "top", fontWeight: 500 }}>
                      {obs.participantAlias || "System"}
                    </td>
                    <td style={{ padding: "12px", verticalAlign: "top" }}>
                      <Badge variant={obs.label === "AI_INTERPRETATION" ? "warning" : "default"}>
                        {obs.label}
                      </Badge>
                    </td>
                    <td style={{ padding: "12px", verticalAlign: "top", color: "var(--color-text-primary)" }}>
                      {obs.observationText}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}
