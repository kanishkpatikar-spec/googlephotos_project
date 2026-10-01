"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MetricNode {
  id: string;
  label: string;
  description?: string;
  children: MetricNode[];
  isExpanded: boolean;
  isValidated: boolean;
}

interface MetricNodeProps {
  node: MetricNode;
  depth: number;
  onToggle: (id: string) => void;
  onEdit: (id: string, label: string, description: string) => void;
  onAdd: (parentId: string) => void;
  onRemove: (id: string) => void;
  onValidate: (id: string) => void;
}

export function MetricNodeComponent({
  node,
  depth,
  onToggle,
  onEdit,
  onAdd,
  onRemove,
  onValidate,
}: MetricNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(node.label);
  const [editDescription, setEditDescription] = useState(
    node.description || ""
  );
  const hasChildren = node.children.length > 0;

  const handleSave = () => {
    onEdit(node.id, editLabel, editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(node.label);
    setEditDescription(node.description || "");
    setIsEditing(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 6,
          padding: "6px 0",
          paddingLeft: depth * 24,
        }}
      >
        {/* Expand/collapse toggle */}
        <button
          onClick={() => hasChildren && onToggle(node.id)}
          style={{
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: hasChildren ? "pointer" : "default",
            color: "var(--color-text-tertiary)",
            flexShrink: 0,
            marginTop: 2,
            opacity: hasChildren ? 1 : 0.3,
          }}
        >
          {hasChildren ? (
            node.isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <span style={{ width: 14, height: 14, display: "block" }} />
          )}
        </button>

        {/* Validation indicator */}
        <button
          onClick={() => onValidate(node.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            flexShrink: 0,
            marginTop: 2,
            color: node.isValidated
              ? "var(--color-success)"
              : "var(--color-text-tertiary)",
          }}
          title={node.isValidated ? "Validated by research" : "Not yet validated"}
        >
          {node.isValidated ? (
            <CheckCircle size={16} />
          ) : (
            <Circle size={16} />
          )}
        </button>

        {/* Node content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {isEditing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <input
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                style={{
                  padding: "4px 8px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 13,
                  width: "100%",
                }}
                autoFocus
              />
              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
                style={{
                  padding: "4px 8px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 12,
                  color: "var(--color-text-secondary)",
                  width: "100%",
                }}
              />
              <div style={{ display: "flex", gap: 4 }}>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  fontSize: depth === 0 ? 15 : 13,
                  fontWeight: depth === 0 ? 600 : 400,
                  color: node.isValidated
                    ? "var(--color-success)"
                    : "var(--color-text-primary)",
                }}
              >
                {node.label}
              </div>
              {node.description && (
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-tertiary)",
                    marginTop: 1,
                  }}
                >
                  {node.description}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div
            style={{
              display: "flex",
              gap: 2,
              opacity: 0.5,
              transition: "opacity 0.15s",
            }}
            className="node-actions"
          >
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: "var(--color-text-tertiary)",
              }}
              title="Edit"
            >
              <Pencil size={12} />
            </button>
            <button
              onClick={() => onAdd(node.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: "var(--color-text-tertiary)",
              }}
              title="Add child"
            >
              <Plus size={12} />
            </button>
            {depth > 0 && (
              <button
                onClick={() => onRemove(node.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  color: "var(--color-danger)",
                }}
                title="Remove"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Children */}
      {node.isExpanded && node.children.length > 0 && (
        <div
          style={{
            borderLeft: depth > 0 ? "1px solid var(--color-border)" : "none",
            marginLeft: depth * 24 + 10,
          }}
        >
          {node.children.map((child) => (
            <MetricNodeComponent
              key={child.id}
              node={child}
              depth={depth + 1}
              onToggle={onToggle}
              onEdit={onEdit}
              onAdd={onAdd}
              onRemove={onRemove}
              onValidate={onValidate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
