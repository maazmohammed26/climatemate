import type { Activity } from "./carbon";

export const demoUser = {
  name: "Demo User",
  email: "demo@carbonmate.app",
  password: "Demo@123",
  city: "Bangalore",
  monthlyGoal: 120,
};

export const demoActivities: Activity[] = [
  { id: "a1", category: "Transport", type: "Car", quantity: 12, unit: "km", co2: 2.3, date: "2026-06-01", note: "Office commute" },
  { id: "a2", category: "Transport", type: "Metro", quantity: 18, unit: "km", co2: 0.74, date: "2026-06-02", note: "Metro travel" },
  { id: "a3", category: "Food", type: "Veg Meal", quantity: 2, unit: "meal", co2: 3.0, date: "2026-06-02", note: "Lunch and dinner" },
  { id: "a4", category: "Food", type: "Non-Veg Meal", quantity: 1, unit: "meal", co2: 5.0, date: "2026-06-03", note: "Dinner" },
  { id: "a5", category: "Electricity", type: "Electricity Usage", quantity: 5, unit: "kWh", co2: 4.1, date: "2026-06-04", note: "Home electricity" },
  { id: "a6", category: "Shopping", type: "Online Order", quantity: 1, unit: "order", co2: 2.0, date: "2026-06-05", note: "Online delivery" },
  { id: "a7", category: "Waste", type: "Plastic Waste", quantity: 0.5, unit: "kg", co2: 3.0, date: "2026-06-06", note: "Plastic packaging" },
];
