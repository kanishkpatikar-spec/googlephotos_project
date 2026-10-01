"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

interface QuoteTaggerProps {
  interviewId: string;
  onQuoteAdded?: () => void;
}

export function QuoteTagger({ interviewId, onQuoteAdded }: QuoteTaggerProps) {
  const [tagging, setTagging] = useState(false);

  const handleTagQuote = async () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (!text) {
      alert("Please highlight text in the transcript first to tag it as a quote.");
      return;
    }

    const context = prompt("Optional: Add context for this quote (e.g. 'When asked about search failure')");
    if (context === null) return; // User cancelled

    const theme = prompt("Optional: Add a theme (e.g. 'Memory Gap', 'Workaround')");

    setTagging(true);
    try {
      const res = await fetch(`/api/research/interviews/${interviewId}/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteText: text,
          context,
          theme
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save quote");
      }

      if (onQuoteAdded) {
        onQuoteAdded();
      }
      
      // Clear selection
      selection?.removeAllRanges();
    } catch (e) {
      console.error(e);
      alert("Failed to tag quote.");
    } finally {
      setTagging(false);
    }
  };

  return (
    <Button 
      variant="secondary" 
      size="sm" 
      onClick={handleTagQuote} 
      disabled={tagging}
      title="Highlight text in the transcript and click to save as a direct quote"
    >
      <Quote size={14} style={{ marginRight: 6 }} />
      {tagging ? "Tagging..." : "Tag Highlighted as Quote"}
    </Button>
  );
}
