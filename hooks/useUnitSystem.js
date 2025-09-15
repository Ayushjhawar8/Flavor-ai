"use client";
import { useEffect, useState } from "react";

export default function useUnitSystem() {
  const [unitSystem, setUnitSystem] = useState("metric"); // 'metric' | 'us'

  // read once
  useEffect(() => {
    try {
      const saved = localStorage.getItem("unitSystem");
      if (saved === "metric" || saved === "us") setUnitSystem(saved);
    } catch {}
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem("unitSystem", unitSystem);
    } catch {}
  }, [unitSystem]);

  return [unitSystem, setUnitSystem];
}
