"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "@/components/Icons";

export interface RecipeSearchBarProps {
  isScrolled: boolean;
  handleSearchFocus: () => void;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string; // ✅ Optional now
  handleBlur?: () => void;
}

const RecipeSearchBar: React.FC<RecipeSearchBarProps> = ({
  isScrolled,
  handleSearchFocus,
  showResults,
  setShowResults,
  className,
  handleBlur: parentHandleBlur,
}) => {
  const [input, setInput] = useState<string>("");
  const [meals, setMeals] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownBgColor, setDropdownBgColor] = useState("rgb(55, 65, 81)");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>("dark");

  // Blur handler (calls parentBlur if provided)
  const handleBlur = () => {
    setIsSearchOpen(false);
    setShowResults(false);
    setActiveIndex(-1);
    setHoveredIndex(null);
    setMeals([]);
    inputRef.current?.blur();
    if (parentHandleBlur) parentHandleBlur();
  };

  // Theme watcher
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const newTheme =
            document.documentElement.getAttribute("data-theme") || "dark";
          setCurrentTheme(newTheme);
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    setCurrentTheme(
      document.documentElement.getAttribute("data-theme") || "dark"
    );
    return () => observer.disconnect();
  }, []);

  // Debounced fetch for search
  useEffect(() => {
    if (!input) {
      setMeals([]);
      return;
    }
    const handler = setTimeout(() => {
      fetchMeals(input);
    }, 400);
    return () => clearTimeout(handler);
  }, [input]);

  // Fetch meals from API
  const fetchMeals = (value: string) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals || []));
  };

  // Search input state
  const handleSearch = (value: string) => {
    setInput(value);
    if (!value) setMeals([]);
  };

  // Keyboard navigation for dropdown
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prev) => {
        const newIndex = prev < meals.length - 1 ? prev + 1 : prev;
        scrollIntoView(newIndex);
        return newIndex;
      });
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : prev;
        scrollIntoView(newIndex);
        return newIndex;
      });
    } else if (event.key === "Enter" && activeIndex >= 0) {
      window.location.href = `/meal/${meals[activeIndex].idMeal}`;
    } else if (event.key === "Escape") {
      handleBlur();
    }
  };

  // Scroll focused item into view
  const scrollIntoView = (index: number) => {
    if (resultsRef.current) {
      const resultItems = resultsRef.current.children;
      if (resultItems[index]) {
        (resultItems[index] as HTMLElement).scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  };

  // Outside click closes dropdown
  const handleClickOutside = (e: MouseEvent) => {
    if (!(e.target as Element).closest("#searchBar")) {
      handleBlur();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Color functions
  const getDropdownBgColor = () =>
    currentTheme === "dark" ? "rgb(55, 65, 81)" : "rgb(255,192,203)";
  const getDropdownHoverBgColor = () =>
    currentTheme === "dark" ? "rgb(75, 85, 99)" : "rgb(255,105,180)";
  const getItemBgColor = (isActive: boolean) =>
    isActive
      ? currentTheme === "dark"
        ? "rgb(139, 107, 79)"
        : "rgb(255,105,180)"
      : "transparent";
  const getItemTextColor = (isActive: boolean) =>
    isActive
      ? currentTheme === "dark"
        ? "#F5DEB3"
        : "#3a003a"
      : currentTheme === "dark"
      ? "#E5E7EB"
      : "#1a1a1a";

  return (
    <div
      id="searchBar"
      className={`flex flex-col relative ${className || ""}`}
    >
      {!isSearchOpen ? (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 text-base-content hover:text-primary transition-colors duration-200 px-3 py-2 rounded-lg border border-base-300 hover:border-primary bg-base-100 hover:bg-base-200"
        >
          <SearchIcon className="w-5 h-5" />
          <span className="text-base font-medium">Search dish</span>
        </button>
      ) : (
        <label className="input input-bordered flex items-center gap-2">
          <SearchIcon className={undefined} />
          <input
            ref={inputRef}
            type="text"
            className="grow"
            placeholder="Search dish..."
            value={input}
            onChange={(e) => {
              handleSearch(e.target.value);
              setShowResults(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleSearchFocus}
            autoFocus
          />
          <button
            onClick={() => {
              handleSearch("");
              setIsSearchOpen(false);
            }}
          >
            <X />
          </button>
        </label>
      )}

      {showResults && input && isSearchOpen && (
        <div
          ref={resultsRef}
          className="w-80 max-h-80 overflow-y-scroll no-scrollbar p-2 rounded-xl flex flex-col gap-2 absolute top-12 md:top-20 md:right-0 z-10"
          style={{ backgroundColor: getDropdownBgColor() }}
          onMouseEnter={() => setDropdownBgColor(getDropdownHoverBgColor())}
          onMouseLeave={() => setDropdownBgColor(getDropdownBgColor())}
        >
          {input &&
            meals &&
            meals.map((meal, index) => (
              <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`}>
                <div
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    window.location.href = `/meal/${meal.idMeal}`;
                  }}
                  style={{
                    backgroundColor:
                      index === activeIndex || index === hoveredIndex
                        ? getItemBgColor(true)
                        : "transparent",
                    color: getItemTextColor(
                      index === activeIndex || index === hoveredIndex
                    ),
                  }}
                  className="p-1 rounded-xl flex items-center justify-start gap-3 transition-colors duration-200"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{meal.strMeal}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default RecipeSearchBar;
