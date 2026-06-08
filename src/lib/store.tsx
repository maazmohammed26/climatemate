import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Activity } from "./carbon";
import { calculateCO2, buildSummary } from "./carbon";
import type { EmissionCategory } from "./emissionFactors";
import { demoUser, demoActivities } from "./demoData";

export interface User {
  name: string;
  email: string;
  city: string;
  monthlyGoal: number;
  isDemo: boolean;
}

interface PersistState {
  user: User | null;
  activities: Activity[];
  completedChallenges: string[];
}

interface StoreContextValue extends PersistState {
  hydrated: boolean;
  login: (email: string, password: string) => boolean;
  loginDemo: () => void;
  logout: () => void;
  addActivity: (input: {
    category: EmissionCategory;
    type: string;
    quantity: number;
    unit: string;
    date: string;
    note?: string;
  }) => void;
  deleteActivity: (id: string) => void;
  toggleChallenge: (id: string) => void;
  updateGoal: (goal: number) => void;
}

const STORAGE_KEY = "carbonmate-state-v1";

const StoreContext = createContext<StoreContextValue | null>(null);

function loadState(): PersistState {
  if (typeof window === "undefined")
    return { user: null, activities: [], completedChallenges: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, activities: [], completedChallenges: [] };
    const parsed = JSON.parse(raw);
    return {
      user: parsed.user ?? null,
      activities: parsed.activities ?? [],
      completedChallenges: parsed.completedChallenges ?? [],
    };
  } catch {
    return { user: null, activities: [], completedChallenges: [] };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistState>({
    user: null,
    activities: [],
    completedChallenges: [],
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const loginDemo = useCallback(() => {
    setState({
      user: {
        name: demoUser.name,
        email: demoUser.email,
        city: demoUser.city,
        monthlyGoal: demoUser.monthlyGoal,
        isDemo: true,
      },
      activities: demoActivities,
      completedChallenges: [],
    });
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      if (
        email.trim().toLowerCase() === demoUser.email &&
        password === demoUser.password
      ) {
        loginDemo();
        return true;
      }
      // Treat any other valid-looking credentials as a fresh personal account.
      if (email.includes("@") && password.length >= 4) {
        setState({
          user: {
            name: email.split("@")[0],
            email: email.trim(),
            city: "",
            monthlyGoal: 120,
            isDemo: false,
          },
          activities: [],
          completedChallenges: [],
        });
        return true;
      }
      return false;
    },
    [loginDemo],
  );

  const logout = useCallback(() => {
    setState({ user: null, activities: [], completedChallenges: [] });
  }, []);

  const addActivity = useCallback<StoreContextValue["addActivity"]>((input) => {
    const co2 = calculateCO2(input.category, input.type, input.quantity);
    const activity: Activity = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...input,
      co2,
    };
    setState((s) => ({ ...s, activities: [activity, ...s.activities] }));
  }, []);

  const deleteActivity = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      activities: s.activities.filter((a) => a.id !== id),
    }));
  }, []);

  const toggleChallenge = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      completedChallenges: s.completedChallenges.includes(id)
        ? s.completedChallenges.filter((c) => c !== id)
        : [...s.completedChallenges, id],
    }));
  }, []);

  const updateGoal = useCallback((goal: number) => {
    setState((s) => ({
      ...s,
      user: s.user ? { ...s.user, monthlyGoal: goal } : s.user,
    }));
  }, []);

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      hydrated,
      login,
      loginDemo,
      logout,
      addActivity,
      deleteActivity,
      toggleChallenge,
      updateGoal,
    }),
    [
      state,
      hydrated,
      login,
      loginDemo,
      logout,
      addActivity,
      deleteActivity,
      toggleChallenge,
      updateGoal,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useSummary() {
  const { activities, user, completedChallenges } = useStore();
  return useMemo(
    () =>
      buildSummary(
        activities,
        user?.monthlyGoal ?? 120,
        completedChallenges.length,
      ),
    [activities, user?.monthlyGoal, completedChallenges.length],
  );
}
