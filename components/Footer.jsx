"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // react-icons v4.10+
import Link from "next/link";

const Footer = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

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

  const socialLinks = [
    {
      href: "https://x.com/itsAyushJ",
      icon: FaXTwitter,
      label: "X (Twitter)",
      glow: "drop-shadow(0 0 8px #D99A30)",
    },
    {
      href: "https://github.com/Ayushjhawar8",
      icon: FaGithub,
      label: "GitHub",
      glow: "drop-shadow(0 0 8px #6E4B2A)",
    },
    {
      href: "https://www.linkedin.com/in/ayushjhawar8/",
      icon: FaLinkedin,
      label: "LinkedIn",
      glow: "drop-shadow(0 0 8px #30B4DB)",
    },
  ];

  const iconColor = currentTheme === "dark" ? "text-white" : "text-amber-800";
  const iconBg = currentTheme === "dark" ? "bg-muted/50" : "bg-amber-200/30";
  const iconHoverBg =
    currentTheme === "dark" ? "hover:bg-muted" : "hover:bg-amber-200/60";
  const textColor = currentTheme === "dark" ? "text-white" : "text-amber-800";

  return (
    <footer
      data-aos="fade-up"
      className="footer rounded-md p-10 bg-base-200 text-base-content mt-auto"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Brand / Title at top (positioned above Explore/Community on md+) */}
        <div className="flex justify-center md:justify-start mb-8">
          <div className="text-center md:ml-20 lg:ml-36">
            <h3 className={`text-4xl font-extrabold ${textColor} tracking-tight`}>
              Flavor AI
            </h3>
            <p className={`${textColor} opacity-85 mt-2`}>
              Your AI-powered culinary companion for recipes, nutrition, meal planning & more
            </p>
          </div>
        </div>

        {/* 5 Columns Section (brand moved to top) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16 items-stretch">
          {/* Features */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs md:max-w-md min-h-[260px] flex flex-col justify-between h-full">
            <h4
              className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}
            >
              ✨ Features
            </h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/ai-recipe-generator"
                  className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}
                >
                  🤖 AI Recipe Generator
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/diet-planner-ai"
                  className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}
                >
                  📋 Diet Planner
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/recipe-search"
                  className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}
                >
                  🔍 Recipe Search
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/upload-recipe-new"
                  className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}
                >
                  📤 Upload Recipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs md:max-w-md min-h-[260px] flex flex-col justify-between h-full">
            <h4
              className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}
            >
              🧭 Explore
            </h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/ingredient-explorer"
                  className={`${textColor} opacity-80 text-base block text-center hover:opacity-100 transition-opacity duration-200`}
                >
                  🥕 Ingredient Explorer
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/ingredient-similarity"
                  className={`${textColor} opacity-80 text-base block text-center hover:opacity-100 transition-opacity duration-200`}
                >
                  🔗 Ingredient Similarity
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/random"
                  className={`${textColor} opacity-80 text-base block text-center hover:opacity-100 transition-opacity duration-200`}
                >
                  🎲 Random Recipe
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/favorite"
                  className={`${textColor} opacity-80 text-base block text-center hover:opacity-100 transition-opacity duration-200`}
                >
                  ❤️ My Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs md:max-w-md min-h-[260px] flex flex-col justify-between h-full">
            <h4
              className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}
            >
              👥 Community
            </h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  🍽️ Community Recipes
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  🎉 Festive Recipes
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  🥬 Vegetarian Recipes
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  🍰 Dessert Recipes
                </span>
              </li>
            </ul>
          </div>

          {/* Tools & Support */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs md:max-w-md min-h-[260px] flex flex-col justify-between h-full">
            <h4
              className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}
            >
              🛠️ Tools & Support
            </h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/shopping-list"
                  className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}
                >
                  🛒 Shopping List
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/feedback"
                  className={`${textColor} opacity-80 text-base block text-center hover:opacity-100 transition-opacity duration-200`}
                >
                  ✉️ Feedback & Support
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/about"
                  className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}
                >
                  📖 About Us
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link
                  href="/contact"
                  className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}
                >
                  📞 Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - centered under middle columns on lg */}
        <div className="border-t border-opacity-20 pt-12">
          <div className="lg:grid lg:grid-cols-5">
            <div className="lg:col-start-2 lg:col-span-2">
              <div className="max-w-3xl mx-auto text-center px-4">
                <div className="flex flex-wrap justify-center gap-6 text-base mb-3">
                  <Link href="/about" className={`${textColor} opacity-70 hover:opacity-90 transition-opacity`}>
                    About Us
                  </Link>
                  <Link href="/privacy-policy" className={`${textColor} opacity-70 hover:opacity-90 transition-opacity`}>
                    Privacy Policy
                  </Link>
                  <Link href="/terms-of-service" className={`${textColor} opacity-70 hover:opacity-90 transition-opacity`}>
                    Terms of Service
                  </Link>
                  <Link href="/contact" className={`${textColor} opacity-70 hover:opacity-90 transition-opacity`}>
                    Contact
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className={`${textColor} opacity-70 text-base`}>Connect:</span>
                  <div className="flex gap-3">
                    {socialLinks.map(({ href, icon: Icon, label, glow }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${iconBg} ${iconHoverBg} ${iconColor} p-3 rounded-lg transition duration-300 hover:transform hover:scale-110`}
                        title={label}
                        aria-label={label}
                        style={{ filter: "none", transition: "all 0.3s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.filter = glow)}
                        onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className={`${textColor} text-lg font-semibold mb-1`}>
                  Created with <span className="text-red-500">❤️</span> by <a href="https://x.com/itsAyushJ" target="_blank" rel="noreferrer" className="underline">Ayush Jhawar</a>
                </div>
                <div className={`${textColor} opacity-70 text-sm`}>
                  &copy; {new Date().getFullYear()} Flavor AI. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
