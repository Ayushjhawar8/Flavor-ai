"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "@/components/Icons";
import { DynamicIcon } from 'lucide-react/dynamic';
import { festivalDishes } from "@/lib/festivalData"; // update this path

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
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const router = useRouter();

  // Blur handler
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

  // Combine API and custom festival dishes search
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
      const meal = meals[activeIndex];
      if (meal.type === "Festive") {
        localStorage.setItem("current_recipe", JSON.stringify(meal));
        router.push("/recipe");
      } else if (meal.idMeal) {
        window.location.href = `/meal/${meal.idMeal}`;
      }
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

        //  Voice Input recognition
  const initializeRecognition = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Sorry, your browser does not support Speech Recognition.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPart = event.results[i][0].transcript;
        console.log("Transc", transcriptPart);
        console.log("Final", event.results[i].isFinal);
        if (event.results[i].isFinal) {
          setInput((prev) => prev + transcriptPart + ' ');
          console.log("Trans", transcriptPart);
        } else {
          interimTranscript += transcriptPart;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    return recognition;
  };

  // Toggle the icon based on voice button click
  const toggleListening = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition();
    }

    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      console.log("Stopped listening");
    } else {
      recognitionRef.current.start();
      console.log("Started listening");
    }

    setIsListening((prev) => !prev);
  };

  return (
    <div
      id="searchBar"
      className={`flex flex-col relative w-full max-w-md ${className || ""}`}
    >
      <label className="input input-bordered flex items-center gap-2 w-full">
        <SearchIcon className="w-5 h-5 text-base-content" />

        <input
          ref={inputRef}
          type="text"
          className="grow text-base text-base-content placeholder:text-gray-400"
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
        {input && (
          <button
            type="button"
            onClick={() => {
              handleSearch("");
              inputRef.current?.blur();
            }}
            className="p-1 rounded hover:bg-base-200"
            aria-label="Clear search"
          >
            <X />
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            toggleListening();
            setShowResults(true);
          }}
          className="p-1 rounded hover:bg-base-200"
          aria-label="Voice input"
        >
          <DynamicIcon
            name={isListening ? "mic" : "mic-off"}
            color="red"
            size={20}
          />
        </button>

      </label>

      {showResults && input && (
        <div
          ref={resultsRef}
          className="w-full max-h-80 overflow-y-scroll no-scrollbar p-2 rounded-xl flex flex-col gap-2 absolute top-12 z-10"
          style={{ backgroundColor: getDropdownBgColor() }}
          onMouseEnter={() => setDropdownBgColor(getDropdownHoverBgColor())}
          onMouseLeave={() => setDropdownBgColor(getDropdownBgColor())}
        >
          {input &&
            meals &&
            meals.map((meal, index) => {
              // Show custom navigation for festival dishes
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
              // Otherwise, show API meal as before
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
