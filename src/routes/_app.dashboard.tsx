import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CloudFog,
  CalendarDays,
  CalendarRange,
  Flame,
  Target,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Leaf,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { EcoScoreRing } from "@/components/EcoScoreRing";
import { useStore, useSummary } from "@/lib/store";
import { dailyTrend } from "@/lib/carbon";
import { categories, categoryColors } from "@/lib/emissionFactors";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user, activities } = useStore();
  const summary = useSummary();
  const trend = dailyTrend(activities, 7);

  const pieData = categories
    .map((c) => ({ name: c, value: Number(summary.byCategory[c].toFixed(2)) }))
    .filter((d) => d.value > 0);

  const goalPct = Math.min(
    100,
    Math.round((summary.monthlyCO2 / (user?.monthlyGoal || 120)) * 100),
  );

  const weekDelta = summary.weeklyCO2 - summary.lastWeekCO2;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your carbon footprint overview.
          </p>
        </div>
        <Link
          to="/add-activity"
          className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
        >
          + Add Activity
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today's CO₂"
          value={`${summary.todayCO2} kg`}
          icon={CalendarDays}
          accent="var(--chart-1)"
        />
        <StatCard
          label="This Week"
          value={`${summary.weeklyCO2} kg`}
          sub={
            weekDelta <= 0
              ? `${Math.abs(weekDelta).toFixed(1)} kg less than last week`
              : `${weekDelta.toFixed(1)} kg more than last week`
          }
          icon={CalendarRange}
          accent="var(--chart-2)"
        />
        <StatCard
          label="This Month"
          value={`${summary.monthlyCO2} kg`}
          icon={CloudFog}
          accent="var(--chart-3)"
        />
        <StatCard
          label="Top Category"
          value={summary.highestCategory}
          icon={Flame}
          accent="var(--chart-5)"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Eco score + goal */}
        <GlassCard className="flex flex-col items-center justify-center gap-4 p-6">
          <EcoScoreRing score={summary.ecoScore} />
          <p className="text-center text-sm text-muted-foreground">
            {summary.ecoScore >= 75
              ? "Great job! You're living lean and green."
              : summary.ecoScore >= 50
                ? "Solid progress — a few swaps will push you higher."
                : "Room to improve. Try the AI Eco Coach for tips."}
          </p>
        </GlassCard>

        {/* Daily trend */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            <h3 className="font-display font-semibold">Daily Footprint Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 180)" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={28} />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid var(--glass-border)",
                  background: "rgba(255,255,255,0.9)",
                }}
                formatter={(v) => [`${v} kg`, "CO₂"]}
              />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="var(--chart-1)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--chart-1)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category pie */}
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display font-semibold">
            Emissions by Category
          </h3>
          {pieData.length ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {pieData.map((d) => (
                    <Cell
                      key={d.name}
                      fill={categoryColors[d.name as keyof typeof categoryColors]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} kg`, "CO₂"]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyHint />
          )}
          <div className="mt-2 flex flex-wrap gap-3">
            {pieData.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs">
                <span
                  className="size-2.5 rounded-full"
                  style={{
                    background:
                      categoryColors[d.name as keyof typeof categoryColors],
                  }}
                />
                {d.name} · {d.value} kg
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Weekly comparison */}
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display font-semibold">Weekly Comparison</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={[
                { name: "Last Week", co2: summary.lastWeekCO2 },
                { name: "This Week", co2: summary.weeklyCO2 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 180)" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} width={28} />
              <Tooltip formatter={(v) => [`${v} kg`, "CO₂"]} />
              <Bar dataKey="co2" radius={[12, 12, 0, 0]} fill="var(--chart-2)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center gap-2 text-sm">
            {weekDelta <= 0 ? (
              <TrendingDown className="size-4 text-primary" />
            ) : (
              <TrendingUp className="size-4 text-destructive" />
            )}
            <span className="text-muted-foreground">
              {weekDelta <= 0
                ? `You cut ${Math.abs(weekDelta).toFixed(1)} kg vs last week.`
                : `Up ${weekDelta.toFixed(1)} kg vs last week — let's fix that.`}
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Goal + why it matters + saved */}
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Target className="size-4 text-primary" />
            <h3 className="font-display font-semibold">Monthly Goal Progress</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {summary.monthlyCO2} kg of {user?.monthlyGoal} kg budget used
          </p>
          <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${goalPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {goalPct < 100
              ? `${100 - goalPct}% of your monthly budget remaining.`
              : "You've exceeded your monthly budget."}
          </p>
        </GlassCard>

        <GlassCard className="bg-gradient-to-br from-primary/15 to-accent/15 p-6">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h3 className="font-display font-semibold">Why this matters</h3>
          </div>
          <p className="text-sm text-foreground/80">
            Every kilogram of CO₂ you avoid is real climate impact. Your total
            tracked footprint is{" "}
            <span className="font-bold text-primary">
              {summary.totalCO2} kg
            </span>
            . Get personalized ways to lower it with your AI Eco Coach.
          </p>
          <Link
            to="/insights"
            className="mt-4 inline-block rounded-2xl bg-white/60 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/80"
          >
            Open AI Eco Coach →
          </Link>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-2 flex items-center gap-2">
            <Leaf className="size-4 text-primary" />
            <h3 className="font-display font-semibold">Carbon Saved</h3>
          </div>
          <p className="mt-2 font-display text-4xl font-bold text-primary">
            {summary.monthlyCO2 < (user?.monthlyGoal || 120) 
              ? ((user?.monthlyGoal || 120) - summary.monthlyCO2).toFixed(1) 
              : "0.0"} <span className="text-lg">kg CO₂</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Saved this month by staying under your budget. Keep up the great work!
          </p>
          <p className="mt-4 text-xs font-medium text-primary">
            You saved {(summary.monthlyCO2 < (user?.monthlyGoal || 120) ? (((user?.monthlyGoal || 120) - summary.monthlyCO2) / 0.192).toFixed(0) : 0)} km worth of car travel!
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

function EmptyHint() {
  return (
    <div className="grid h-[260px] place-items-center text-center text-sm text-muted-foreground">
      <div>
        No activities yet.
        <br />
        <Link to="/add-activity" className="font-semibold text-primary">
          Add your first activity
        </Link>
      </div>
    </div>
  );
}
