"use client";
import React from "react";

export default function Tooltip({ children, label }) {
  return (
    <div className="relative inline-block group">
      {children}
      <span
        className="pointer-events-none absolute z-50 left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 text-xs rounded bg-black text-white shadow-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 -translate-y-1 group-hover:translate-y-0 whitespace-nowrap"
        role="tooltip"
      >
        {label}
      </span>
    </div>
  );
}
