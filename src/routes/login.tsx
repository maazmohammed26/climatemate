import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf, Mail, Lock, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/GlassCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — CarbonMate AI" },
      {
        name: "description",
        content: "Log in to CarbonMate AI or continue with the demo account.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const { login, loginDemo, user, hydrated } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && user) navigate({ to: "/dashboard" });
  }, [hydrated, user, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (login(email, password)) {
      toast.success("Welcome to CarbonMate AI!");
      navigate({ to: "/dashboard" });
    } else {
      setError("Invalid credentials. Try the demo account.");
    }
  };

  const demo = () => {
    loginDemo();
    toast.success("Logged in as Demo User.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <GlassCard className="w-full max-w-md p-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back home
        </Link>

        <div className="mb-6 flex items-center gap-2">
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold">CarbonMate AI</h1>
            <p className="text-xs text-muted-foreground">
              Sign in to your dashboard
            </p>
          </div>
        </div>

        <button
          onClick={demo}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
        >
          <Sparkles className="size-4" /> Continue with Demo Account
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or sign in with email
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@carbonmate.app"
                className="w-full rounded-2xl border border-input bg-white/60 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Demo@123"
                className="w-full rounded-2xl border border-input bg-white/60 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-white/60 py-3 font-bold transition-colors hover:bg-white/80"
          >
            Sign In
          </button>
        </form>

        <p className="mt-5 rounded-2xl bg-accent/20 px-4 py-3 text-center text-xs text-muted-foreground">
          Judges: use{" "}
          <span className="font-semibold text-foreground">
            demo@carbonmate.app
          </span>{" "}
          / <span className="font-semibold text-foreground">Demo@123</span> or
          the demo button above.
        </p>
      </GlassCard>
    </div>
  );
}
