"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { EvidenceLabel } from "@/components/shared/evidence-label";

export default function EvidenceDetailPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/evidence/${params.id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load evidence detail", err);
      } finally {
        setIsLoading(false);
      }
    }
    if (params.id) load();
  }, [params.id]);

  if (isLoading) return <PageContainer title="Loading..."><div /></PageContainer>;
  if (!data) return <PageContainer title="Not Found"><div /></PageContainer>;

  const { evidence, source, memoryCues, failureModes } = data;

  return (
    <PageContainer
      title="Evidence Detail"
      description="Compare raw user statement with AI extraction"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left Column: Raw Evidence */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Raw User Statement</h2>
              <EvidenceLabel label="EVIDENCE" />
            </div>
            
            <div style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 12 }}>
              <strong>Source:</strong> {source?.name || "Unknown"} ({source?.platform || "unknown"})
            </div>
            
            <div style={{ 
              padding: 16, 
              background: "var(--color-bg-alt)", 
              borderRadius: "var(--radius-md)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--color-text-primary)",
              borderLeft: "4px solid var(--color-border)"
            }}>
              {evidence.rawStatement}
            </div>
          </Card>
        </div>

        {/* Right Column: AI Interpretation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>AI Interpretation</h2>
              <Badge variant="warning">AI EXTRACTED</Badge>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <strong style={{ fontSize: 13, color: "var(--color-text-tertiary)", display: "block" }}>Confidence</strong>
                <Badge variant={evidence.aiConfidence > 0.8 ? "success" : "warning"}>
                  {evidence.aiConfidence ? `${(evidence.aiConfidence * 100).toFixed(0)}%` : "N/A"}
                </Badge>
              </div>

              {evidence.targetDescription && (
                <div>
                  <strong style={{ fontSize: 13, color: "var(--color-text-tertiary)", display: "block" }}>Target Description</strong>
                  <div style={{ fontSize: 14 }}>{evidence.targetDescription}</div>
                </div>
              )}

              {memoryCues && memoryCues.length > 0 && (
                <div>
                  <strong style={{ fontSize: 13, color: "var(--color-text-tertiary)", display: "block" }}>Memory Cues</strong>
                  <ul style={{ margin: "4px 0 0", paddingLeft: 20, fontSize: 14 }}>
                    {memoryCues.map((cue: any) => (
                      <li key={cue.id}>
                        <Badge style={{ marginRight: 8 }}>{cue.cueType}</Badge>
                        {cue.cueValue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {failureModes && failureModes.length > 0 && (
                <div>
                  <strong style={{ fontSize: 13, color: "var(--color-text-tertiary)", display: "block" }}>Failure Modes</strong>
                  <ul style={{ margin: "4px 0 0", paddingLeft: 20, fontSize: 14 }}>
                    {failureModes.map((fail: any) => (
                      <li key={fail.id}>
                        <Badge style={{ marginRight: 8 }}>{fail.failureStage}</Badge>
                        {fail.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
