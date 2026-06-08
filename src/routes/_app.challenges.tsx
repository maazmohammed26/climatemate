import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle, Trophy, Leaf } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/GlassCard";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/challenges")({
  component: Challenges,
});

interface Challenge {
  id: string;
  title: string;
  description: string;
  saving: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const challenges: Challenge[] = [
  {
    id: "c1",
    title: "Meat-Free Day",
    description: "Replace all meat meals with veg meals for one full day.",
    saving: "3.5 kg CO₂",
    difficulty: "Easy",
  },
  {
    id: "c2",
    title: "Public Transit Commute",
    description: "Take the metro or bus instead of a car for your commute.",
    saving: "2 kg CO₂",
    difficulty: "Easy",
  },
  {
    id: "c3",
    title: "Zero Plastic Day",
    description: "Avoid single-use plastics for an entire day.",
    saving: "1.5 kg CO₂",
    difficulty: "Medium",
  },
  {
    id: "c4",
    title: "Unplug & Save",
    description: "Cut your home electricity use by 2 kWh today.",
    saving: "1.6 kg CO₂",
    difficulty: "Medium",
  },
  {
    id: "c5",
    title: "Cycle to Work Week",
    description: "Cycle or walk to work every day this week.",
    saving: "9 kg CO₂",
    difficulty: "Hard",
  },
  {
    id: "c6",
    title: "Buy Nothing Day",
    description: "Skip all non-essential shopping for 24 hours.",
    saving: "4 kg CO₂",
    difficulty: "Easy",
  },
];

const difficultyColor: Record<string, string> = {
  Easy: "bg-primary/15 text-primary",
  Medium: "bg-chart-4/20 text-accent-foreground",
  Hard: "bg-destructive/15 text-destructive",
};

function Challenges() {
  const { completedChallenges, toggleChallenge } = useStore();

  const done = challenges.filter((c) => completedChallenges.includes(c.id));
  const available = challenges.filter(
    (c) => !completedChallenges.includes(c.id),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Eco Challenges
        </h1>
        <p className="text-muted-foreground">
          Complete challenges to boost your eco score and cut emissions.
        </p>
      </div>

      <GlassCard className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-br from-primary/15 to-accent/15 p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/60">
            <Trophy className="size-6 text-primary" />
          </span>
          <div>
            <p className="font-display text-2xl font-bold">
              {done.length} / {challenges.length}
            </p>
            <p className="text-sm text-muted-foreground">Challenges completed</p>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
          <Leaf className="size-4" /> +{done.length * 3} eco score points earned
        </p>
      </GlassCard>

      {available.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold">Available</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((c) => (
              <ChallengeCard
                key={c.id}
                challenge={c}
                done={false}
                onToggle={() => {
                  toggleChallenge(c.id);
                  toast.success(`Challenge completed: ${c.title}`);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-lg font-semibold">Completed</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {done.map((c) => (
              <ChallengeCard
                key={c.id}
                challenge={c}
                done
                onToggle={() => toggleChallenge(c.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ChallengeCard({
  challenge,
  done,
  onToggle,
}: {
  challenge: Challenge;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <GlassCard className={cn("p-5", done && "opacity-80")}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold">{challenge.title}</h3>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
            difficultyColor[challenge.difficulty],
          )}
        >
          {challenge.difficulty}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{challenge.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          Saves ~{challenge.saving}
        </span>
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-1.5 text-sm font-semibold transition-colors",
            done ? "text-primary" : "text-foreground/60 hover:text-primary",
          )}
        >
          {done ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
          {done ? "Done" : "Mark done"}
        </button>
      </div>
    </GlassCard>
  );
}
