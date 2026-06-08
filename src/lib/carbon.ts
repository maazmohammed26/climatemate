import {
  emissionFactors,
  categories,
  type EmissionCategory,
} from "./emissionFactors";

export interface Activity {
  id: string;
  category: EmissionCategory;
  type: string;
  quantity: number;
  unit: string;
  co2: number;
  date: string;
  note?: string;
}

export function calculateCO2(
  category: EmissionCategory,
  type: string,
  quantity: number | string,
): number {
  const factorData = emissionFactors?.[category]?.[type];
  if (!factorData) return 0;

  const numericQuantity = Number(quantity);
  if (!numericQuantity || numericQuantity < 0) return 0;

  return Number((numericQuantity * factorData.factor).toFixed(2));
}

export function calculateEcoScore(
  monthlyCO2: number,
  monthlyGoal: number,
  completedChallenges = 0,
): number {
  if (!monthlyGoal || monthlyGoal <= 0) return 50;

  const goalRatio = monthlyCO2 / monthlyGoal;
  let score = 100 - goalRatio * 60;
  score += completedChallenges * 3;

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return Math.round(score);
}

function daysAgo(dateStr: string, ref: Date): number {
  const d = new Date(dateStr);
  return Math.floor((ref.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

export interface CarbonSummary {
  todayCO2: number;
  weeklyCO2: number;
  monthlyCO2: number;
  totalCO2: number;
  highestCategory: string;
  byCategory: Record<EmissionCategory, number>;
  transportCO2: number;
  foodCO2: number;
  electricityCO2: number;
  shoppingCO2: number;
  wasteCO2: number;
  ecoScore: number;
  lastWeekCO2: number;
}

export function buildSummary(
  activities: Activity[],
  monthlyGoal: number,
  completedChallenges = 0,
  refDate: Date = new Date(),
): CarbonSummary {
  const byCategory = categories.reduce(
    (acc, c) => ({ ...acc, [c]: 0 }),
    {} as Record<EmissionCategory, number>,
  );

  let todayCO2 = 0;
  let weeklyCO2 = 0;
  let monthlyCO2 = 0;
  let totalCO2 = 0;
  let lastWeekCO2 = 0;

  for (const a of activities) {
    const diff = daysAgo(a.date, refDate);
    totalCO2 += a.co2;
    byCategory[a.category] = (byCategory[a.category] ?? 0) + a.co2;
    if (diff === 0) todayCO2 += a.co2;
    if (diff >= 0 && diff < 7) weeklyCO2 += a.co2;
    if (diff >= 7 && diff < 14) lastWeekCO2 += a.co2;
    if (diff >= 0 && diff < 30) monthlyCO2 += a.co2;
  }

  let highestCategory = "None";
  let highest = -Infinity;
  for (const c of categories) {
    if (byCategory[c] > highest) {
      highest = byCategory[c];
      highestCategory = c;
    }
  }

  const round = (n: number) => Number(n.toFixed(2));

  return {
    todayCO2: round(todayCO2),
    weeklyCO2: round(weeklyCO2),
    monthlyCO2: round(monthlyCO2),
    totalCO2: round(totalCO2),
    lastWeekCO2: round(lastWeekCO2),
    highestCategory,
    byCategory,
    transportCO2: round(byCategory.Transport),
    foodCO2: round(byCategory.Food),
    electricityCO2: round(byCategory.Electricity),
    shoppingCO2: round(byCategory.Shopping),
    wasteCO2: round(byCategory.Waste),
    ecoScore: calculateEcoScore(monthlyCO2, monthlyGoal, completedChallenges),
  };
}

export function dailyTrend(
  activities: Activity[],
  days = 7,
  refDate: Date = new Date(),
): { date: string; label: string; co2: number }[] {
  const result: { date: string; label: string; co2: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(refDate);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const co2 = activities
      .filter((a) => a.date === key)
      .reduce((s, a) => s + a.co2, 0);
    result.push({
      date: key,
      label: d.toLocaleDateString("en", { weekday: "short" }),
      co2: Number(co2.toFixed(2)),
    });
  }
  return result;
}
