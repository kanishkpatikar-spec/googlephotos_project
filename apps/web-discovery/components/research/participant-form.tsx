"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ParticipantData {
  id?: string;
  alias: string;
  segment: string;
  demographics: string;
  recruitingCriteria: string;
}

interface ParticipantFormProps {
  initial?: ParticipantData;
  onSubmit: (data: ParticipantData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const SEGMENT_OPTIONS = [
  "Power User (10k+ photos)",
  "Casual User (1k–10k photos)",
  "Professional Photographer",
  "Family Organizer",
  "Student / Academic",
  "Business User",
  "Other",
];

// Pre-populated from problemstatement.md §13
const DEFAULT_CRITERIA =
  "• Used a photo-management app for several years\n• Accumulated a large visual library\n• Attempted to find old photos/screenshots/documents\n• Experienced difficulty retrieving something they knew existed";

export function ParticipantForm({
  initial,
  onSubmit,
  onCancel,
  isEditing = false,
}: ParticipantFormProps) {
  const [alias, setAlias] = useState(initial?.alias || "");
  const [segment, setSegment] = useState(initial?.segment || "");
  const [demographics, setDemographics] = useState(initial?.demographics || "");
  const [recruitingCriteria, setRecruitingCriteria] = useState(
    initial?.recruitingCriteria || DEFAULT_CRITERIA
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!alias.trim()) {
      setError("Participant alias is required.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        id: initial?.id,
        alias: alias.trim(),
        segment,
        demographics,
        recruitingCriteria,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save participant");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          {isEditing ? "Edit Participant" : "Add New Participant"}
        </h3>
        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-tertiary)",
            padding: 4,
          }}
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Alias */}
          <Input
            label="Participant Alias *"
            placeholder="e.g., P1, Sarah K., Power-User-01"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />

          {/* Segment */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              User Segment
            </label>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                fontSize: 13,
                color: "var(--color-text-primary)",
                background: "var(--color-surface)",
                outline: "none",
                width: "100%",
              }}
            >
              <option value="">Select a segment…</option>
              {SEGMENT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Demographics */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              Demographics
            </label>
            <textarea
              placeholder="Age range, device, OS, photo library size, years using Google Photos…"
              value={demographics}
              onChange={(e) => setDemographics(e.target.value)}
              rows={3}
              style={{
                padding: "6px 10px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                fontSize: 13,
                color: "var(--color-text-primary)",
                background: "var(--color-surface)",
                outline: "none",
                width: "100%",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Recruiting Criteria */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--color-text-secondary)",
              }}
            >
              Recruiting Criteria (from §13)
            </label>
            <textarea
              placeholder="Criteria used to recruit this participant…"
              value={recruitingCriteria}
              onChange={(e) => setRecruitingCriteria(e.target.value)}
              rows={4}
              style={{
                padding: "6px 10px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                fontSize: 13,
                color: "var(--color-text-primary)",
                background: "var(--color-surface)",
                outline: "none",
                width: "100%",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "var(--color-text-tertiary)",
              }}
            >
              Pre-populated from problemstatement.md §13
            </span>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: "8px 12px",
                background: "var(--color-danger-light)",
                color: "var(--color-danger)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
              }}
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button variant="secondary" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting
                ? "Saving…"
                : isEditing
                ? "Update Participant"
                : "Add Participant"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
