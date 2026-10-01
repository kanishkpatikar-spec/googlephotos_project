"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Link as LinkIcon, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EvidenceLinkerProps {
  linkedCount: number;
  onLinkAdded: (evidenceId: string) => void;
}

export function EvidenceLinker({ linkedCount, onLinkAdded }: EvidenceLinkerProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (id: string) => {
    onLinkAdded(id);
    setOpen(false);
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setOpen(true)}
        title="Link supporting evidence"
        style={{ padding: "0 6px", height: 24, fontSize: 11, color: linkedCount > 0 ? "var(--color-primary)" : "var(--color-text-tertiary)" }}
      >
        <LinkIcon size={12} style={{ marginRight: 4 }} />
        {linkedCount > 0 ? `${linkedCount} linked` : "Link"}
      </Button>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        title="Link Supporting Evidence"
        description="Search for quotes, observations, or findings to back this statement."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input 
            type="text" 
            placeholder="Search existing evidence..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "8px 12px", 
              borderRadius: "var(--radius-sm)", 
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-alt)"
            }}
          />

          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            (Mock search results - select one to link)
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflowY: "auto" }}>
            {/* Mock Item 1 */}
            <div style={{ padding: 12, border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Badge variant="info">DIRECT_QUOTE</Badge>
                <div style={{ fontSize: 13, marginTop: 4 }}>"I spent 10 minutes scrolling and just gave up."</div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => handleSelect("mock-ev-1")}><Plus size={14}/></Button>
            </div>
            
            {/* Mock Item 2 */}
            <div style={{ padding: 12, border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Badge variant="warning">AI_INTERPRETATION</Badge>
                <div style={{ fontSize: 13, marginTop: 4 }}>User exhibited query formulation failure.</div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => handleSelect("mock-ev-2")}><Plus size={14}/></Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
