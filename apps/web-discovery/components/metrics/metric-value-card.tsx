"use client";

interface MetricValueCardProps {
  name: string;
  type: string;
  description: string;
  formula: string;
  isPrimary?: boolean;
}

export function MetricValueCard({ name, type, description, formula, isPrimary }: MetricValueCardProps) {
  return (
    <div 
      className="glass-panel" 
      style={{ 
        padding: "20px", 
        borderRadius: "12px", 
        borderLeft: isPrimary ? "4px solid var(--color-okabe-purple)" : "4px solid var(--color-border-hover)" 
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: isPrimary ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>
          {name}
        </h3>
        <span style={{ 
          fontSize: "0.75rem", 
          padding: "4px 8px", 
          borderRadius: "50px", 
          background: "rgba(255,255,255,0.05)",
          color: "var(--color-text-tertiary)",
          textTransform: "uppercase"
        }}>
          {type}
        </span>
      </div>
      
      <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
        {description}
      </p>

      <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "8px", fontSize: "0.85rem", fontFamily: "monospace", color: "var(--color-okabe-sky)" }}>
        {formula}
      </div>
    </div>
  );
}
