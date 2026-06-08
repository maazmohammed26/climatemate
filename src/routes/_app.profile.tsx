import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Target,
  Leaf,
  Award,
  Share2,
  CloudFog,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { EcoScoreRing } from "@/components/EcoScoreRing";
import { useStore, useSummary } from "@/lib/store";

export const Route = createFileRoute("/_app/profile")({
  component: Profile,
});

function Profile() {
  const { user, activities, completedChallenges, updateGoal } = useStore();
  const summary = useSummary();
  const [goal, setGoal] = useState(String(user?.monthlyGoal ?? 120));

  const badges = [
    { id: "starter", label: "Getting Started", earned: activities.length > 0 },
    {
      id: "tracker",
      label: "Active Tracker",
      earned: activities.length >= 5,
    },
    {
      id: "challenger",
      label: "Challenge Taker",
      earned: completedChallenges.length >= 1,
    },
    {
      id: "champion",
      label: "Eco Champion",
      earned: summary.ecoScore >= 75,
    },
  ];

  const shareLinkedIn = () => {
    const text = `🌱 I'm tracking my carbon footprint with CarbonMate AI! My eco score is ${summary.ecoScore}/100 and I've logged ${summary.totalCO2} kg CO₂ across ${activities.length} activities. Small swaps, big impact. #Sustainability #ClimateAction #CarbonMateAI`;
    navigator.clipboard?.writeText(text);
    toast.success("Eco progress post copied — paste it on LinkedIn!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Profile
        </h1>
        <p className="text-muted-foreground">Your account and eco journey.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center gap-4 p-6 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground">
            {user?.name?.[0]?.toUpperCase()}
          </span>
          <div>
            <p className="font-display text-xl font-bold">{user?.name}</p>
            {user?.isDemo && (
              <span className="mt-1 inline-block rounded-full bg-accent/40 px-3 py-0.5 text-xs font-semibold text-accent-foreground">
                Demo Account
              </span>
            )}
          </div>
          <div className="w-full space-y-2 text-left text-sm">
            <p className="flex items-center gap-2 text-muted-foreground">
              <Mail className="size-4" /> {user?.email}
            </p>
            {user?.city && (
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4" /> {user.city}
              </p>
            )}
            <p className="flex items-center gap-2 text-muted-foreground">
              <Target className="size-4" /> Monthly goal: {user?.monthlyGoal} kg
            </p>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center gap-3 p-6">
          <EcoScoreRing score={summary.ecoScore} />
          <p className="text-sm text-muted-foreground">Your current eco score</p>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary/15">
              <CloudFog className="size-5 text-primary" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold">
                {summary.totalCO2} kg
              </p>
              <p className="text-xs text-muted-foreground">
                Total footprint tracked
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-accent/30">
              <Leaf className="size-5 text-primary" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold">
                {activities.length}
              </p>
              <p className="text-xs text-muted-foreground">Activities logged</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="mb-4 font-display font-semibold">Monthly CO₂ Goal</h3>
          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-2xl border border-input bg-white/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => {
                const g = Number(goal);
                if (g > 0) {
                  updateGoal(g);
                  toast.success("Monthly goal updated.");
                }
              }}
              className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-5 text-sm font-bold text-primary-foreground"
            >
              Save
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Lowering your goal makes your eco score harder to keep high — aim
            realistic.
          </p>

          <button
            onClick={shareLinkedIn}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/60 py-3 text-sm font-semibold transition-colors hover:bg-white/80"
          >
            <Share2 className="size-4 text-primary" />
            Generate LinkedIn eco progress post
          </button>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-4 font-display font-semibold">Badges Earned</h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={
                  "flex items-center gap-3 rounded-2xl p-3 " +
                  (b.earned ? "bg-primary/10" : "bg-white/30 opacity-60")
                }
              >
                <Award
                  className={
                    "size-6 " +
                    (b.earned ? "text-primary" : "text-muted-foreground")
                  }
                />
                <span className="text-sm font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
