"use client";

import { MetricNodeComponent } from "./metric-node";

export interface MetricNode {
  id: string;
  label: string;
  description?: string;
  children: MetricNode[];
  isExpanded: boolean;
  isValidated: boolean;
}

interface MetricTreeProps {
  tree: MetricNode;
  onUpdate: (tree: MetricNode) => void;
}

export function MetricTree({ tree, onUpdate }: MetricTreeProps) {
  const handleToggle = (nodeId: string) => {
    onUpdate(toggleNode(tree, nodeId));
  };

  const handleEdit = (nodeId: string, label: string, description: string) => {
    onUpdate(editNode(tree, nodeId, label, description));
  };

  const handleAdd = (parentId: string) => {
    const newId = `node-${Date.now()}`;
    onUpdate(addChild(tree, parentId, newId));
  };

  const handleRemove = (nodeId: string) => {
    if (nodeId === tree.id) return; // Can't remove root
    onUpdate(removeNode(tree, nodeId));
  };

  const handleValidate = (nodeId: string) => {
    onUpdate(toggleValidation(tree, nodeId));
  };

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: 20,
      }}
    >
      <MetricNodeComponent
        node={tree}
        depth={0}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onValidate={handleValidate}
      />
    </div>
  );
}

// ─── Tree manipulation helpers ─────────────────

function toggleNode(node: MetricNode, targetId: string): MetricNode {
  if (node.id === targetId) {
    return { ...node, isExpanded: !node.isExpanded };
  }
  return {
    ...node,
    children: node.children.map((c) => toggleNode(c, targetId)),
  };
}

function editNode(
  node: MetricNode,
  targetId: string,
  label: string,
  description: string
): MetricNode {
  if (node.id === targetId) {
    return { ...node, label, description };
  }
  return {
    ...node,
    children: node.children.map((c) => editNode(c, targetId, label, description)),
  };
}

function addChild(
  node: MetricNode,
  parentId: string,
  newId: string
): MetricNode {
  if (node.id === parentId) {
    return {
      ...node,
      isExpanded: true,
      children: [
        ...node.children,
        {
          id: newId,
          label: "New metric",
          description: "",
          children: [],
          isExpanded: true,
          isValidated: false,
        },
      ],
    };
  }
  return {
    ...node,
    children: node.children.map((c) => addChild(c, parentId, newId)),
  };
}

function removeNode(node: MetricNode, targetId: string): MetricNode {
  return {
    ...node,
    children: node.children
      .filter((c) => c.id !== targetId)
      .map((c) => removeNode(c, targetId)),
  };
}

function toggleValidation(node: MetricNode, targetId: string): MetricNode {
  if (node.id === targetId) {
    return { ...node, isValidated: !node.isValidated };
  }
  return {
    ...node,
    children: node.children.map((c) => toggleValidation(c, targetId)),
  };
}
