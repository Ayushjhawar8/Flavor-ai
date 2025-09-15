// lib/shoppingList.ts
export type ShoppingItem = {
  name: string;
  qty: number | null;
  unit: string | null;
};

const STORAGE_KEY = "shoppingList";

/** Safe read from localStorage */
export function getShoppingList(): ShoppingItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

/** Safe write to localStorage */
export function saveShoppingList(list: ShoppingItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** Normalize name for merging */
function norm(name: string) {
  return name.trim().toLowerCase();
}

/** Loose number parser: supports unicode fractions, "2 1/2", "1,5", etc. */
function toNumberLoose(s: string): number {
  // normalize unicode fractions
  const fracMap: Record<string, string> = {
    "¼": "1/4",
    "½": "1/2",
    "¾": "3/4",
    "⅓": "1/3",
    "⅔": "2/3",
  };
  let t = s.replace(/[¼½¾⅓⅔]/g, m => fracMap[m] ?? m).trim();

  // mixed number "2 1/2"
  const mixed = t.match(/^(\d+(?:[.,]\d+)?)\s+(\d+)\/(\d+)$/);
  if (mixed) {
    const whole = parseFloat(mixed[1].replace(",", "."));
    const num = parseFloat(mixed[2]);
    const den = parseFloat(mixed[3]);
    return whole + num / den;
  }

  // simple fraction "3/4"
  const frac = t.match(/^(\d+)\/(\d+)$/);
  if (frac) {
    return Number(frac[1]) / Number(frac[2]);
  }

  // decimal (allow comma)
  const n = parseFloat(t.replace(",", "."));
  return Number.isNaN(n) ? NaN : n;
}

/** Parse free-form measure into qty/unit if possible.  */
export function parseMeasure(
  measure: string | null | undefined
): { qty: number | null; unit: string | null } {
  if (!measure) return { qty: null, unit: null };
  const m = measure.trim();
  if (!m) return { qty: null, unit: null };

  // compact "200g", "1.5tbsp"
  const compact = m.match(/^(\d+(?:[.,]\d+)?)([a-zA-Zµμ]+)$/);
  if (compact) {
    const qty = toNumberLoose(compact[1]);
    const unit = compact[2];
    return { qty: Number.isNaN(qty) ? null : qty, unit };
  }

  const parts = m.split(/\s+/);

  // "1 1/2 tbsp"
  const two = `${parts[0]} ${parts[1] ?? ""}`.trim();
  const twoNum = toNumberLoose(two);
  if (!Number.isNaN(twoNum) && parts.length >= 2) {
    const unit = parts.slice(2).join(" ").trim() || null;
    return { qty: twoNum, unit };
  }

  // "2 cups", "200 g", "1.5"
  const oneNum = toNumberLoose(parts[0]);
  if (!Number.isNaN(oneNum)) {
    const unit = parts.slice(1).join(" ").trim() || null;
    return { qty: oneNum, unit };
  }

  // "to taste", "dash"
  return { qty: null, unit: m };
}

/** Merge by name; if same unit and both numeric → sum qty; else keep extra line.
 *  Returns the updated list (handy for state).
 */
export function addItemsToShoppingList(newItems: ShoppingItem[]): ShoppingItem[] {
  const list = getShoppingList();
  const out: ShoppingItem[] = [...list];

  for (const item of newItems) {
    const i = out.findIndex(x => norm(x.name) === norm(item.name));
    if (i === -1) {
      out.push(item);
      continue;
    }
    const a = out[i];
    const sameUnit =
      (a.unit || "").trim().toLowerCase() === (item.unit || "").trim().toLowerCase();
    if (sameUnit && a.qty !== null && item.qty !== null) {
      out[i] = { ...a, qty: a.qty + item.qty };
    } else {
      out.push(item);
    }
  }

  saveShoppingList(out);
  return out;
}

export function removeItemAt(index: number): ShoppingItem[] {
  const list = getShoppingList();
  if (index >= 0 && index < list.length) list.splice(index, 1);
  saveShoppingList(list);
  return list;
}

export function clearShoppingList(): ShoppingItem[] {
  saveShoppingList([]);
  return [];
}

/** Produce a friendly text blob for copy/download */
export function formatAsText(list: ShoppingItem[]): string {
  return list
    .map(i => {
      const qtyPart = i.qty !== null ? `${i.qty}` : "";
      const unitPart = i.unit ? (qtyPart ? ` ${i.unit}` : i.unit) : "";
      const left = (qtyPart + unitPart).trim();
      return left ? `${left} — ${i.name}` : i.name;
    })
    .join("\n");
}

/** Helper: Build items from the TheMealDB `mealData` object */
export function buildItemsFromMealData(mealData: any): ShoppingItem[] {
  if (!mealData) return [];
  const items: ShoppingItem[] = [];
  for (const key of Object.keys(mealData)) {
    if (key.startsWith("strIngredient") && mealData[key]) {
      const idx = key.slice(13);
      const name = String(mealData[key]).trim();
      const rawMeasure = (mealData[`strMeasure${idx}`] || "").trim();
      const { qty, unit } = parseMeasure(rawMeasure);
      items.push({ name, qty, unit });
    }
  }
  return items;
}
