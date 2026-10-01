"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Sparkles, Trash2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Observation {
  id: string;
  observationText: string;
  category: string | null;
  label: string;
}

interface AIAnalysisPanelProps {
  interviewId: string;
  observations: Observation[];
  onAnalysisComplete: () => void;
}

export function AIAnalysisPanel({ interviewId, observations, onAnalysisComplete }: AIAnalysisPanelProps) {
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch(`/api/research/interviews/${interviewId}/analyze`, {
        method: "POST"
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }
      onAnalysisComplete();
    } catch (e: any) {
      alert("Failed to analyze: " + e.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/research/interviews/${interviewId}/observations?observationId=${id}`, {
        method: "DELETE"
      });
      onAnalysisComplete();
    } catch (e) {
      console.error(e);
    }
  };

  const aiObservations = observations.filter(obs => obs.label === "AI_INTERPRETATION");

  return (
    <Card>
      <CardHeader 
        title="AI Transcript Analysis" 
        description="Extract themes, cues, and failure stages from the transcript."
      />
      <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        <Button 
          onClick={handleAnalyze} 
          disabled={analyzing} 
          style={{ alignSelf: "flex-start", background: "var(--color-primary-variant)" }}
        >
          <Sparkles size={14} style={{ marginRight: 6 }} />
          {analyzing ? "Analyzing Transcript..." : "Run AI Analysis"}
        </Button>

        {aiObservations.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)" }}>Extracted Insights</h4>
            {aiObservations.map(obs => (
              <div 
                key={obs.id} 
                style={{ 
                  padding: 12, 
                  background: "var(--color-bg-alt)", 
                  border: "1px dashed var(--color-border)", 
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <Badge variant="warning">{obs.label}</Badge>
                    {obs.category && <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)" }}>{obs.category}</span>}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                    {obs.observationText}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(obs.id)} title="Reject/Delete">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
