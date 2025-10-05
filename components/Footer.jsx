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
        {/* Top Section - Brand */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <h3 className={`text-5xl font-bold mb-6 ${textColor} tracking-tight`}>
            Flavor AI
          </h3>
          <p
            className={`text-xl ${textColor} opacity-85 max-w-2xl mx-auto leading-relaxed px-4`}
          >
            Your AI-powered culinary companion for recipes, nutrition, meal
            planning & more
          </p>
        </div>

        {/* Main Links Section - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 justify-items-center">
          {/* Features & Planning Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs">
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

          {/* Explore & Analysis Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs">
            <h4
              className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}
            >
              🧭 Explore
            </h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  🥕 Ingredient Explorer
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  🔗 Ingredient Similarity
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  🎲 Random Recipe
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  ❤️ My Favorites
                </span>
              </li>
            </ul>
          </div>

          {/* Community & Festival Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs">
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

          {/* Tools & Support Column */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full max-w-xs">
            <h4
              className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}
            >
              🛠️ Tools & Support
            </h4>
            <ul className="space-y-3">
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  🛒 Shopping List
                </span>
              </li>
              {/* START: ADDED FEEDBACK LINK */}
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition">
                <Link
                  href="/feedback"
                  className={`${textColor} opacity-80 text-base block text-center hover:opacity-100`}
                >
                  ✉️ Feedback & Support
                </Link>
              </li>
              {/* END: ADDED FEEDBACK LINK */}
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  📖 About Us
                </span>
              </li>
              <li className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200">
                <span
                  className={`${textColor} opacity-80 text-base cursor-default block text-center`}
                >
                  📞 Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-opacity-20 pt-12">
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-16">
            {/* Author Info */}
            <div className="text-center order-2 lg:order-1">
              <p className={`${textColor} text-lg font-semibold mb-3`}>
                Created with ❤️ by{" "}
                <a
                  href="https://x.com/itsAyushJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 underline transition-all duration-300"
                >
                  Ayush Jhawar
                </a>
              </p>
              <p className={`${textColor} opacity-70 text-base`}>
                &copy; {new Date().getFullYear()} Flavor AI. All Rights
                Reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-base order-3 lg:order-2">
              <span
                className={`${textColor} opacity-70 cursor-default hover:opacity-90 transition-opacity`}
              >
                About Us
              </span>
              <span
                className={`${textColor} opacity-70 cursor-default hover:opacity-90 transition-opacity`}
              >
                Privacy Policy
              </span>
              <span
                className={`${textColor} opacity-70 cursor-default hover:opacity-90 transition-opacity`}
              >
                Terms of Service
              </span>
              <span
                className={`${textColor} opacity-70 cursor-default hover:opacity-90 transition-opacity`}
              >
                Contact
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center order-1 lg:order-3">
              <span className={`${textColor} opacity-70 text-base mr-4`}>
                Connect:
              </span>
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
                    style={{
                      filter: "none",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = glow)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter = "none")
                    }
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Email */}
          <div className="text-center mt-10 pt-6 border-t border-opacity-10">
            <a
              href="mailto:ayushjhawar499@gmail.com"
              className={`${textColor} opacity-70 hover:opacity-100 text-base transition-all duration-300 hover:underline inline-flex items-center gap-2`}
            >
              📧 ayushjhawar499@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
