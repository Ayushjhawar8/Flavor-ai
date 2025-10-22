"use client";
import { useId } from "react";

/** Minimal ± control; no numeric presets to keep UI clean */
export default function ServingSizeControl({
  servings,
  setServings,
  baseServings,
  onReset, // optional
  showReset = false, // set true if you want a Reset button rendered
  min = 0.5,
  max = 12,
  step = 1,
}) {
  const id = useId();
  const round = (n, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;
  const clampSet = (v) =>
    setServings(Math.min(max, Math.max(min, round(Number(v)))));

  const dec = () => clampSet(Number(servings) - step);
  const inc = () => clampSet(Number(servings) + step);

  const glyph = (n) => {
    const close = (a, b) => Math.abs(a - b) < 0.001;
    if (close(n % 1, 0.5))
      return `${Math.floor(n) ? Math.floor(n) + " " : ""}½`;
    if (close(n % 1, 0.25))
      return `${Math.floor(n) ? Math.floor(n) + " " : ""}¼`;
    if (close(n % 1, 0.75))
      return `${Math.floor(n) ? Math.floor(n) + " " : ""}¾`;
    return Number.isInteger(n) ? String(n) : String(round(n, 1));
  };

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-base-300/70 bg-base-200/60 px-3 py-2"
      role="group"
      aria-label="Serving size"
    >
      <label
        htmlFor={id}
        className="hidden sm:inline text-sm text-base-content/70"
      >
        Servings
      </label>

      <div className="inline-flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          aria-label="Decrease servings"
          className="w-8 h-8 grid place-items-center rounded-full border border-base-300 bg-base-100 hover:bg-base-200 focus:outline-none"
        >
          &minus;
        </button>

        <span
          id={id}
          aria-live="polite"
          className="min-w-[2.25rem] text-center text-sm font-semibold text-base-content/80"
          title={`Current servings ×${servings}`}
        >
          ×{glyph(Number(servings))}
        </span>

        <button
          type="button"
          onClick={inc}
          aria-label="Increase servings"
          className="w-8 h-8 grid place-items-center rounded-full border border-base-300 bg-base-100 hover:bg-base-200 focus:outline-none"
        >
          +
        </button>
      </div>

      {showReset && typeof onReset === "function" && (
        <button
          type="button"
          onClick={onReset}
          className="h-8 px-3 rounded-full text-xs border border-base-300 hover:bg-base-200"
          title={`Reset to ${baseServings}`}
          aria-label="Reset servings to base"
        >
          Reset
        </button>
      )}
    </div>
  );
}
