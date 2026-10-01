"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IngestUrlFormProps {
  onSubmit: (texts: string[]) => void;
  isLoading: boolean;
}

export function IngestUrlForm({ onSubmit, isLoading }: IngestUrlFormProps) {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // For MVP, we just use the pasted content since server-side scraping requires more setup
    const statements = content
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
          Source URL
        </label>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
        <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 4 }}>
          URL context is saved with the evidence.
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
          Copied Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste the relevant text from the URL here."
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
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || content.trim().length < 10}
        >
          {isLoading ? "Processing..." : "Process URL Content"}
        </Button>
      </div>
    </div>
  );
}
