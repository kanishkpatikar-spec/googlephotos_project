"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ObservationEntryProps {
  interviewId: string;
  onObservationAdded?: () => void;
}

export function ObservationEntry({ interviewId, onObservationAdded }: ObservationEntryProps) {
  const [observationText, setObservationText] = useState("");
  const [category, setCategory] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!observationText.trim()) return;

    setAdding(true);
    try {
      const res = await fetch(`/api/research/interviews/${interviewId}/observations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observationText: observationText.trim(),
          category: category.trim() || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save observation");
      }

      setObservationText("");
      setCategory("");
      if (onObservationAdded) {
        onObservationAdded();
      }
    } catch (e) {
      console.error(e);
      alert("Failed to add observation.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Add Observation" description="Log a researcher observation (E.g. behavior, body language)." />
      <form onSubmit={handleSubmit} style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <textarea
          value={observationText}
          onChange={(e) => setObservationText(e.target.value)}
          placeholder="Observation details..."
          required
          style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", minHeight: 60 }}
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (Optional, e.g. 'Search Behavior')"
          style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" disabled={adding || !observationText.trim()}>
            <Plus size={14} style={{ marginRight: 6 }} /> {adding ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
