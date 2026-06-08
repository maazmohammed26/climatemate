import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf,
  Sparkles,
  GitCompareArrows,
  Trophy,
  BarChart3,
  Brain,
  ArrowRight,
  Github,
  Car,
  Utensils,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CarbonMate AI — AI Carbon Footprint Tracker" },
      {
        name: "description",
        content:
          "Track, understand and reduce your daily carbon emissions with a premium glassmorphism dashboard, eco score and AI-powered insights.",
      },
      { property: "og:title", content: "CarbonMate AI" },
      {
        property: "og:description",
        content:
          "AI-powered carbon footprint awareness platform with eco score, challenges and a glassmorphism dashboard.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: BarChart3,
    title: "Visual Dashboard",
    desc: "Daily, weekly and monthly CO₂ with category charts and trends.",
  },
  {
    icon: Brain,
    title: "AI Eco Coach",
    desc: "Personalized tips, weekly reports and challenges from your data.",
  },
  {
    icon: GitCompareArrows,
    title: "What-If Simulator",
    desc: "Compare two choices and see exactly how much CO₂ you'd save.",
  },
  {
    icon: Trophy,
    title: "Eco Challenges",
    desc: "Gamified actions that boost your eco score and cut emissions.",
  },
];

const categoryIcons = [
  { icon: Car, label: "Transport" },
  { icon: Utensils, label: "Food" },
  { icon: Zap, label: "Electricity" },
];

function Landing() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Nav */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="font-display text-lg font-bold">CarbonMate AI</span>
        </div>
        <Link
          to="/login"
          className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
        >
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <section className="grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" /> AI-Powered Sustainability
          </span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Track your <span className="text-gradient">carbon footprint</span>,
            powered by AI.
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            CarbonMate AI helps you understand and reduce your daily emissions
            with accurate calculations, a beautiful dashboard and an AI eco
            coach.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="size-4" /> Continue with Demo Account
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-white/60 px-6 py-3.5 font-semibold transition-colors hover:bg-white/80"
            >
              <Github className="size-4" /> GitHub
            </a>
          </div>
        </div>

        {/* Hero card preview */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Eco Score</p>
            <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Demo
            </span>
          </div>
          <p className="mt-1 font-display text-5xl font-bold text-gradient">76</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {categoryIcons.map((c) => (
              <div
                key={c.label}
                className="glass-soft flex flex-col items-center gap-1.5 rounded-2xl p-3"
              >
                <c.icon className="size-5 text-primary" />
                <span className="text-xs font-medium">{c.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {[
              { l: "This Week", v: "13.1 kg" },
              { l: "This Month", v: "19.1 kg" },
              { l: "Top Category", v: "Food" },
            ].map((r) => (
              <div
                key={r.l}
                className="flex items-center justify-between rounded-2xl bg-white/40 px-4 py-2.5 text-sm"
              >
                <span className="text-muted-foreground">{r.l}</span>
                <span className="font-bold">{r.v}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* Problem / Solution */}
      <section className="grid gap-6 py-8 md:grid-cols-2">
        <GlassCard className="p-7">
          <h2 className="font-display text-xl font-bold">The Problem</h2>
          <p className="mt-3 text-muted-foreground">
            Most people care about climate change but don't know how their daily
            habits add up. Existing carbon calculators are complex, static and
            boring — so nobody uses them.
          </p>
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-primary/15 to-accent/15 p-7">
          <h2 className="font-display text-xl font-bold">Our Solution</h2>
          <p className="mt-3 text-foreground/80">
            Log everyday activities, get instant CO₂ estimates from fixed
            emission factors, and let AI turn your numbers into simple,
            actionable steps — all in a premium glass dashboard.
          </p>
        </GlassCard>
      </section>

      {/* Features */}
      <section className="py-10">
        <h2 className="text-center font-display text-3xl font-bold">
          Everything you need to go greener
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <GlassCard
              key={f.title}
              className="p-6 transition-transform hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/15">
                <f.icon className="size-5 text-primary" />
              </span>
              <h3 className="mt-4 font-display font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* AI section */}
      <GlassCard className="my-10 flex flex-col items-center gap-4 bg-gradient-to-br from-primary/15 to-accent/15 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-3xl bg-white/60">
          <Brain className="size-7 text-primary" />
        </span>
        <h2 className="font-display text-3xl font-bold">
          AI for insights, not calculations
        </h2>
        <p className="max-w-xl text-muted-foreground">
          CarbonMate AI keeps carbon math precise with fixed emission factors,
          and uses AI only for tips, weekly reports and eco challenges — so
          results stay accurate and trustworthy.
        </p>
        <Link
          to="/login"
          className="mt-2 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
        >
          Try the live demo <ArrowRight className="size-4" />
        </Link>
      </GlassCard>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        Built with 💚 for PromptWars · CarbonMate AI
      </footer>
    </div>
  );
}
