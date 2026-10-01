"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { SourceMetadataForm } from "@/components/evidence/source-metadata-form";
import { IngestTextForm } from "@/components/evidence/ingest-text-form";
import { IngestCsvForm } from "@/components/evidence/ingest-csv-form";
import { IngestJsonForm } from "@/components/evidence/ingest-json-form";
import { IngestUrlForm } from "@/components/evidence/ingest-url-form";
import { SourceMetadata } from "@/lib/evidence/schemas";
import { useRouter } from "next/navigation";

export default function EvidenceIngestionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("text");
  const [metadata, setMetadata] = useState<SourceMetadata>({ sourceId: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ processed: number, relevant: number, duplicates: number } | null>(null);

  const handleSubmit = async (texts: string[]) => {
    if (!metadata.sourceId) {
      setError("Please select a Source Platform before submitting.");
      return;
    }
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Create source if it doesn't exist (MVP simplified to pass sourceId to process API)
      const res = await fetch("/api/discovery/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texts,
          sourceId: metadata.sourceId,
          // url and date could be passed if API supported it, keeping MVP simple
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to process evidence");

      setSuccess({
        processed: data.result.processed,
        relevant: data.result.relevant,
        duplicates: data.result.duplicatesRemoved,
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "text", label: "Manual Text" },
    { id: "csv", label: "CSV Upload" },
    { id: "json", label: "JSON Upload" },
    { id: "url", label: "URL Content" },
  ];

  return (
    <PageContainer
      title="Evidence Ingestion"
      description="Input public evidence for AI-powered discovery pipeline processing"
    >
      <div style={{ maxWidth: 800 }}>
        <Card style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>1. Source Metadata</h2>
          <SourceMetadataForm value={metadata} onChange={setMetadata} />
        </Card>

        <Card>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>2. Evidence Content</h2>
          <div style={{ marginBottom: 24 }}>
            <Tabs tabs={tabs} activeTab={activeTab} />
          </div>

          <div style={{ minHeight: 300 }}>
            {activeTab === "text" && <IngestTextForm onSubmit={handleSubmit} isLoading={isLoading} />}
            {activeTab === "csv" && <IngestCsvForm onSubmit={handleSubmit} isLoading={isLoading} />}
            {activeTab === "json" && <IngestJsonForm onSubmit={handleSubmit} isLoading={isLoading} />}
            {activeTab === "url" && <IngestUrlForm onSubmit={handleSubmit} isLoading={isLoading} />}
          </div>

          {error && (
            <div style={{ marginTop: 24, padding: 12, background: "var(--color-error-light)", color: "var(--color-error)", borderRadius: "var(--radius-md)" }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div style={{ marginTop: 24, padding: 16, background: "var(--color-bg-alt)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 8 }}>
                Processing Complete
              </h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: "var(--color-text-secondary)", fontSize: 14 }}>
                <li>Processed: {success.processed} items</li>
                <li>Identified as Relevant: {success.relevant} items</li>
                <li>Duplicates Removed: {success.duplicates}</li>
              </ul>
              <div style={{ marginTop: 16 }}>
                <button onClick={() => router.push("/evidence")}>
                  View in Explorer
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
