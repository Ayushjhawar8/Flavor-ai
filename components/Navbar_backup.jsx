'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import RecipeSearchBar from './RecipeSearchBar';
import { useState, useEffect } from 'react';

export default function Navbar({ showResults, setShowResults, handleSearchFocus, handleBlur }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setCurrentTheme(initialTheme);

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] shadow-lg backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'bg-base-200/95' : 'bg-base-100/95'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="rounded-full text-base-content bg-purple-400">
              <ThemeToggle />
            </div>
            <Link
              href="/"
              className={`btn rounded-full btn-ghost text-2xl font-bold ${
                currentTheme === 'dark'
                  ? 'text-white'
                  : 'bg-[linear-gradient(to_bottom_right,_#ffc1cc,_#fbc2eb,_#fff)]'
              }`}
            >
              Flavor AI
            </Link>
            <Link
              href="/grocery-list"
              className="group inline-flex items-center gap-2 bg-base-200 hover:bg-base-300 text-base-content px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 border border-base-300 hover:border-base-400"
            >
              <span className="text-xl">🛒</span>
              <span>Grocery List</span>
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 bg-base-200 hover:bg-base-300 text-base-content px-4 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 border border-base-300 hover:border-base-400"
            >
              <span className="text-xl">👥</span>
              <span>About Us</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-end">
            <RecipeSearchBar
              isScrolled={isScrolled}
              handleBlur={handleBlur}
              handleSearchFocus={handleSearchFocus}
              showResults={showResults}
              setShowResults={setShowResults}
              className="bg-purple-900/30 placeholder-gray-200 text-white border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
