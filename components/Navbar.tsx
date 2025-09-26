"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import RecipeSearchBar from "@/components/RecipeSearchBar";
import { Home, Menu, X } from "lucide-react";
import GoogleTranslateWrapper from "./GoogleTranslateWrapper";
import { createPortal } from "react-dom";
import CursorToggle from "./CursorToggle";
import SnakeCursor from "./SnakeCursor";

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isMenuOpen]);

  const MobileMenuOverlay = () => (
    <div className="fixed inset-0 md:hidden z-[9999]">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
        onClick={() => setIsMenuOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full rounded-md w-64 glass-card shadow-xl z-[10000]">
        <div className="flex flex-col p-4 space-y-4 h-full overflow-y-auto">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end p-2 rounded-full glass-card text-white hover:bg-red-500 transition-colors"
          >
            <X size={20} />
          </button>

          <Link href="/" className="flex items-center gap-3 p-3 rounded-lg glass-card hover:bg-orange-500/20 transition-all group">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">🏠</span>
            </div>
            <span className="text-white font-semibold">Home Sweet Home</span>
          </Link>

          <div className="flex flex-row items-center glass-card p-3 hover:shadow-md transition-all group">
            <ThemeToggle />
            <span className="px-3 text-white font-semibold flex items-center space-x-2">
              <span className="text-xl">🎨</span>
              <span>Theme Magic</span>
            </span>
          </div>

          <Link href="/ai" className="flex items-center gap-3 p-3 rounded-lg glass-card hover:bg-blue-500/20 transition-all group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">🤖</span>
            </div>
            <span className="text-white font-semibold">AI Chef</span>
          </Link>

          <Link href="/community" className="flex items-center gap-3 p-3 rounded-lg glass-card hover:bg-green-500/20 transition-all group">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">👥</span>
            </div>
            <span className="text-white font-semibold">Food Community</span>
          </Link>

          <Link href="/festive" className="flex items-center gap-3 p-3 rounded-lg glass-card hover:bg-pink-500/20 transition-all group">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎊</span>
            </div>
            <span className="text-white font-semibold">Festival Feast</span>
          </Link>

          <Link href="/random" className="flex items-center gap-3 p-3 rounded-lg glass-card hover:bg-yellow-500/20 transition-all group">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">�</span>
            </div>
            <span className="text-white font-semibold">Surprise Me!</span>
          </Link>

        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg bg-white/10 dark:bg-black/20 border border-white/20"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Rendered via Portal */}
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
  setShowResults = () => {},
  handleBlur = () => {},
  handleSearchFocus = () => {},
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [cursorEnabled, setCursorEnabled] = useState(true);

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

  useEffect(() => {
    document.body.style.cursor = cursorEnabled ? "none" : "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, [cursorEnabled]);

  return (
    <div className="navbar-glass fixed top-0 left-0 right-0 z-40 flex flex-wrap items-center justify-between gap-y-2 px-4 py-2 md:py-3 transition-all duration-300">
      {/* Left - Food Brand + GitHub */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        <Link
          href="/"
          id="main"
          className="text-sm md:text-xl font-black px-4 py-2 rounded-full transition-all duration-300 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 border border-white/20 flex items-center space-x-2"
        >
          <span className="text-2xl">🍽️</span>
          <span>Flavor AI</span>
          <span className="text-2xl">🔥</span>
        </Link>

        <a
          href="https://github.com/Ayushjhawar8/Flavor-ai"
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 backdrop-blur-md border hover:scale-[1.02] ${
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

      {/* Right - Food Navigation & Theme Toggle */}
      <div className="ml-auto md:ml-0 flex items-center gap-2 md:gap-4">
        {/* Community Link */}
        <div className="hidden md:block">
          <Link
            href="/community"
            className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-green-500/30 transition-all duration-300 hover:scale-110 group"
          >
            <span className="text-2xl group-hover:animate-bounce">👥</span>
          </Link>
        </div>

        {/* AI Recipe Link */}
        <div className="hidden md:block">
          <Link
            href="/ai"
            className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 group"
          >
            <span className="text-2xl group-hover:animate-pulse">🤖</span>
          </Link>
        </div>

        {/* Random Recipe Link */}
        <div className="hidden md:block">
          <Link
            href="/random"
            className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-yellow-500/30 transition-all duration-300 hover:scale-110 group"
          >
            <span className="text-2xl group-hover:animate-spin">🎲</span>
          </Link>
        </div>

        <GoogleTranslateWrapper />

        {/* Home Link */}
        <div className="hidden md:block">
          <Link
            href="/"
            aria-label="Home Sweet Home"
            className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-orange-500/30 transition-all duration-300 hover:scale-110 group"
          >
            <span className="text-2xl group-hover:animate-bounce">🏠</span>
          </Link>
        </div>

        {/* Theme Toggle */}
        <div className="hidden md:block glass-card p-2 rounded-full hover:bg-purple-500/30 transition-all duration-300">
          <ThemeToggle />
        </div>

        <CursorToggle cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled} />

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

      {/* Animated Cursor */}
      <SnakeCursor enabled={cursorEnabled} />
    </div>
  );
}
