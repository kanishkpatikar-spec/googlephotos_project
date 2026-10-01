"use client";

import { usePathname } from "next/navigation";
import { ModeIndicator } from "@/components/shared/mode-indicator";

const routeTitles: Record<string, string> = {
  "/dashboard": "Project Overview",
  "/metrics": "Metric Tree",
  "/evidence/ingest": "Evidence Ingestion",
  "/discovery": "Discovery Dashboard",
  "/evidence": "Evidence Explorer",
  "/discovery/memory": "Memory Cue Analysis",
  "/discovery/failures": "Retrieval Failure Map",
  "/opportunities": "Opportunity Areas",
  "/research/interviews": "User Interviews",
  "/research/synthesis": "Research Synthesis",
  "/problem": "Problem Definition",
  "/mvp": "MVP",
  "/testing": "User Testing",
  "/results": "Results",
  "/metrics/framework": "Metrics Framework",
  "/risks": "Risks",
};

export function Header() {
  const pathname = usePathname();
  const title = routeTitles[pathname] || "Google Photos Retrieval";

  // Build breadcrumb from path
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }));

  return (
    <header className="app-header">
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-tertiary)" }}>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {i > 0 && <span>/</span>}
              <span
                style={{
                  color: i === breadcrumbs.length - 1 ? "var(--color-text-primary)" : undefined,
                  fontWeight: i === breadcrumbs.length - 1 ? 500 : undefined,
                }}
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>
      <ModeIndicator />
    </header>
  );
}
