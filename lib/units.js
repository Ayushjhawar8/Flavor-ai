// Minimal, robust converters for the units we care about.

const ALIASES = {
  g: ["g", "gram", "grams"],
  kg: ["kg", "kilogram", "kilograms"],
  ml: ["ml", "milliliter", "millilitre", "milliliters", "millilitres"],
  l: ["l", "liter", "litre", "liters", "litres"],
  tsp: ["tsp", "teaspoon", "teaspoons"],
  tbsp: ["tbsp", "tbs", "tblsp", "tablespoon", "tablespoons"],
  oz: ["oz", "ounce", "ounces"],
  lb: ["lb", "lbs", "pound", "pounds"],
  cup: ["cup", "cups"],
  qt: ["qt", "quart", "quarts"],
};
const CANON = {};
for (const [canon, names] of Object.entries(ALIASES)) {
  for (const n of names) CANON[n] = canon;
}

const CONVERT = {
  metricToUS: {
    g:   { unit: "oz",  factor: 0.03527396195 },
    kg:  { unit: "lb",  factor: 2.20462262185 },
    ml:  { unit: "cup", factor: 1 / 240 },       // 240 mL per US cup
    l:   { unit: "qt",  factor: 1.05668820943 },
    tsp: { unit: "tbsp", factor: 1 / 3 },        // 3 tsp = 1 tbsp
  },
  usToMetric: {
    oz:   { unit: "g",  factor: 1 / 0.03527396195 },
    lb:   { unit: "kg", factor: 1 / 2.20462262185 },
    cup:  { unit: "ml", factor: 240 },
    qt:   { unit: "l",  factor: 1 / 1.05668820943 },
    tbsp: { unit: "tsp", factor: 3 },
  },
};

function parseQuantity(q) {
  q = q.trim();
  const mixed = q.match(/^(\d+)\s+(\d+)\/(\d+)$/);      // "1 1/2"
  if (mixed) return +mixed[1] + (+mixed[2] / +mixed[3]);
  const frac = q.match(/^(\d+)\/(\d+)$/);               // "1/2"
  if (frac) return +frac[1] / +frac[2];
  const num = Number(q.replace(",", "."));             // "2.5"
  return Number.isNaN(num) ? null : num;
}

function parseMeasure(measure) {
  if (!measure) return null;
  const m = String(measure).trim();
  // number (int/float/fraction or mixed) + unit
  const re = /(\d+(?:\s+\d+\/\d+|\/\d+)?|\d*\.\d+)\s*([A-Za-z]+)\b/;
  const match = m.match(re);
  if (!match) return null;
  const qty = parseQuantity(match[1]);
  const unitRaw = match[2].toLowerCase();
  const unit = CANON[unitRaw] || unitRaw;
  return { qty, unit, raw: m };
}

function roundSmart(x) {
  if (x >= 10) return Math.round(x);
  if (x >= 1) return Math.round(x * 100) / 100;
  return Math.round(x * 1000) / 1000;
}

/**
 * Convert "raw" measure text into the selected system when the unit is recognized.
 * Otherwise, returns the original text.
 * @param {string} measure
 * @param {'metric'|'us'} targetSystem
 * @returns {string}
 */
export function formatMeasureForSystem(measure, targetSystem) {
  const parsed = parseMeasure(measure);
  if (!parsed || parsed.qty == null) return measure;

  const { qty, unit } = parsed;
  let converted = null;

  if (targetSystem === "us" && CONVERT.metricToUS[unit]) {
    const { unit: toUnit, factor } = CONVERT.metricToUS[unit];
    converted = { qty: qty * factor, unit: toUnit };
  } else if (targetSystem === "metric" && CONVERT.usToMetric[unit]) {
    const { unit: toUnit, factor } = CONVERT.usToMetric[unit];
    converted = { qty: qty * factor, unit: toUnit };
  }

  if (!converted) return measure;
  const val = roundSmart(converted.qty);
  return `${val} ${converted.unit}`;
}
