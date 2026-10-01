"use client";

import { useState } from "react";

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  children?: React.ReactNode;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const [active, setActive] = useState(activeTab || tabs[0]?.id);

  const handleClick = (tabId: string) => {
    setActive(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        borderBottom: "1px solid var(--color-border)",
        marginBottom: 16,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          style={{
            padding: "8px 14px",
            fontSize: 13,
            fontWeight: (activeTab || active) === tab.id ? 500 : 400,
            color:
              (activeTab || active) === tab.id
                ? "var(--color-accent)"
                : "var(--color-text-secondary)",
            background: "transparent",
            border: "none",
            borderBottom: `2px solid ${(activeTab || active) === tab.id ? "var(--color-accent)" : "transparent"}`,
            cursor: "pointer",
            transition: "all 0.15s ease",
            marginBottom: -1,
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
