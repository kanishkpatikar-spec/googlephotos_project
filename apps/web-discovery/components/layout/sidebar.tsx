"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitBranch,
  FileInput,
  BarChart3,
  Search,
  Brain,
  AlertTriangle,
  Lightbulb,
  Users,
  FlaskConical,
  Target,
  Smartphone,
  ClipboardCheck,
  TrendingUp,
  Gauge,
  ShieldAlert,
} from "lucide-react";

const researchLinks = [
  { href: "/dashboard", label: "Project Overview", icon: LayoutDashboard },
  { href: "/metrics", label: "Metric Tree", icon: GitBranch },
  { href: "/evidence/ingest", label: "Evidence Ingestion", icon: FileInput },
  { href: "/discovery", label: "Discovery Dashboard", icon: BarChart3 },
  { href: "/evidence", label: "Evidence Explorer", icon: Search },
  { href: "/discovery/memory", label: "Memory Cue Analysis", icon: Brain },
  {
    href: "/discovery/failures",
    label: "Retrieval Failure Map",
    icon: AlertTriangle,
  },
  { href: "/opportunities", label: "Opportunity Areas", icon: Lightbulb },
  { href: "/research/interviews", label: "User Interviews", icon: Users },
  {
    href: "/research/synthesis",
    label: "Research Synthesis",
    icon: FlaskConical,
  },
  { href: "/problem", label: "Problem Definition", icon: Target },
];

const mvpLinks = [
  { href: "/mvp", label: "MVP", icon: Smartphone },
  { href: "/testing", label: "User Testing", icon: ClipboardCheck },
  { href: "/results", label: "Results", icon: TrendingUp },
  { href: "/metrics/framework", label: "Metrics Framework", icon: Gauge },
  { href: "/risks", label: "Risks", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar">
      <div className="sidebar-logo">
        <div className="icon">📷</div>
        <span>Photos Retrieval</span>
      </div>

      <nav style={{ flex: 1, overflowY: "auto" }}>
        <div className="sidebar-section">
          <div className="sidebar-section-label">Research</div>
          {researchLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/evidence" &&
                link.href !== "/discovery" &&
                pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
              >
                <Icon className="icon" size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-label">MVP & Testing</div>
          {mvpLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
              >
                <Icon className="icon" size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
