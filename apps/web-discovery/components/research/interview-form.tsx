"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { Save } from "lucide-react";

export interface InterviewMetadata {
  id: string;
  date: string | null;
  retrievalIncident: string | null;
  targetAsset: string | null;
  initialMemory: string | null;
  querySequence: string | null;
  observedBehavior: string | null;
  workaround: string | null;
  outcome: string | null;
}

interface InterviewFormProps {
  initialData: InterviewMetadata;
  onSave: (data: Partial<InterviewMetadata>) => Promise<void>;
}

export function InterviewForm({ initialData, onSave }: InterviewFormProps) {
  const [formData, setFormData] = useState<InterviewMetadata>(initialData);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof InterviewMetadata, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  return (
    <Card>
      <CardHeader title="Interview Metadata" />
      <form onSubmit={handleSubmit} style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Date</label>
          <Input
            type="date"
            value={formData.date || ""}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Retrieval Incident Description</label>
          <textarea
            value={formData.retrievalIncident || ""}
            onChange={(e) => handleChange("retrievalIncident", e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", minHeight: 60 }}
            placeholder="E.g., User tried to find a picture of a café from their Goa trip..."
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Target Asset (What they were looking for)</label>
          <Input
            value={formData.targetAsset || ""}
            onChange={(e) => handleChange("targetAsset", e.target.value)}
            placeholder="E.g., Photo of the cafe menu"
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Initial Memory (What they remembered)</label>
          <textarea
            value={formData.initialMemory || ""}
            onChange={(e) => handleChange("initialMemory", e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", minHeight: 60 }}
            placeholder="E.g., Remembered it was sunny, near a beach..."
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Query Sequence (What they typed)</label>
          <textarea
            value={formData.querySequence || ""}
            onChange={(e) => handleChange("querySequence", e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", minHeight: 60 }}
            placeholder='1. "goa cafe"&#10;2. "beach restaurant"&#10;...'
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Observed Behavior</label>
          <textarea
            value={formData.observedBehavior || ""}
            onChange={(e) => handleChange("observedBehavior", e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", minHeight: 60 }}
            placeholder="E.g., User scrolled rapidly through results from 2022..."
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Workaround</label>
          <Input
            value={formData.workaround || ""}
            onChange={(e) => handleChange("workaround", e.target.value)}
            placeholder="E.g., Checked WhatsApp chat history"
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}>Outcome</label>
          <Input
            value={formData.outcome || ""}
            onChange={(e) => handleChange("outcome", e.target.value)}
            placeholder="E.g., Found after 5 minutes"
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" disabled={saving}>
            <Save size={14} style={{ marginRight: 6 }} /> {saving ? "Saving..." : "Save Metadata"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
