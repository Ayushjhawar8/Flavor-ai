'use client';

import { useEffect, useState, useRef } from 'react';
import { Globe } from "lucide-react";

const GoogleTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setCurrentTheme(initialTheme);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.googleTranslateInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        setTimeout(window.googleTranslateInit, 100);
      } 
      else{
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages:
              'en,hi,mr,sa,ta,te,kn,ml,gu,pa,bn,ur,or,as,ne,sd,si,fr,de,es,zh,ja,ru',
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false,
          },
          'google_element'
        );
      }
    };

    if (!document.getElementById('google_translate_script')) {
      const script = document.createElement('script');
      script.id = 'google_translate_script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.googleTranslateInit();
    }
  }, []);

  const translateLanguage = (lang) => {
    const selectEl = document.querySelector('#google_element select');
    if (!selectEl) return;
    selectEl.value = lang;
    selectEl.dispatchEvent(new Event('change'));
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'sa', label: 'संस्कृतम्' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'ur', label: 'اردو' },
    { code: 'or', label: 'ଓଡ଼ିଆ' },
    { code: 'as', label: 'অসমীয়া' },
    { code: 'ne', label: 'नेपाली' },
    { code: 'sd', label: 'سنڌي' },
    { code: 'si', label: 'සිංහල' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'es', label: 'Español' },
    { code: 'zh', label: '中文' },
    { code: 'ja', label: '日本語' },
    { code: 'ru', label: 'Русский' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDropdownBgColor = () => (currentTheme === 'dark' ? 'rgb(55,65,81)' : '#FFF8E7');
  const getDropdownBorderColor = () => (currentTheme === 'dark' ? 'rgb(75,85,99)' : 'rgb(209,213,219)');
  const getItemHoverBgColor = () => (currentTheme === 'dark' ? 'rgb(75,85,99)' : 'rgb(243,199,243)');
  const getItemTextColor = () => (currentTheme === 'dark' ? '#FFFFFF' : '#1a1a1a');

  return (
    <div ref={wrapperRef} className="relative">
      {/* Globe + Arrow button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Globe className="w-5 h-5" />
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 shadow-lg rounded-md z-50 min-w-[150px] max-h-64 overflow-y-auto"
          style={{ backgroundColor: getDropdownBgColor(), border: `1px solid ${getDropdownBorderColor()}` }}
        >
          <ul className="flex flex-col text-sm">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => translateLanguage(lang.code)}
                  style={{ color: getItemTextColor() }}
                  className="w-full text-left px-4 py-2 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getItemHoverBgColor()}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hidden Google element */}
      <div id="google_element" style={{ display: 'none' }} />
    </div>
  );
};

export default GoogleTranslate;
