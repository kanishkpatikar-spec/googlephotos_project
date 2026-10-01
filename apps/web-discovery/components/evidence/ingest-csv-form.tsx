"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import { UploadCloud } from "lucide-react";

interface IngestCsvFormProps {
  onSubmit: (texts: string[]) => void;
  isLoading: boolean;
}

export function IngestCsvForm({ onSubmit, isLoading }: IngestCsvFormProps) {
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

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Find the column that contains the raw statement
        // Accept 'raw_statement', 'statement', 'text', 'content'
        if (results.data.length === 0) {
          setError("CSV is empty");
          return;
        }

        const firstRow = results.data[0] as any;
        const textKey = Object.keys(firstRow).find(k => 
          ['raw_statement', 'statement', 'text', 'content', 'quote'].includes(k.toLowerCase().trim())
        );

        if (!textKey) {
          setError("Could not find a text column. Ensure your CSV has a 'raw_statement' or 'text' column.");
          return;
        }

        const statements = results.data
          .map((row: any) => row[textKey])
          .filter((text: string) => typeof text === 'string' && text.trim().length > 10);

        if (statements.length === 0) {
          setError("No valid statements found in the CSV.");
          return;
        }

        onSubmit(statements);
      },
      error: (error) => {
        setError(`Failed to parse CSV: ${error.message}`);
      }
    });
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
        onClick={() => document.getElementById('csv-upload')?.click()}
      >
        <UploadCloud size={32} color="var(--color-text-secondary)" />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 500 }}>
            {file ? file.name : "Click to select a CSV file"}
          </div>
          <div style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginTop: 4 }}>
            Must contain a 'raw_statement' column
          </div>
        </div>
        <input 
          id="csv-upload"
          type="file" 
          accept=".csv"
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
          {isLoading ? "Processing..." : "Process CSV Batch"}
        </Button>
      </div>
    </div>
  );
}
