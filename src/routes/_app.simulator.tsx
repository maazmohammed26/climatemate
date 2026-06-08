import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, GitCompareArrows, Leaf, TrendingDown } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import {
  emissionFactors,
  categories,
  type EmissionCategory,
} from "@/lib/emissionFactors";
import { calculateCO2 } from "@/lib/carbon";

export const Route = createFileRoute("/_app/simulator")({
  component: Simulator,
});

function ChoiceBlock({
  title,
  category,
  setCategory,
  type,
  setType,
}: {
  title: string;
  category: EmissionCategory;
  setCategory: (c: EmissionCategory) => void;
  type: string;
  setType: (t: string) => void;
}) {
  const types = Object.keys(emissionFactors[category]);
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{title}</p>
      <select
        value={category}
        onChange={(e) => {
          const c = e.target.value as EmissionCategory;
          setCategory(c);
          setType(Object.keys(emissionFactors[c])[0]);
        }}
        className="w-full rounded-2xl border border-input bg-white/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-2xl border border-input bg-white/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        {types.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}

function Simulator() {
  const [quantity, setQuantity] = useState("10");
  const [catA, setCatA] = useState<EmissionCategory>("Transport");
  const [typeA, setTypeA] = useState("Car");
  const [catB, setCatB] = useState<EmissionCategory>("Transport");
  const [typeB, setTypeB] = useState("Metro");

  const q = Number(quantity) || 0;
  const co2A = useMemo(() => calculateCO2(catA, typeA, q), [catA, typeA, q]);
  const co2B = useMemo(() => calculateCO2(catB, typeB, q), [catB, typeB, q]);

  const saving = Number((co2A - co2B).toFixed(2));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          What-If Simulator
        </h1>
        <p className="text-muted-foreground">
          Compare two choices and see how much CO₂ you could save.
        </p>
      </div>

      <GlassCard className="p-6">
        <div className="mb-5 max-w-xs">
          <label className="mb-2 block text-sm font-medium">Quantity</label>
          <input
            type="number"
            min="0"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-2xl border border-input bg-white/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl bg-white/40 p-5">
            <ChoiceBlock
              title="Current Choice"
              category={catA}
              setCategory={setCatA}
              type={typeA}
              setType={setTypeA}
            />
            <p className="mt-4 font-display text-2xl font-bold text-destructive">
              {co2A} kg CO₂
            </p>
          </div>

          <div className="grid place-items-center">
            <GitCompareArrows className="size-7 text-primary" />
          </div>

          <div className="rounded-2xl bg-white/40 p-5">
            <ChoiceBlock
              title="Alternative Choice"
              category={catB}
              setCategory={setCatB}
              type={typeB}
              setType={setTypeB}
            />
            <p className="mt-4 font-display text-2xl font-bold text-primary">
              {co2B} kg CO₂
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="flex flex-col items-center gap-2 bg-gradient-to-br from-primary/15 to-accent/15 p-8 text-center">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {saving >= 0 ? (
            <TrendingDown className="size-4 text-primary" />
          ) : (
            <ArrowRight className="size-4 text-destructive" />
          )}
          Result
        </span>
        {saving > 0 ? (
          <p className="font-display text-3xl font-bold">
            You can save{" "}
            <span className="text-primary">{saving} kg CO₂</span>
          </p>
        ) : saving < 0 ? (
          <p className="font-display text-3xl font-bold">
            Alternative adds{" "}
            <span className="text-destructive">
              {Math.abs(saving)} kg CO₂
            </span>
          </p>
        ) : (
          <p className="font-display text-3xl font-bold">No difference</p>
        )}
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Leaf className="size-4 text-primary" />
          Small swaps add up over a year.
        </p>
      </GlassCard>
    </div>
  );
}
