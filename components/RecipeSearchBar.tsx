// components/RecipeSearchBar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { SearchIcon as CustomSearchIcon, X } from "@/components/Icons"; // keep alias
import { festivalDishes } from "@/lib/festivalData"; // keep festival data

export interface RecipeSearchBarProps {
  isScrolled: boolean;
  handleSearchFocus: () => void;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
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
  const router = useRouter();

  const handleBlur = () => {
    setTimeout(() => {
      setIsSearchOpen(false);
      setShowResults(false);
      setActiveIndex(-1);
      setHoveredIndex(null);
    }, 200);
    if (parentHandleBlur) parentHandleBlur();
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme") || "dark";
          setCurrentTheme(newTheme);
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "dark");
    return () => observer.disconnect();
  }, []);

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

  const fetchMeals = (value: string) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => response.json())
      .then((data) => {
        const apiMeals = data.meals || [];
        const customMeals = festivalDishes.filter(
          (dish) =>
            dish.name.toLowerCase().includes(value.toLowerCase()) ||
            (dish.festival && dish.festival.toLowerCase().includes(value.toLowerCase())) ||
            (dish.type && dish.type.toLowerCase().includes(value.toLowerCase())) ||
            (dish.description && dish.description.toLowerCase().includes(value.toLowerCase()))
        );
        setMeals([...apiMeals, ...customMeals]);
      });
  };

  const handleSearch = (value: string) => {
    setInput(value);
    if (!value) setMeals([]);
  };

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
      const meal = meals[activeIndex];
      if (meal.type === "Festive") {
        localStorage.setItem("current_recipe", JSON.stringify(meal));
        router.push("/recipe");
      } else if (meal.idMeal) {
        window.location.href = `/meal/${meal.idMeal}`;
      }
    } else if (event.key === "Escape") {
      handleBlur();
      inputRef.current?.blur();
    }
  };

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

  const getDropdownBgColor = () =>
    currentTheme === "dark" ? "rgb(31, 41, 55)" : "rgb(255, 255, 255)";
  const getDropdownHoverBgColor = () =>
    currentTheme === "dark" ? "rgb(55, 65, 81)" : "rgb(243, 244, 246)";
  const getItemBgColor = (isActive: boolean) =>
    isActive
      ? currentTheme === "dark"
        ? "rgb(75, 85, 99)"
        : "rgb(229, 231, 235)"
      : "transparent";
  const getItemTextColor = (isActive: boolean) =>
    isActive
      ? currentTheme === "dark"
        ? "#F3F4F6"
        : "#111827"
      : currentTheme === "dark"
      ? "#D1D5DB"
      : "#4B5563";

  return (
    <div id="searchBar" className={`flex flex-col relative ${className || ""}`}>
      {!isSearchOpen ? (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 px-3 py-2 rounded-full border border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
        >
          <CustomSearchIcon className="w-5 h-5" />
          <span className="text-base font-medium">Search for a dish...</span>
        </button>
      ) : (
        <div className="relative">
          <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-white/20 dark:bg-black/20 backdrop-blur-sm text-white placeholder-gray-300 border-none rounded-full py-3 pl-12 pr-10 focus:ring-2 focus:ring-primary focus:outline-none transition"
            placeholder="Search for a dish..."
            value={input}
            onChange={(e) => {
              handleSearch(e.target.value);
              setShowResults(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleSearchFocus}
            onBlur={handleBlur}
            autoFocus
          />
          <button
            onClick={() => {
              handleSearch("");
              setIsSearchOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
          >
            <X />
          </button>
        </div>
      )}

      {showResults && input && isSearchOpen && (
        <div
          ref={resultsRef}
          className="w-full max-h-80 overflow-y-auto no-scrollbar p-2 rounded-xl shadow-lg flex flex-col gap-2 absolute top-14 z-10 border border-white/10"
          style={{
            backgroundColor: getDropdownBgColor(),
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onMouseEnter={() => setDropdownBgColor(getDropdownHoverBgColor())}
          onMouseLeave={() => setDropdownBgColor(getDropdownBgColor())}
        >
          {meals.map((meal, index) => {
            if (meal.type === "Festive") {
              return (
                <div
                  key={meal.id}
                  className="p-1 rounded-xl flex items-center justify-start gap-3 transition-colors duration-200 cursor-pointer"
                  style={{
                    backgroundColor:
                      index === activeIndex || index === hoveredIndex
                        ? getItemBgColor(true)
                        : "transparent",
                    color: getItemTextColor(
                      index === activeIndex || index === hoveredIndex
                    ),
                  }}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    localStorage.setItem("current_recipe", JSON.stringify(meal));
                    router.push("/recipe");
                  }}
                >
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <span>{meal.name}</span>
                    <div className="text-xs text-gray-500">{meal.festival}</div>
                  </div>
                </div>
              );
            }

            return (
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeSearchBar;
