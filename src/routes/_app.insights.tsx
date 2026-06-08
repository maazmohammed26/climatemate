import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Lightbulb, Target, Trophy, RefreshCw, FileText } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useSummary } from "@/lib/store";
import { askPublicAI } from "@/lib/askPublicAI";
import {
  buildCarbonInsightPrompt,
  parseInsight,
  fallbackInsight,
  type AIInsight,
} from "@/lib/aiPrompts";

export const Route = createFileRoute("/_app/insights")({
  component: Insights,
});

function Insights() {
  const summary = useSummary();
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const generate = async () => {
    setLoading(true);
    setUsedFallback(false);
    try {
      const raw = await askPublicAI(buildCarbonInsightPrompt(summary));
      const parsed = parseInsight(raw);
      if (parsed) {
        setInsight(parsed);
      } else {
        setInsight(fallbackInsight(summary));
        setUsedFallback(true);
      }
    } catch {
      setInsight(fallbackInsight(summary));
      setUsedFallback(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            AI Eco Coach
          </h1>
          <p className="text-muted-foreground">
            Personalized tips, weekly report and a challenge based on your data.
          </p>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? (
            <RefreshCw className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {loading ? "Generating…" : insight ? "Regenerate" : "Generate Insights"}
        </button>
      </div>

      {!insight && !loading && (
        <GlassCard className="grid place-items-center p-12 text-center">
          <Sparkles className="mb-3 size-10 text-primary" />
          <p className="max-w-md text-muted-foreground">
            Tap <span className="font-semibold">Generate Insights</span> and your
            AI Eco Coach will analyze your footprint to suggest practical ways to
            cut emissions.
          </p>
        </GlassCard>
      )}

      {loading && (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <GlassCard key={i} className="h-40 animate-pulse p-6" />
          ))}
        </div>
      )}

      {insight && !loading && (
        <>
          {usedFallback && (
            <div className="rounded-2xl bg-accent/30 px-4 py-2 text-xs font-medium text-accent-foreground">
              AI service was busy — showing reliable fallback tips.
            </div>
          )}

          <GlassCard className="bg-gradient-to-br from-primary/15 to-accent/15 p-6">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              <h3 className="font-display font-semibold">Weekly Report</h3>
            </div>
            <p className="text-foreground/80">{insight.summary}</p>
          </GlassCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb className="size-4 text-primary" />
                <h3 className="font-display font-semibold">Personalized Tips</h3>
              </div>
              <ul className="space-y-3">
                {insight.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Target className="size-4 text-primary" />
                  <h3 className="font-display font-semibold">Weekly Goal</h3>
                </div>
                <p className="text-sm text-foreground/80">
                  {insight.weeklyGoal}
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Trophy className="size-4 text-primary" />
                  <h3 className="font-display font-semibold">
                    {insight.challenge.title}
                  </h3>
                </div>
                <p className="text-sm text-foreground/80">
                  {insight.challenge.description}
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    Saves ~{insight.challenge.estimatedSaving}
                  </span>
                  <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {insight.challenge.difficulty}
                  </span>
                </div>
              </GlassCard>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
