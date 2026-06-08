import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Sparkles,
  GitCompareArrows,
  Trophy,
  User as UserIcon,
  Leaf,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-activity", label: "Add Activity", icon: PlusCircle },
  { to: "/insights", label: "AI Eco Coach", icon: Sparkles },
  { to: "/simulator", label: "What-If Simulator", icon: GitCompareArrows },
  { to: "/challenges", label: "Challenges", icon: Trophy },
  { to: "/profile", label: "Profile", icon: UserIcon },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { user, hydrated, logout } = useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!hydrated || !user) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Leaf className="size-8 animate-pulse text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "glass-card fixed inset-y-0 left-0 z-40 m-3 flex w-64 flex-col rounded-3xl p-5 transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-[120%]",
        )}
      >
        <Link to="/dashboard" className="flex items-center gap-2 px-1">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="font-display text-lg font-bold">CarbonMate</span>
        </Link>

        {user.isDemo && (
          <span className="mt-4 w-fit rounded-full bg-accent/40 px-3 py-1 text-xs font-semibold text-accent-foreground">
            Demo Mode
          </span>
        )}

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-foreground/70 hover:bg-white/40 hover:text-foreground",
                )}
              >
                <item.icon className="size-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => {
            logout();
            navigate({ to: "/login" });
          }}
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4.5" />
          Log out
        </button>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-[17.5rem]">
        <header className="sticky top-0 z-20 flex items-center justify-between p-4 lg:hidden">
          <button
            onClick={() => setOpen((o) => !o)}
            className="glass-card grid size-11 place-items-center"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <span className="font-display font-bold">CarbonMate AI</span>
          <span className="size-11" />
        </header>
        <main className="mx-auto max-w-6xl p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
