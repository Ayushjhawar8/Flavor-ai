"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { CATEGORIES_URL } from "@/lib/urls";
import { PlusIcon } from "@/components/Icons";
import RecipeSearchBar from "@/components/RecipeSearchBar";
import ThemeToggle from "@/components/ThemeToggle";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        const sortedCategories = data.categories.sort((a, b) => {
          const categoryOrder = ['Dessert', 'Vegetarian', 'Pasta'];
          const aIndex = categoryOrder.findIndex(cat =>
            a.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          const bIndex = categoryOrder.findIndex(cat =>
            b.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });
        setCategories(sortedCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme") || "light";
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(initialTheme);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content");
    if (navbar && content) {
      content.style.marginTop = `${navbar.offsetHeight}px`;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Custom Navbar */}
      <div
        className={`navbar fixed top-0 left-0 right-0 z-50 shadow-lg flex flex-col md:flex-row transition-all duration-300 ${
          isScrolled ? 'bg-base-200/90' : 'bg-base-100/90'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <div className="rounded-full text-base-content bg-purple-400">
            <ThemeToggle />
          </div>
          <Link
            href="#"
            className={`btn rounded-full btn-ghost text-2xl font-bold ${
              currentTheme === 'dark'
                ? 'text-white'
                : 'bg-[linear-gradient(to_bottom_right,_#ffc1cc,_#fbc2eb,_#fff)]'
            }`}
          >
            Flavor AI
          </Link>
          <Link href="/grocery-list" className="group flex items-center gap-2 ...">
            🛒 Grocery List
          </Link>
          <a
            href="https://github.com/Ayushjhawar8/Flavor-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 ..."
          >
            {/* GitHub Icon and Star */}
            {/* ... Keep the same SVG code as your original */}
          </a>
        </div>
        <div className="ml-auto">
          <RecipeSearchBar
            isScrolled={isScrolled}
            handleBlur={handleBlur}
            handleSearchFocus={handleSearchFocus}
            showResults={showResults}
            setShowResults={setShowResults}
            className="bg-purple-900/30 placeholder-gray-200 text-white border border-white/50 rounded-lg ..."
          />
        </div>
      </div>

      {/* Rest of the content stays unchanged */}
      {/* ... KEEP your entire JSX as is from <div className="content"> ... till the end */}

    </>
  );
}
