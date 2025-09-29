"use client";

import { useEffect } from "react";
import { initializeRatingData } from "@/lib/seedRatingData";
import { initializeCleanDynamicSystem } from "@/lib/clearDummyData";

/**
 * Client-side component to initialize rating system
 * This component ensures the system starts clean and dynamic
 */
export default function RatingInitializer() {
  useEffect(() => {
    // Initialize clean dynamic system (no dummy data by default)
    initializeCleanDynamicSystem();
    
    // Initialize rating data (only adds demo data if explicitly enabled)
    initializeRatingData();
  }, []);

  // This component doesn't render anything
  return null;
}
