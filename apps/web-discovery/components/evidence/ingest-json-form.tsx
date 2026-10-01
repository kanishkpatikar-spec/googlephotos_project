"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

interface IngestJsonFormProps {
  onSubmit: (texts: string[]) => void;
  isLoading: boolean;
}

export function IngestJsonForm({ onSubmit, isLoading }: IngestJsonFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        let items: any[] = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (data.items && Array.isArray(data.items)) {
          items = data.items;
        } else {
          throw new Error("JSON must be an array or have an 'items' array property");
        }

        const statements = items
          .map((item) => {
            if (typeof item === 'string') return item;
            return item.rawStatement || item.raw_statement || item.text || item.content;
          })
          .filter(text => typeof text === 'string' && text.trim().length > 10);

        if (statements.length === 0) {
          setError("No valid statements found in JSON.");
          return;
        }

        onSubmit(statements);
      } catch (err: any) {
        setError(`Failed to parse JSON: ${err.message}`);
      }
    };
    reader.onerror = () => setError("Failed to read file");
    reader.readAsText(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div 
        style={{ 
          border: "2px dashed var(--color-border)", 
          borderRadius: "var(--radius-lg)",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          background: "var(--color-bg-alt)",
          cursor: "pointer"
        }}
        onClick={() => document.getElementById('json-upload')?.click()}
      >
        <UploadCloud size={32} color="var(--color-text-secondary)" />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 500 }}>
            {file ? file.name : "Click to select a JSON file"}
          </div>
          <div style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginTop: 4 }}>
            Expected format: [{`"rawStatement": "..."`}]
          </div>
        </div>
        <input 
          id="json-upload"
          type="file" 
          accept=".json"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <div style={{ color: "var(--color-error)", fontSize: 13, padding: 8, background: "var(--color-error-light)", borderRadius: 4 }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !file}
        >
          {isLoading ? "Processing..." : "Process JSON Batch"}
        </Button>
      </div>
    </div>
  );
}
