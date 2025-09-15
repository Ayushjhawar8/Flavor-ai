"use client";

export default function UnitToggle({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs no-print">
      <button
        type="button"
        onClick={() => onChange("metric")}
        className={`btn btn-xs ${value === "metric" ? "btn-primary" : "btn-ghost"}`}
      >
        Metric
      </button>
      <button
        type="button"
        onClick={() => onChange("us")}
        className={`btn btn-xs ${value === "us" ? "btn-primary" : "btn-ghost"}`}
      >
        US
      </button>
    </div>
  );
}
