import Link from "next/link";
import { Card } from "@/components/ui/card";

interface StatusCardProps {
  label: string;
  value: number;
  href: string;
}

export function StatusCard({ label, value, href }: StatusCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card
        style={{
          cursor: "pointer",
          transition: "border-color 0.15s ease",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--color-text-primary)",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--color-text-secondary)",
          }}
        >
          {label}
        </div>
      </Card>
    </Link>
  );
}
