"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SessionSetupProps {
  onSessionCreated: (sessionId: string) => void;
}

export function SessionSetup({ onSessionCreated }: SessionSetupProps) {
  const [participantId, setParticipantId] = useState("");
  const [sessionType, setSessionType] = useState("baseline-vs-mvp");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!participantId) return alert("Participant ID is required");
    
    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
      const res = await fetch(`${backendUrl}/api/testing/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, sessionType })
      });
      const data = await res.json();
      if (data.id) {
        onSessionCreated(data.id);
      } else {
        alert("Failed to create session");
      }
    } catch (e) {
      console.error(e);
      alert("Error creating session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, background: "var(--color-bg-alt)", borderRadius: 8, border: "1px solid var(--color-border)" }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Create New Test Session</h3>
      
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 14, marginBottom: 8, color: "var(--color-text-secondary)" }}>Participant ID or Alias</label>
        <input 
          type="text" 
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          placeholder="e.g., P1 - Sarah K."
          style={{ width: "100%", padding: "8px 12px", borderRadius: 4, border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontSize: 14, marginBottom: 8, color: "var(--color-text-secondary)" }}>Session Type</label>
        <select 
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          style={{ width: "100%", padding: "8px 12px", borderRadius: 4, border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-primary)" }}
        >
          <option value="baseline-vs-mvp">Baseline vs. MVP (A/B Test)</option>
          <option value="mvp-only">MVP Only (Exploratory)</option>
        </select>
      </div>

      <Button onClick={handleCreate} disabled={loading} style={{ width: "100%" }}>
        {loading ? "Creating..." : "Generate Session Link"}
      </Button>
    </div>
  );
}
