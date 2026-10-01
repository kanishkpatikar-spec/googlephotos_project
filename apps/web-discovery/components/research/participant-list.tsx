"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Edit2, Trash2, MessageSquare } from "lucide-react";

const formatDate = (date: Date) => date.toLocaleDateString();

export interface Participant {
  id: string;
  alias: string;
  segment: string | null;
  demographics: string | null;
  recruitingCriteria: string | null;
  dataMode: string;
  createdAt: string;
  interviewCount?: number;
}

interface ParticipantListProps {
  participants: Participant[];
  onEdit: (participant: Participant) => void;
  onDelete: (id: string) => void;
  onViewInterviews: (participantId: string) => void;
  loading?: boolean;
}

export function ParticipantList({
  participants,
  onEdit,
  onDelete,
  onViewInterviews,
  loading = false,
}: ParticipantListProps) {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 48,
          color: "var(--color-text-tertiary)",
          fontSize: 13,
        }}
      >
        Loading participants…
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {participants.map((p) => (
        <div
          key={p.id}
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: 16,
            transition: "border-color 0.15s ease",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "var(--color-accent)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "var(--color-border)";
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {/* Left: Participant info */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-bg-alt)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-text-tertiary)",
                  flexShrink: 0,
                }}
              >
                <User size={16} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {p.alias}
                  </span>
                  {p.segment && (
                    <Badge variant="info">{p.segment}</Badge>
                  )}
                  <Badge variant={p.dataMode === "research" ? "success" : "default"}>
                    {p.dataMode}
                  </Badge>
                </div>

                {p.demographics && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                      margin: "4px 0 0",
                      maxWidth: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {p.demographics}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 8,
                    fontSize: 11,
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  <span>Added {formatDate(new Date(p.createdAt))}</span>
                  <span>
                    <MessageSquare
                      size={10}
                      style={{ marginRight: 3, verticalAlign: "middle" }}
                    />
                    {p.interviewCount ?? 0} interview
                    {(p.interviewCount ?? 0) !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div style={{ display: "flex", gap: 4 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewInterviews(p.id)}
                title="View interviews"
              >
                <MessageSquare size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(p)}
                title="Edit participant"
              >
                <Edit2 size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (
                    confirm(
                      `Delete participant "${p.alias}"? This cannot be undone.`
                    )
                  ) {
                    onDelete(p.id);
                  }
                }}
                title="Delete participant"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
