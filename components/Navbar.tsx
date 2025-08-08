//Navbar Component - by Devika Harshey
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import RecipeSearchBar from "@/components/RecipeSearchBar";

interface NavbarProps {
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  handleBlur: () => void;
  handleSearchFocus: () => void;
}

export default function Navbar({
  showResults,
  setShowResults,
  handleBlur,
  handleSearchFocus,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const newTheme =
            document.documentElement.getAttribute("data-theme") || "light";
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const initialTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(initialTheme);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`navbar fixed top-0 left-0 right-0 z-50 shadow-md flex flex-wrap items-center justify-between gap-y-2 px-4 py-2 md:py-3 transition-all duration-300 ${
        isScrolled ? "bg-base-200/80 backdrop-blur-md" : "bg-base-100/90"
      }`}
    >
      {/* Left - Logo + GitHub */}
      <div className="flex items-center gap-3 flex-wrap">
        <Link
          href="#"
          id="main"
          className={`text-sm md:text-base font-bold px-3.5 py-1.5 rounded-full transition-all duration-300 backdrop-blur-md
          ${
            currentTheme === "dark"
              ? "bg-gradient-to-br from-pink-700 via-purple-800 to-pink-700 text-white hover:shadow-lg"
              : "bg-gradient-to-br from-pink-200 via-purple-300 to-pink-200 text-gray-900 hover:shadow-md"
          } hover:scale-[1.02] border border-white/10`}
        >
          Flavor AI
        </Link>

        <a
          href="https://github.com/Ayushjhawar8/Flavor-ai"
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 backdrop-blur-md border hover:scale-[1.02] 
          ${
            currentTheme === "dark"
              ? "bg-gradient-to-br from-base-100 via-base-300 to-base-200 text-white shadow-md hover:shadow-lg border-white/10"
              : "bg-gradient-to-br from-base-200 via-base-100 to-base-300 text-gray-900 shadow-md hover:shadow-lg border-white/10"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-[18px] md:w-[18px]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.3c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.3 3.297-1.3c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z" />
          </svg>

          <span className="hidden sm:inline">Star</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-[18px] md:w-[18px] text-yellow-600 group-hover:text-yellow-300 transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </a>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex justify-center flex-1">
        <RecipeSearchBar
          isScrolled={isScrolled}
          handleBlur={handleBlur}
          handleSearchFocus={handleSearchFocus}
          showResults={showResults}
          setShowResults={setShowResults}
          className="w-[22rem] max-w-full"
        />
      </div>

      {/* Right - Theme Toggle */}
      <div className="ml-auto md:ml-0">
        <ThemeToggle />
      </div>

      {/* Mobile Search below */}
      <div className="w-full md:hidden">
        <RecipeSearchBar
          isScrolled={isScrolled}
          handleBlur={handleBlur}
          handleSearchFocus={handleSearchFocus}
          showResults={showResults}
          setShowResults={setShowResults}
          className="w-full"
        />
      </div>
    </div>
  );
}
