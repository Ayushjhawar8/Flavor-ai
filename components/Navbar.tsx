"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import RecipeSearchBar from "@/components/RecipeSearchBar";
import { Home, Menu, X, Info, HelpCircle, Users } from "lucide-react"; // Added HelpCircle and Users
import GoogleTranslateWrapper from "./GoogleTranslateWrapper";
import { createPortal } from "react-dom";
import CursorToggle from "./CursorToggle";
import Tooltip from "@/components/Tooltip";

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = "unset"; };
    }
  }, [isMenuOpen]);

  const MobileMenuOverlay = () => (
    <div className="fixed inset-0 md:hidden z-[9999]">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
        onClick={() => setIsMenuOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full rounded-md w-64 bg-base-100 shadow-xl z-[10000]">
        <div className="flex flex-col p-4 space-y-4 h-full overflow-y-auto">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
          >
            <X size={20} />
          </button>

          <Link href="/" className="flex items-center gap-3 p-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <div className="bg-purple-800/70 rounded-full w-10 h-10 flex items-center justify-center">
              <Home size={20} className="text-white" />
            </div>
            <span>Home</span>
          </Link>

          <div
            onClick={() => {
              const button = document.querySelector("#theme-toggle-btn") as HTMLButtonElement | null;
              button?.click(); // simulate click on the ThemeToggle button
            }}
            className="flex items-center gap-3 p-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors cursor-pointer"
          >
            <div className="bg-gray-800/70 rounded-full w-10 h-10 flex items-center justify-center">
              <ThemeToggle />
            </div>
            <span>Change Theme</span>
          </div>


          <Link href="/community" className="flex items-center gap-3 p-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <div className="bg-purple-800/70 rounded-full w-10 h-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M9 11a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 100-8 4 4 0 000 8z" />
                <path d="M2 20c0-2.5 3-4 7-4s7 1.5 7 4v1H2v-1zm14 0c0-1.5.8-2.6 2-3.3 1.2.7 2 1.8 2 3.3v1h-4v-1z" />
              </svg>
            </div>
            <span>Community</span>
          </Link>

          <Link href="/festive" className="flex items-center gap-3 p-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <div className="bg-purple-800/70 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-lg">🎉</span>
            </div>
            <span>Festivals</span>
          </Link>

          <Link href="/nutrition-ai" className="flex items-center gap-3 p-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <div className="bg-purple-800/70 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-lg">🧬</span>
            </div>
            <span>Nutrition AI</span>
          </Link>

          <Link href="/about" className="flex items-center gap-3 p-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <div className="bg-purple-800/70 rounded-full w-10 h-10 flex items-center justify-center">
              <Info size={20} className="text-white" />
            </div>
            <span>About Us</span>
          </Link>

          {/* FAQ Link */}
          <Link href="/FAQ" className="flex items-center gap-3 p-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
            <div className="bg-purple-800/70 rounded-full w-10 h-10 flex items-center justify-center">
              <HelpCircle size={20} className="text-white" />
            </div>
            <span>FAQ</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg bg-white/10 dark:bg-black/20 border border-white/20"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {isMenuOpen && mounted && createPortal(<MobileMenuOverlay />, document.body)}
    </>
  );
};

interface NavbarProps {
  showResults?: boolean;
  setShowResults?: React.Dispatch<React.SetStateAction<boolean>>;
  handleBlur?: () => void;
  handleSearchFocus?: () => void;
}

export default function Navbar({
  showResults = false,
  setShowResults = () => { },
  handleBlur = () => { },
  handleSearchFocus = () => { },
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [showTranslateTooltip, setShowTranslateTooltip] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem("cursorEnabled");
      return stored ? JSON.parse(stored) : true;
    } catch (e) {
      console.error(e);
      return true;
    }
  });

  useEffect(() => { localStorage.setItem("cursorEnabled", JSON.stringify(cursorEnabled)); }, [cursorEnabled]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
    return () => observer.disconnect();
  }, []);

  useEffect(() => { document.body.style.cursor = cursorEnabled ? "none" : "default"; return () => { document.body.style.cursor = "default"; }; }, [cursorEnabled]);

  return (
    <div className={`navbar fixed top-0 left-0 right-0 z-40 shadow-md flex flex-wrap items-center justify-between gap-y-2 px-4 py-2 md:py-3 transition-all duration-300 ${isScrolled ? "bg-base-200/80 backdrop-blur-md" : "bg-base-100/90"
      }`}>
      {/* Left - Logo + GitHub */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        <Link
          href="/"
          id="main"
          className={`text-sm md:text-base font-bold px-3.5 py-1.5 rounded-full transition-all duration-300 backdrop-blur-md ${currentTheme === "dark"
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
          className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 backdrop-blur-md border hover:scale-[1.02] ${currentTheme === "dark"
            ? "bg-gradient-to-br from-base-100 via-base-300 to-base-200 text-white shadow-md hover:shadow-lg border-white/10"
            : "bg-gradient-to-br from-base-200 via-base-100 to-base-300 text-gray-900 shadow-md hover:shadow-lg border-white/10"
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-[18px] md:w-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.3c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.3 3.297-1.3c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">Star</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-[18px] md:w-[18px] text-yellow-600 group-hover:text-yellow-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
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

      {/* Right - Community, Home Tab & Theme Toggle */}
      <div className="ml-auto md:ml-0 flex items-center gap-2 md:gap-4">

        {/* Home */}
        <div
          className="rounded-full p-1 transition-colors duration-300 hidden md:block relative group"
          style={{ backgroundColor: currentTheme === "dark" ? "#d8b4fe" : "#7F5338" }}
        >
          <Link href="/" aria-label="Home" className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <Home size={16} className={`${currentTheme === "dark" ? "text-white" : "dark:text-white text-black"}`} />
          </Link>
          <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium bg-white/90 text-gray-900 border border-gray-300/60 shadow-md dark:bg-black/80 dark:text-white dark:border-white/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
            Home
          </span>
        </div>

        {/* Community */}

        <div
          className="rounded-full p-1 transition-colors duration-300 hidden md:block relative group"
          style={{ backgroundColor: currentTheme === "dark" ? "#d8b4fe" : "#7F5338" }}
        >
          <Link href="/community" className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className={`w-5 h-5 ${currentTheme === "dark" ? "text-white" : "dark:text-white text-black"}`} fill="currentColor">
              <path d="M8.5 3.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5ZM4.75 5.75a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0ZM2 12.982C2 11.887 2.887 11 3.982 11h5.6a4.728 4.728 0 0 0-.326 1.5H3.982a.482.482 0 0 0-.482.482v.393c0 .172.002 1.213.607 2.197c.52.844 1.554 1.759 3.753 1.907a2.993 2.993 0 0 0-1.136 1.368c-2.005-.371-3.207-1.372-3.894-2.49C2 15.01 2 13.618 2 13.378v-.395ZM18.417 11c.186.468.3.973.326 1.5h5.275c.266 0 .482.216.482.482v.393c0 .172-.002 1.213-.608 2.197c-.519.844-1.552 1.759-3.752 1.907c.505.328.904.805 1.136 1.368c2.005-.371 3.207-1.372 3.894-2.49c.83-1.348.83-2.74.83-2.98v-.395A1.982 1.982 0 0 0 24.018 11h-5.6ZM19.5 3.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5Zm-3.75 2.25a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0ZM7.5 19.982C7.5 18.887 8.387 18 9.482 18h9.036c1.095 0 1.982.887 1.982 1.982v.395c0 .24 0 1.632-.83 2.98C18.8 24.773 17.106 26 14 26s-4.8-1.228-5.67-2.642c-.83-1.349-.83-2.74-.83-2.981v-.395Zm1.982-.482a.482.482 0 0 0-.482.482v.393c0 .172.002 1.213.607 2.197c.568.922 1.749 1.928 4.393 1.928c2.644 0 3.825-1.006 4.392-1.928c.606-.983.608-2.025.608-2.197v-.393a.482.482 0 0 0-.482-.482H9.482Zm2.268-6.75a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0ZM14 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 14 9Z" />
            </svg>
          </Link>
          <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium bg-white/90 text-gray-900 border border-gray-300/60 shadow-md dark:bg-black/80 dark:text-white dark:border-white/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
            Community
          </span>
        </div>

        {/* About Us */}
        <div
          className="rounded-full p-1 transition-colors duration-300 hidden md:block relative group"
          style={{ backgroundColor: currentTheme === "dark" ? "#d8b4fe" : "#7F5338" }}
        >
          <Link
            href="/about"
            aria-label="About Us"
            className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <Info size={16} className={`${currentTheme === "dark" ? "text-white" : "dark:text-white text-black"}`} />
          </Link>
          <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium bg-white/90 text-gray-900 border border-gray-300/60 shadow-md dark:bg-black/80 dark:text-white dark:border-white/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
            About
          </span>
        </div>

        {/* FAQ */}
        <div
          className="rounded-full p-1 transition-colors duration-300 hidden md:block relative group"
          style={{ backgroundColor: currentTheme === "dark" ? "#d8b4fe" : "#7F5338" }}
        >
          <Link
            href="/FAQ"
            aria-label="FAQ"
            className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <HelpCircle size={16} className={`${currentTheme === "dark" ? "text-white" : "dark:text-white text-black"}`} />
          </Link>
          <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium bg-white/90 text-gray-900 border border-gray-300/60 shadow-md dark:bg-black/80 dark:text-white dark:border-white/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
            FAQ
          </span>
        </div>

        {/* Nutrition AI */}
        <div
          className="rounded-full p-1 transition-colors duration-300 hidden md:block relative group"
          style={{ backgroundColor: currentTheme === "dark" ? "#d8b4fe" : "#7F5338" }}
        >
          <Link
            href="/nutrition-ai"
            aria-label="Nutrition AI"
            className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <span className="text-sm">🧬</span>
          </Link>
          <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium bg-white/90 text-gray-900 border border-gray-300/60 shadow-md dark:bg-black/80 dark:text-white dark:border-white/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
            Nutrition AI
          </span>
        </div>


        {/* Google Translate Button (Styled to Match Home) */}
        <div
          className="rounded-full p-1 transition-colors duration-300 hidden md:block relative group"
          style={{ backgroundColor: currentTheme === "dark" ? "#d8b4fe" : "#7F5338" }}
          onMouseEnter={() => setShowTranslateTooltip(true)}
          onMouseLeave={() => setShowTranslateTooltip(false)}
          onClick={() => setShowTranslateTooltip(false)}
        >
          {/* CRITICAL: You must ensure your GoogleTranslateWrapper renders its widget/container
             with the following className to match the Home button's size and appearance: */}
          <GoogleTranslateWrapper
            className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          />

          <span className={`pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium bg-white/90 text-gray-900 border border-gray-300/60 shadow-md dark:bg-black/80 dark:text-white dark:border-white/10 transition-opacity duration-150 ${showTranslateTooltip ? 'opacity-100' : 'opacity-0'}`}>
            Translate
          </span>
        </div>


        {/* Theme Toggle */}
        <div
          className="rounded-full p-1 transition-colors duration-300 hidden md:block relative group"
          style={{ backgroundColor: currentTheme === "dark" ? "#d8b4fe" : "#7F5338" }}
        >
          {/* This inner div needs the exact class styling of the <Link> component used for FAQ */}
          <div
            id="theme-toggle-btn-wrapper" // Keep the wrapper ID consistent
            className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            {/* The ThemeToggle component is called here */}
            <ThemeToggle />
          </div>

          <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium bg-white/90 text-gray-900 border border-gray-300/60 shadow-md dark:bg-black/80 dark:text-white dark:border-white/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
            Theme
          </span>

        </div>

        <MobileNavigation />
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
