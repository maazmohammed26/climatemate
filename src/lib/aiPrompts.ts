import type { CarbonSummary } from "./carbon";

export interface AIInsight {
  summary: string;
  tips: string[];
  weeklyGoal: string;
  challenge: {
    title: string;
    description: string;
    estimatedSaving: string;
    difficulty: string;
  };
}

export function buildCarbonInsightPrompt(summary: CarbonSummary): string {
  return `
You are CarbonMate AI, a friendly sustainability assistant.

Generate useful carbon footprint insights for the user.

Important rules:
- Return only valid JSON.
- Do not include markdown.
- Keep tips simple and practical.
- Do not make medical, legal, or financial claims.
- Do not calculate carbon values. Use the provided values only.

User carbon summary:
Weekly CO2: ${summary.weeklyCO2} kg
Monthly CO2: ${summary.monthlyCO2} kg
Highest category: ${summary.highestCategory}
Transport CO2: ${summary.transportCO2} kg
Food CO2: ${summary.foodCO2} kg
Electricity CO2: ${summary.electricityCO2} kg
Shopping CO2: ${summary.shoppingCO2} kg
Waste CO2: ${summary.wasteCO2} kg
Eco Score: ${summary.ecoScore}

Return JSON in this format:
{
  "summary": "short friendly summary",
  "tips": ["tip 1", "tip 2", "tip 3"],
  "weeklyGoal": "one realistic weekly goal",
  "challenge": {
    "title": "challenge title",
    "description": "challenge description",
    "estimatedSaving": "estimated saving in kg CO2",
    "difficulty": "Easy"
  }
}
`;
}

export function fallbackInsight(summary: CarbonSummary): AIInsight {
  const tipsByCategory: Record<string, string[]> = {
    Transport: [
      "Swap one car trip a week for metro or cycling.",
      "Combine errands into a single trip to cut mileage.",
      "Try carpooling for your daily commute.",
    ],
    Food: [
      "Add one extra plant-based meal each day.",
      "Plan meals to reduce food waste.",
      "Choose local, seasonal produce when possible.",
    ],
    Electricity: [
      "Switch to LED bulbs and unplug idle devices.",
      "Run appliances on full loads only.",
      "Set your AC 1-2 degrees higher to save energy.",
    ],
    Shopping: [
      "Bundle online orders to reduce delivery trips.",
      "Buy durable items you'll keep longer.",
      "Choose second-hand before buying new.",
    ],
    Waste: [
      "Separate recyclables from general waste.",
      "Carry a reusable bag and bottle.",
      "Compost food scraps where possible.",
    ],
  };

  const tips =
    tipsByCategory[summary.highestCategory] ?? tipsByCategory.Transport;

  return {
    summary: `Your highest impact area is ${summary.highestCategory}. Small daily swaps there will make the biggest difference. Your eco score is ${summary.ecoScore}.`,
    tips,
    weeklyGoal: `Reduce your ${summary.highestCategory.toLowerCase()} emissions by 10% this week.`,
    challenge: {
      title: `Cut down ${summary.highestCategory} impact`,
      description: `Focus on lowering your ${summary.highestCategory.toLowerCase()} footprint for the next 7 days.`,
      estimatedSaving: "2-4 kg CO2",
      difficulty: "Easy",
    },
  };
}

export function parseInsight(raw: string): AIInsight | null {
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    const obj = JSON.parse(raw.slice(start, end + 1));
    if (!obj.summary || !Array.isArray(obj.tips)) return null;
    return {
      summary: String(obj.summary),
      tips: obj.tips.map((t: unknown) => String(t)).slice(0, 5),
      weeklyGoal: String(obj.weeklyGoal ?? ""),
      challenge: {
        title: String(obj.challenge?.title ?? "Eco Challenge"),
        description: String(obj.challenge?.description ?? ""),
        estimatedSaving: String(obj.challenge?.estimatedSaving ?? ""),
        difficulty: String(obj.challenge?.difficulty ?? "Easy"),
      },
    };
  } catch {
    return null;
  }
}
