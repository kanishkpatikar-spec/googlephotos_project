"use client";

import { Input } from "@/components/ui/input";
import { SourceMetadata } from "@/lib/evidence/schemas";

interface SourceMetadataFormProps {
  value: SourceMetadata;
  onChange: (value: SourceMetadata) => void;
}

export function SourceMetadataForm({ value, onChange }: SourceMetadataFormProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
          Source Platform
        </label>
        <select
          value={value.sourceId}
          onChange={(e) => onChange({ ...value, sourceId: e.target.value })}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-primary)",
            color: "var(--color-text-primary)",
          }}
        >
          <option value="">Select a platform...</option>
          <option value="reddit">Reddit</option>
          <option value="twitter">Twitter / X</option>
          <option value="app_store">App Store Reviews</option>
          <option value="play_store">Play Store Reviews</option>
          <option value="user_interview">User Interview</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
            Source URL (Optional)
          </label>
          <Input
            type="url"
            placeholder="https://..."
            value={value.url || ""}
            onChange={(e) => onChange({ ...value, url: e.target.value })}
          />
        </div>
        <div style={{ width: 150 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
            Date (Optional)
          </label>
          <Input
            type="date"
            value={value.date || ""}
            onChange={(e) => onChange({ ...value, date: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
