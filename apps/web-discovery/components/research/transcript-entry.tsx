"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuoteTagger } from "./quote-tagger";

interface TranscriptEntryProps {
  interviewId: string;
  initialTranscript: string;
  onSave: (transcript: string) => Promise<void>;
  onQuoteTagged?: () => void;
}

export function TranscriptEntry({ interviewId, initialTranscript, onSave, onQuoteTagged }: TranscriptEntryProps) {
  const [transcript, setTranscript] = useState(initialTranscript);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setTranscript(newVal);
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    setSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await onSave(newVal);
        setSavedAt(new Date());
      } catch (err) {
        console.error("Failed to save transcript", err);
      } finally {
        setSaving(false);
      }
    }, 1500); // Debounce 1.5s
  };

  return (
    <Card style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader 
        title="Transcript" 
        description="Paste the interview transcript here. Auto-saves as you type."
      />
      <div style={{ padding: "0 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
          {saving ? "Saving..." : savedAt ? `Last saved at ${savedAt.toLocaleTimeString()}` : ""}
        </div>
        <QuoteTagger interviewId={interviewId} onQuoteAdded={onQuoteTagged} />
      </div>
      <div style={{ padding: "0 16px 16px", flex: 1, display: "flex" }}>
        <textarea
          value={transcript}
          onChange={handleChange}
          style={{
            width: "100%",
            flex: 1,
            minHeight: 400,
            padding: "12px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            fontSize: 14,
            lineHeight: 1.6,
            resize: "vertical"
          }}
          placeholder="[Participant]: I was trying to find this photo..."
        />
      </div>
    </Card>
  );
}
