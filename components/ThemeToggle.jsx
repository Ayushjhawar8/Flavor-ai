//UI improvement, theme retention logic and position update in navbar - by Devika Harshey
"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Apply theme to document
    document.documentElement.setAttribute("data-theme", newTheme);

    // Optional: Save to localStorage for persistence
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`rounded-full p-1 ${theme === "light" ? "bg-purple-400" : "bg-purple-800"} transition-colors duration-300`}>
      <button
        onClick={toggleTheme}
        className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon size={16} className="text-white" />
        ) : (
          <Sun size={16} className="text-yellow-200" />
        )}
      </button>
    </div>
  );
}