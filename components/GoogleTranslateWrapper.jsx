'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import GoogleTranslateDropdown from './GoogleTranslate';

export default function GoogleTranslateWrapper() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
     
      <button
        onClick={toggleDropdown}
        aria-label="Open language selector"
        className={`rounded-full w-10 h-10 bg-purple-700 flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
          isDropdownOpen ? 'bg-purple-800 scale-110' : ''
        }`}
      >
        <Globe size={18} className="text-white" />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-purple-700 rounded-md shadow-lg z-50 transition-opacity duration-200 ${
          isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <GoogleTranslateDropdown />
      </div>
    </div>
  );
}
