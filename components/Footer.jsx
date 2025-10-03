"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaShieldAlt } from "react-icons/fa";
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
    // --- ANIMATION ADDED ---
    <footer data-aos="fade-up" className="footer rounded-md p-10 bg-base-200 text-base-content footer-center mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top Section - Brand */}
        <div className="mb-8 w-full flex flex-col items-center justify-center">
          <div className="w-full flex justify-center">
            <h3 className={`text-5xl font-bold mb-6 ${textColor} tracking-tight text-center`}>
              Flavor AI
            </h3>
          </div>
          <p className={`text-xl ${textColor} opacity-85 max-w-2xl leading-relaxed px-4 text-center mb-6`}>
            Your AI-powered culinary companion for recipes, nutrition, meal planning & more
          </p>

          {/* ...existing brand content (no moved bottom block) ... */}
        </div>

        {/* Main Links Section - 16 Items in Flashcard Style */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 justify-items-center">
          
          {/* Features & Planning Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs">
            <h4 className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}>✨ Features</h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link href="/ai-recipe-generator" className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}>
                  🤖 AI Recipe Generator
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link href="/diet-planner-ai" className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}>
                  📋 Diet Planner
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link href="/recipe-search" className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}>
                  🔍 Recipe Search
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link href="/upload-recipe-new" className={`${textColor} opacity-80 hover:opacity-100 text-base block text-center transition-all duration-300 hover:scale-105`}>
                  📤 Upload Recipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore & Analysis Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs">
            <h4 className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}>🧭 Explore</h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link href="/ingredient-explorer" className={`${textColor} opacity-80 text-base hover:opacity-100 block text-center transition-opacity duration-200`}>
                  🥕 Ingredient Explorer
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link href="/ingredient-similarity" className={`${textColor} opacity-80 text-base hover:opacity-100 block text-center transition-opacity duration-200`}>
                  🔗 Ingredient Similarity
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link href="/random" className={`${textColor} opacity-80 text-base hover:opacity-100 block text-center transition-opacity duration-200`}>
                  🎲 Random Recipe
                </Link>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <Link href="/favorite" className={`${textColor} opacity-80 text-base hover:opacity-100 block text-center transition-opacity duration-200`}>
                  ❤️ My Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Festival Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs">
            <h4 className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}>👥 Community</h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span className={`${textColor} opacity-80 text-base cursor-default block text-center`}>
                  🍽️ Community Recipes
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span className={`${textColor} opacity-80 text-base cursor-default block text-center`}>
                  🎉 Festive Recipes
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span className={`${textColor} opacity-80 text-base cursor-default block text-center`}>
                  🥬 Vegetarian Recipes
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span className={`${textColor} opacity-80 text-base cursor-default block text-center`}>
                  🍰 Dessert Recipes
                </span>
              </li>
            </ul>
          </div>

          {/* Tools & Support Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs">
            <h4 className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}>🛠️ Tools & Support</h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span className={`${textColor} opacity-80 text-base cursor-default block text-center`}>
                  🛒 Shopping List
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span className={`${textColor} opacity-80 text-base cursor-default block text-center`}>
                  💡 Help Center
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span className={`${textColor} opacity-80 text-base cursor-default block text-center`}>
                  📖 About Us
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span className={`${textColor} opacity-80 text-base cursor-default block text-center`}>
                  📞 Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Insert centered bottom block under the Explore (2nd) column on large screens */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="hidden lg:block" />
          <div className="lg:col-start-2 lg:col-span-2 w-full flex justify-center mt-6">
            <div className="max-w-2xl w-full text-center space-y-4">
              <div className="flex justify-center gap-6 text-base">
                <Link href="/about" className={`${textColor} opacity-80 hover:opacity-100 transition-opacity`}>About Us</Link>
                <Link href="/privacy-policy" className={`${textColor} opacity-80 hover:opacity-100 transition-opacity`}>Privacy Policy</Link>
                <Link href="/terms-of-service" className={`${textColor} opacity-80 hover:opacity-100 transition-opacity`}>Terms of Service</Link>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className={`${textColor} opacity-70 text-base`}>Connect:</span>
                <div className="flex gap-3 justify-center">
                  {socialLinks.map(({ href, icon: Icon, label, glow }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${iconBg} ${iconHoverBg} ${iconColor} p-3 rounded-lg transition duration-300 transform-gpu hover:scale-110`}
                      title={label}
                      aria-label={label}
                      style={{ filter: "none", transition: "all 0.3s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = glow)}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                  <a
                    href="mailto:ayushjhawar499@gmail.com"
                    className={`${iconBg} ${iconHoverBg} ${iconColor} p-3 rounded-lg transition duration-300 transform-gpu hover:scale-110`}
                    title="Email"
                    aria-label="Email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.876 1.797l-7.5 5.625a2.25 2.25 0 01-2.748 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="text-center">
                <div className={`${textColor} opacity-80 text-base`}>Created with <span className="text-red-500">❤️</span> by AyushJhawar</div>
                <div className={`${textColor} opacity-70 text-sm`}>
                  &copy; {new Date().getFullYear()} Flavor AI. All Rights Reserved.
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
