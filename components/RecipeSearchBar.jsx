//UI update, scrollbar hide property for search results and position update in navbar - by Devika Harshey
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchIcon, X } from "@/components/Icons";

const RecipeSearchBar = ({
  isScrolled,
  handleSearchFocus,
  handleBlur,
  showResults,
  setShowResults,
  className,
}) => {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const resultsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!input) {
      setMeals([]);
      return;
    }
    const handler = setTimeout(() => {
      fetchMeals(input);
    }, 400);
    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  const fetchMeals = (value) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals));
  };

  const handleSearch = (value) => {
    setInput(value);
    if (!value) {
      setMeals([]);
      return;
    }
  };

  const handleKeyDown = (event) => {
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
      setShowResults(false);
      setIsSearchOpen(false);
      inputRef.current.blur();
    }
  };

  const scrollIntoView = (index) => {
    if (resultsRef.current) {
      const resultItems = resultsRef.current.children;
      if (resultItems[index]) {
        resultItems[index].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [meals, activeIndex]);

  const handleClickOutside = (e) => {
    if (!e.target.closest("#searchBar")) {
      setIsSearchOpen(false);
      handleBlur();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="searchBar" className="flex flex-col relative">
      {!isSearchOpen ? (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 text-base-content hover:text-primary transition-colors duration-200 px-4 py-2 rounded-full border border-base-300 hover:border-primary bg-base-100 hover:bg-base-200 backdrop-blur-sm text-sm md:text-base w-[18rem] md:w-[22rem]"
        >
          <SearchIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-medium">Search dish</span>
        </button>
      ) : (
        <label className="flex items-center gap-2 w-[18rem] md:w-[22rem] px-4 py-2 rounded-full bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-700 text-sm md:text-base focus-within:ring-2 focus-within:ring-primary transition-all duration-200">
          <SearchIcon className="w-5 h-5 text-base-content" />
          <input
            ref={inputRef}
            type="text"
            className="grow bg-transparent outline-none placeholder:text-base-content/60 text-sm md:text-base"
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
            className="text-base-content/60 hover:text-red-500 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </label>
      )}

      {showResults && input && isSearchOpen && (
        <div
          ref={resultsRef}
          className="w-[18rem] md:w-[22rem] max-h-80 overflow-y-scroll scrollbar-none bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-700 p-2 rounded-xl flex flex-col gap-2 absolute top-12 md:top-20 md:right-0 z-10 shadow-xl"
        >
          {input &&
            meals &&
            meals.map((meal, index) => (
              <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`}>
                <div
                  className={`${
                    index === activeIndex
                      ? "bg-primary text-white"
                      : "hover:bg-base-200 dark:hover:bg-zinc-800"
                  } p-2 rounded-lg flex items-center gap-3 text-sm md:text-base transition-colors duration-200`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    window.location.href = `/meal/${meal.idMeal}`;
                  }}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="truncate">{meal.strMeal}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default RecipeSearchBar;