"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface IngestTextFormProps {
  onSubmit: (texts: string[]) => void;
  isLoading: boolean;
}

export function IngestTextForm({ onSubmit, isLoading }: IngestTextFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    // Split by double newline to allow pasting multiple statements at once
    const statements = text
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 10);
      
    if (statements.length > 0) {
      onSubmit(statements);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
          Raw User Statement(s)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste user statements here. Separate multiple statements with a blank line."
          style={{
            width: "100%",
            minHeight: 150,
            padding: "12px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-primary)",
            color: "var(--color-text-primary)",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
        <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 4 }}>
          Separate multiple distinct evidence items with a blank line.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || text.trim().length < 10}
        >
          {isLoading ? "Processing..." : "Process Text Evidence"}
        </Button>
      </div>
    </div>
  );
}
