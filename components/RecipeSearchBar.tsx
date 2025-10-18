"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "@/components/Icons";
import { Mic, MicOff } from "lucide-react";
import { festivalDishes } from "@/lib/festivalData";

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
  const [isListening, setIsListening] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>("dark");
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const router = useRouter();

  // --- Theme watcher ---
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme =
        document.documentElement.getAttribute("data-theme") || "dark";
      setCurrentTheme(newTheme);
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

  // --- Blur handler ---
  const handleBlur = () => {
    setIsSearchOpen(false);
    setShowResults(false);
    setActiveIndex(-1);
    setHoveredIndex(null);
    setMeals([]);
    inputRef.current?.blur();
    if (parentHandleBlur) parentHandleBlur();
  };

  // --- Debounced search fetch ---
  useEffect(() => {
    if (!input) {
      setMeals([]);
      return;
    }
    const handler = setTimeout(() => fetchMeals(input), 400);
    return () => clearTimeout(handler);
  }, [input]);

  const fetchMeals = (value: string) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((res) => res.json())
      .then((data) => {
        const apiMeals = data.meals || [];
        const customMeals = festivalDishes.filter(
          (dish) =>
            dish.name.toLowerCase().includes(value.toLowerCase()) ||
            (dish.festival &&
              dish.festival.toLowerCase().includes(value.toLowerCase())) ||
            (dish.type &&
              dish.type.toLowerCase().includes(value.toLowerCase())) ||
            (dish.description &&
              dish.description.toLowerCase().includes(value.toLowerCase()))
        );
        setMeals([...apiMeals, ...customMeals]);
      });
  };

  // --- Keyboard navigation ---
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, meals.length - 1));
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      const meal = meals[activeIndex];
      handleMealSelect(meal);
    } else if (event.key === "Escape") {
      handleBlur();
    }
  };

  const handleMealSelect = (meal: any) => {
    if (meal.type === "Festive") {
      localStorage.setItem("current_recipe", JSON.stringify(meal));
      router.push("/recipe");
    } else if (meal.idMeal) {
      window.location.href = `/meal/${meal.idMeal}`;
    }
  };

  // --- Outside click ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest("#searchBar")) {
        handleBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Voice Recognition ---
  const initializeRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
      setShowResults(true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    return recognition;
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
    }

    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      console.log("🎙️ Stopped listening");
    } else {
      recognitionRef.current.start();
      console.log("🎧 Started listening");
    }

    setIsListening((prev) => !prev);
  };

  // --- Color helpers ---
  const getDropdownBgColor = () =>
    currentTheme === "dark" ? "rgb(55,65,81)" : "rgb(255,192,203)";
  const getItemBgColor = (active: boolean) =>
    active
      ? currentTheme === "dark"
        ? "rgb(139,107,79)"
        : "rgb(255,105,180)"
      : "transparent";
  const getItemTextColor = (active: boolean) =>
    active
      ? currentTheme === "dark"
        ? "#F5DEB3"
        : "#3a003a"
      : currentTheme === "dark"
      ? "#E5E7EB"
      : "#1a1a1a";

  return (
    <div id="searchBar" className={`relative w-full max-w-md ${className || ""}`}>
      {!isSearchOpen ? (
        <button
          onClick={() => {
            setIsSearchOpen(true);
            handleSearchFocus();
          }}
          className="flex items-center gap-2 text-base-content hover:text-primary transition-colors duration-200 px-3 py-[11px] rounded-lg border border-base-300 hover:border-primary bg-base-100 hover:bg-base-200 w-full justify-start"
        >
          <SearchIcon className="w-5 h-5" />
          <span className="text-base font-medium">Search dish</span>
        </button>
      ) : (
        <label className="input input-bordered flex items-center gap-2 w-full">
          <SearchIcon className="w-5 h-5 text-base-content" />

          <input
            ref={inputRef}
            type="text"
            className="grow text-base text-base-content placeholder:text-gray-400"
            placeholder="Search dish..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowResults(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleSearchFocus}
          />

          {/* 🎙️ Voice + Clear buttons aligned correctly */}
          <button
            type="button"
            onClick={toggleListening}
            className="p-1 rounded hover:bg-base-200"
            aria-label="Voice input"
          >
            {isListening ? (
              <Mic className="w-5 h-5 text-red-500" />
            ) : (
              <MicOff className="w-5 h-5 text-base-content" />
            )}
          </button>

          {input && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="p-1 rounded hover:bg-base-200 flex items-center justify-center"
              aria-label="Clear search"
            >
              <div className="w-5 h-5 text-base-content">
                <X />
              </div>
            </button>
          )}
        </label>
      )}

      {/* Results dropdown */}
      {showResults && input && isSearchOpen && (
        <div
          ref={resultsRef}
          className="w-full max-h-80 overflow-y-scroll no-scrollbar p-2 rounded-xl flex flex-col gap-2 absolute top-12 z-10"
          style={{ backgroundColor: getDropdownBgColor() }}
        >
          {meals.map((meal, index) => {
            const isActive = index === activeIndex || index === hoveredIndex;
            const textColor = getItemTextColor(isActive);
            const bgColor = getItemBgColor(isActive);

            if (meal.type === "Festive") {
              return (
                <div
                  key={meal.id}
                  className="p-2 rounded-xl flex items-center gap-3 cursor-pointer transition-colors duration-200"
                  style={{ backgroundColor: bgColor, color: textColor }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMealSelect(meal);
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
                  className="p-2 rounded-xl flex items-center gap-3 cursor-pointer transition-colors duration-200"
                  style={{ backgroundColor: bgColor, color: textColor }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
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