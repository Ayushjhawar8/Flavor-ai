import { useCallback, useEffect, useMemo, useState } from "react";

function keyFor(recipeId: string) {
  return `servings:${recipeId}`;
}

/**
 * Persists servings per recipe in localStorage.
 * factor = servings / baseServings
 */
export function useServings(recipeId: string, baseServings: number) {
  const [servings, setServings] = useState<number>(baseServings);

  // load persisted value once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(keyFor(recipeId));
      if (raw) {
        const v = Number(raw);
        if (Number.isFinite(v) && v > 0) setServings(v);
      }
    } catch {}
  }, [recipeId]);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(keyFor(recipeId), String(servings));
    } catch {}
  }, [recipeId, servings]);

  const factor = useMemo(() => servings / baseServings, [servings, baseServings]);

  const reset = useCallback(() => setServings(baseServings), [baseServings]);
  return { servings, setServings, factor, reset };
}
