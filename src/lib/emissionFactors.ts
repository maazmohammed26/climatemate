export type EmissionCategory =
  | "Transport"
  | "Food"
  | "Electricity"
  | "Shopping"
  | "Waste";

export interface FactorData {
  factor: number;
  unit: string;
}

export const emissionFactors: Record<
  EmissionCategory,
  Record<string, FactorData>
> = {
  Transport: {
    Car: { factor: 0.192, unit: "km" },
    "Bike/Scooter": { factor: 0.103, unit: "km" },
    Bus: { factor: 0.089, unit: "km" },
    Metro: { factor: 0.041, unit: "km" },
    Train: { factor: 0.041, unit: "km" },
    "Walk/Cycle": { factor: 0, unit: "km" },
    Flight: { factor: 0.255, unit: "km" },
  },
  Food: {
    "Veg Meal": { factor: 1.5, unit: "meal" },
    "Non-Veg Meal": { factor: 5.0, unit: "meal" },
    "Dairy Item": { factor: 1.9, unit: "item" },
    "Packaged Food": { factor: 2.2, unit: "item" },
  },
  Electricity: {
    "Electricity Usage": { factor: 0.82, unit: "kWh" },
  },
  Shopping: {
    "Online Order": { factor: 2.0, unit: "order" },
    "Clothing Item": { factor: 6.5, unit: "item" },
    "Electronics Item": { factor: 25, unit: "item" },
  },
  Waste: {
    "Plastic Waste": { factor: 6.0, unit: "kg" },
    "Food Waste": { factor: 2.5, unit: "kg" },
    "Recycled Waste": { factor: -1.0, unit: "kg" },
  },
};

export const categories = Object.keys(emissionFactors) as EmissionCategory[];

export const categoryColors: Record<EmissionCategory, string> = {
  Transport: "var(--chart-1)",
  Food: "var(--chart-2)",
  Electricity: "var(--chart-3)",
  Shopping: "var(--chart-4)",
  Waste: "var(--chart-5)",
};
