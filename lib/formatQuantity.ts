// Tiny "neat" formatter: prefers friendly cooking fractions (¼, ⅓, ½, ⅔, ¾),
// otherwise falls back to 1-decimal rounding.
export type UnitStyle = "auto" | "fraction" | "decimal";

/** Units that look nice as fractions (spoons/cups/oz). Extend as you wish. */
const FRACTION_UNITS = new Set([
  "tsp",
  "teaspoon",
  "teaspoons",
  "tbsp",
  "tablespoon",
  "tablespoons",
  "cup",
  "cups",
  "oz",
  "ounce",
  "ounces",
]);

const GLYPH: Record<string, string> = {
  "1/4": "¼",
  "1/3": "⅓",
  "1/2": "½",
  "2/3": "⅔",
  "3/4": "¾",
};

const FRIENDLY_FRACTIONS: Array<[number, number]> = [
  [1, 4],
  [1, 3],
  [1, 2],
  [2, 3],
  [3, 4],
];

/** Returns {intPart, fracGlyph | null} or null if not a friendly fraction */
function nearestFriendlyFraction(frac: number, tolerance = 0.06) {
  let best: { num: number; den: number; diff: number } | null = null;
  for (const [num, den] of FRIENDLY_FRACTIONS) {
    const v = num / den;
    const diff = Math.abs(frac - v);
    if (!best || diff < best.diff) best = { num, den, diff };
  }
  if (best && best.diff <= tolerance) {
    return `${GLYPH[`${best.num}/${best.den}`] ?? `${best.num}/${best.den}`}`;
  }
  return null;
}

export function formatQuantity(
  qty: number,
  style: UnitStyle = "auto",
  unit?: string,
): string {
  if (!Number.isFinite(qty)) return "";

  const preferFractions =
    style === "fraction" ||
    (style === "auto" &&
      (unit ? FRACTION_UNITS.has(unit.toLowerCase()) : false));

  // Round very close to whole numbers (e.g., 0.99 → 1)
  if (Math.abs(qty - Math.round(qty)) < 0.02) {
    return String(Math.round(qty));
  }

  if (preferFractions) {
    const whole = Math.floor(qty);
    const frac = qty - whole;
    const glyph = nearestFriendlyFraction(frac);
    if (glyph) {
      if (whole === 0) return glyph; // e.g., ½
      return `${whole} ${glyph}`; // e.g., 1 ¼
    }
  }

  // default: 1 decimal
  const rounded = Math.round(qty * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
