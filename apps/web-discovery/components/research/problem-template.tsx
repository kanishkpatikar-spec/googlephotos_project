"use client";

import { EvidenceLinker } from "./evidence-linker";

export interface ProblemFields {
  targetSegment: string;
  scenario: string;
  memoryCues: string;
  searchableAttributes: string;
  rootCause: string;
  failureBehavior: string;
  workaround: string;
  consequence: string;
  productBehavior: string;
  retrievalComponent: string;
  evidenceLinks: Record<string, string[]>;
}

interface ProblemTemplateProps {
  data: ProblemFields;
  onChange: (field: keyof ProblemFields, value: string) => void;
  onLinkAdded: (field: string, evidenceId: string) => void;
}

export function ProblemTemplate({ data, onChange, onLinkAdded }: ProblemTemplateProps) {
  
  const renderField = (field: keyof ProblemFields, placeholder: string) => {
    const value = (data[field] as string) || "";
    const linkedCount = data.evidenceLinks?.[field]?.length || 0;
    const isWaitState = value.trim() === "";

    return (
      <div style={{ display: "inline-flex", flexDirection: "column", verticalAlign: "bottom", margin: "0 6px" }}>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder}
          style={{
            border: "none",
            borderBottom: `2px solid ${isWaitState ? "var(--color-warning)" : "var(--color-primary)"}`,
            background: "transparent",
            fontSize: 16,
            fontWeight: 600,
            color: isWaitState ? "var(--color-text-tertiary)" : "var(--color-primary)",
            padding: "2px 4px",
            minWidth: 150,
            textAlign: "center",
            outline: "none",
            fontFamily: "inherit"
          }}
        />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <EvidenceLinker 
            linkedCount={linkedCount} 
            onLinkAdded={(id) => onLinkAdded(field, id)} 
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      padding: 32, 
      background: "var(--color-bg-alt)", 
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--color-border)",
      fontSize: 18,
      lineHeight: 2.5,
      color: "var(--color-text-primary)",
      maxWidth: 800,
      margin: "0 auto"
    }}>
      For {renderField("targetSegment", "[target segment]")}, 
      <br/>when they are trying to retrieve {renderField("scenario", "[scenario]")},
      <br/>they often remember {renderField("memoryCues", "[memory cues]")}
      <br/>but have forgotten {renderField("searchableAttributes", "[searchable attributes]")}.
      <br/><br/>
      Because {renderField("rootCause", "[root cause]")},
      <br/>their initial retrieval attempt results in {renderField("failureBehavior", "[failure behavior]")}.
      <br/>Users then resort to {renderField("workaround", "[workaround]")},
      <br/>creating {renderField("consequence", "[consequence]")}.
      <br/><br/>
      Improving {renderField("productBehavior", "[product behavior]")}
      <br/>should increase {renderField("retrievalComponent", "[retrieval component]")}.
    </div>
  );
}
