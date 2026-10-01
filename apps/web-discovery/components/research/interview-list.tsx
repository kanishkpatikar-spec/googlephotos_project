"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

const formatDate = (date: Date) => date.toLocaleDateString();

export interface Interview {
  id: string;
  participantId: string;
  date: string | null;
  retrievalIncident: string | null;
  targetAsset: string | null;
  dataMode: string;
  createdAt: string;
}

interface InterviewListProps {
  participantId: string;
}

export function InterviewList({ participantId }: InterviewListProps) {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/research/interviews?participantId=${participantId}`);
      if (res.ok) {
        const data = await res.json();
        setInterviews(data.interviews || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [participantId]);

  const handleCreate = async () => {
    try {
      const res = await fetch(`/api/research/interviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId }),
      });
      if (res.ok) {
        const data = await res.json();
        window.location.href = `/research/interviews/${data.interview.id}`;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this interview?")) return;
    try {
      const res = await fetch(`/api/research/interviews/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchInterviews();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div style={{ padding: 16, fontSize: 13, color: "var(--color-text-tertiary)" }}>Loading interviews...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ fontSize: 14, fontWeight: 600 }}>Interviews</h4>
        <Button size="sm" onClick={handleCreate}>
          + New Interview
        </Button>
      </div>

      {interviews.length === 0 ? (
        <div style={{ padding: 24, textAlign: "center", border: "1px dashed var(--color-border)", borderRadius: "var(--radius-md)", color: "var(--color-text-tertiary)", fontSize: 13 }}>
          No interviews yet for this participant.
        </div>
      ) : (
        interviews.map((interview) => (
          <div
            key={interview.id}
            style={{
              background: "var(--color-bg-alt)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
                <MessageSquare size={14} />
                {interview.date ? formatDate(new Date(interview.date)) : "Unknown Date"}
                <Badge variant={interview.dataMode === "research" ? "success" : "default"}>{interview.dataMode}</Badge>
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>
                {interview.retrievalIncident || "No incident description yet."}
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <Link href={`/research/interviews/${interview.id}`}>
                <Button variant="secondary" size="sm" title="Edit Interview">
                  <Edit2 size={14} style={{ marginRight: 6 }} /> Open
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(interview.id)} title="Delete">
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
