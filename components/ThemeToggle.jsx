"use client";

import { useTheme } from "@/lib/ThemeContext";
import { useState } from "react";

export default function ThemeToggle({ className = "" })
{
  const { theme, toggleTheme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () =>
  {
    setIsPressed(true);
    toggleTheme();
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        btn btn-circle btn-ghost
        text-base-content hover:text-primary
        transition-all duration-300 
        hover:scale-110 active:scale-95
        ${isPressed ? 'scale-95' : ''}
        ${className}
      `}
      aria-label="Toggle theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className={`
        text-lg transition-all duration-300 
        ${theme === "light" ? "rotate-0" : "rotate-180"}
        ${isPressed ? "scale-90" : "scale-100"}
      `}>
        {theme === "light" ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
