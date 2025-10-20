"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import RecipeSearchBar from "@/components/RecipeSearchBar";
import { Home, Menu, X, Info, HelpCircle, Users } from "lucide-react"; // Added HelpCircle and Users
import GoogleTranslateWrapper from "./GoogleTranslateWrapper";
import { createPortal } from "react-dom";
import CursorToggle from "./CursorToggle";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import Tooltip from "@/components/Tooltip"


const MobileNavigation = ({currentTheme}) => {
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
          <div className="flex justify-between items-center">
             <Logo currentTheme={currentTheme}/>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors">
            <X size={20} />
            </button>
          </div>
          

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

        {/* social links */}
        <div className="absolute bottom-2 left-0 text-center w-full">
          <SocialLinks currentTheme={currentTheme}/>
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
        <Logo currentTheme={currentTheme}/>
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
        {/* Community */}
    <Tooltip label="Community">
          <div className="rounded-full p-1 dark:bg-purple-800 transition-colors duration-300 hidden md:block">
            <Link
              href="/community"
              className="w-8 h-8 flex items-center justify-center leading-none rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Users size={16} className={`${currentTheme === "dark" ? "text-white" : "dark:text-white text-black"}`} />
            </Link>
          </div>
        </Tooltip>


        {/* About Us */}
        <Tooltip label="About">
          <div className="rounded-full p-1 dark:bg-purple-800 transition-colors duration-300 hidden md:block">
            <Link
              href="/about"
              aria-label="About Us"
              className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Info size={16} className={`${currentTheme === "dark" ? "text-white" : "dark:text-white text-black"}`} />
            </Link>
          </div>
        </Tooltip>

        {/* FAQ */}
        <Tooltip label="FAQ">
          <div className="rounded-full p-1 dark:bg-purple-800 transition-colors duration-300 hidden md:block">
            <Link
              href="/FAQ"
              aria-label="FAQ"
              className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <HelpCircle size={16} className={`${currentTheme === "dark" ? "text-white" : "dark:text-white text-black"}`} />
            </Link>
          </div>
        </Tooltip>

        {/* Nutrition AI */}
        <Tooltip label="Nutrition AI">
          <div className="rounded-full p-1 dark:bg-purple-800 transition-colors duration-300 hidden md:block">
            <Link
              href="/nutrition-ai"
              aria-label="Nutrition AI"
              className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <span className="text-sm">🧬</span>
            </Link>
          </div>
        </Tooltip>

        <Tooltip label="Translate">
          <div className="rounded-full p-1 dark:bg-purple-800 transition-colors duration-300">
            <GoogleTranslateWrapper />
          </div>
        </Tooltip>
        <Tooltip label="Home">
          <div className="rounded-full p-1 dark:bg-purple-800 transition-colors duration-300 hidden md:block">
            <Link href="/" aria-label="Home" className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/20 border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <Home size={16} className={`${currentTheme === "dark" ? "text-white" : "dark:text-white text-black"}`} />
            </Link>
          </div>
        </Tooltip>

        <div className="hidden md:block">
          <Tooltip label="Theme">
            <ThemeToggle />
          </Tooltip>
        </div>

        <MobileNavigation currentTheme={currentTheme}/>
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
