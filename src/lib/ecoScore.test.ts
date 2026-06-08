import { describe, it, expect } from "vitest";
import { calculateEcoScore } from "./carbon";

describe("calculateEcoScore", () => {
  it("returns 50 if monthly goal is invalid", () => {
    expect(calculateEcoScore(100, 0)).toBe(50);
  });

  it("calculates score correctly based on ratio", () => {
    // goal = 100, used = 50 -> ratio = 0.5. Score = 100 - (0.5 * 60) = 70
    expect(calculateEcoScore(50, 100)).toBe(70);
  });

  it("adds bonus for completed challenges", () => {
    // goal = 100, used = 50 -> ratio = 0.5. Score = 70 + (2 * 3) = 76
    expect(calculateEcoScore(50, 100, 2)).toBe(76);
  });

  it("caps the score at 100", () => {
    expect(calculateEcoScore(10, 100, 20)).toBe(100);
  });

  it("floors the score at 0", () => {
    expect(calculateEcoScore(500, 100)).toBe(0);
  });
});
