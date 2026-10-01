"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Quote {
  id: string;
  quoteText: string;
  context: string | null;
  theme: string | null;
  participantAlias?: string;
}

interface AffinityMapProps {
  quotes: Quote[];
}

export function AffinityMap({ quotes }: AffinityMapProps) {
  // Group quotes by theme
  const groupedQuotes = quotes.reduce((acc, quote) => {
    const theme = quote.theme || "Uncategorized";
    if (!acc[theme]) acc[theme] = [];
    acc[theme].push(quote);
    return acc;
  }, {} as Record<string, Quote[]>);

  const themes = Object.keys(groupedQuotes).sort((a, b) => {
    if (a === "Uncategorized") return 1;
    if (b === "Uncategorized") return -1;
    return a.localeCompare(b);
  });

  if (quotes.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: "center", border: "1px dashed var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text-tertiary)" }}>
        No quotes tagged yet. Tag direct quotes in the interview workspace to populate the affinity map.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
      {themes.map(theme => (
        <div key={theme} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, paddingBottom: 8, borderBottom: "2px solid var(--color-border)" }}>
            {theme} <Badge variant="default" style={{ marginLeft: 8 }}>{groupedQuotes[theme].length}</Badge>
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {groupedQuotes[theme].map(quote => (
              <Card 
                key={quote.id} 
                style={{ 
                  background: "var(--color-bg-alt)", 
                  borderLeft: "4px solid var(--color-primary-variant)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 14, fontStyle: "italic", marginBottom: 12, lineHeight: 1.5 }}>
                    "{quote.quoteText}"
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 12 }}>
                    <span style={{ fontWeight: 600, color: "var(--color-text-secondary)" }}>— {quote.participantAlias || "Unknown Participant"}</span>
                    {quote.context && <span style={{ color: "var(--color-text-tertiary)", maxWidth: "50%", textAlign: "right" }}>{quote.context}</span>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
