import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  accent?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "var(--chart-1)",
  className,
}: StatCardProps) {
  return (
    <GlassCard className={cn("p-5 transition-transform hover:-translate-y-1", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight">
            {value}
          </p>
          {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
        </div>
        <span
          className="flex size-11 items-center justify-center rounded-2xl"
          style={{ background: `color-mix(in oklab, ${accent} 18%, white)` }}
        >
          <Icon className="size-5" style={{ color: accent }} />
        </span>
      </div>
    </GlassCard>
  );
}
