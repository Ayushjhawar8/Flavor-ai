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
        <a
          href="https://github.com/BhumiChawla/Flavor-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-base-200 hover:bg-base-300 text-base-content px-3 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 border border-base-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.30c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.30 3.297-1.30c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">Star</span>
          <span className="sm:hidden">Star</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-yellow-500 group-hover:text-yellow-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </a>
      </div>
      <div className="ml-auto">
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
  );
}
