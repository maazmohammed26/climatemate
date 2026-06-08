import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Trash2, Leaf } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useStore } from "@/lib/store";
import {
  emissionFactors,
  categories,
  type EmissionCategory,
} from "@/lib/emissionFactors";
import { calculateCO2 } from "@/lib/carbon";

export const Route = createFileRoute("/_app/add-activity")({
  component: AddActivity,
});

function AddActivity() {
  const { addActivity, activities, deleteActivity } = useStore();
  const navigate = useNavigate();

  const [category, setCategory] = useState<EmissionCategory>("Transport");
  const types = useMemo(
    () => Object.keys(emissionFactors[category]),
    [category],
  );
  const [type, setType] = useState(types[0]);
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

  const unit = emissionFactors[category][type]?.unit ?? "";
  const preview = calculateCO2(category, type, quantity || 0);

  const onCategory = (c: EmissionCategory) => {
    setCategory(c);
    setType(Object.keys(emissionFactors[c])[0]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = Number(quantity);
    if (!q || q <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }
    addActivity({ category, type, quantity: q, unit, date, note });
    toast.success(`Logged ${preview} kg CO₂ for ${type}.`);
    navigate({ to: "/dashboard" });
  };

  const recent = activities.slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Add Activity
        </h1>
        <p className="text-muted-foreground">
          Log an activity and we'll calculate the CO₂ instantly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onCategory(c)}
                    className={
                      "rounded-2xl px-4 py-2 text-sm font-semibold transition-colors " +
                      (category === c
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-white/50 text-foreground/70 hover:bg-white/70")
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Activity Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-2xl border border-input bg-white/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Quantity ({unit})
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={`e.g. 10 ${unit}`}
                  className="w-full rounded-2xl border border-input bg-white/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-input bg-white/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Note (optional)
                </label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Office commute"
                  className="w-full rounded-2xl border border-input bg-white/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary/15 to-accent/15 p-4">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Leaf className="size-4 text-primary" /> Estimated CO₂
              </span>
              <span className="font-display text-2xl font-bold text-primary">
                {preview} kg
              </span>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              Save Activity
            </button>
          </form>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-4 font-display font-semibold">Recent Activities</h3>
          {recent.length ? (
            <ul className="space-y-3">
              {recent.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between rounded-2xl bg-white/40 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{a.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.quantity} {a.unit} · {a.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">
                      {a.co2} kg
                    </span>
                    <button
                      onClick={() => {
                        deleteActivity(a.id);
                        toast.success("Activity removed.");
                      }}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No activities yet. Add your first one!
            </p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
