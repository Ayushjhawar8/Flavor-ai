"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const textColor = "text-base-content";
  const iconBg = "bg-white/10";
  const iconHoverBg = "hover:bg-white/20";
  const iconColor = "text-base-content";

  const socialLinks = [
    {
      href: "https://github.com/Ayushjhawar/flavor-ai",
      icon: FaGithub,
      label: "GitHub",
      glow: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
    },
    {
      href: "https://linkedin.com/in/ayushjhawar",
      icon: FaLinkedin,
      label: "LinkedIn",
      glow: "drop-shadow(0 0 6px rgba(10,102,194,0.6))",
    },
    {
      href: "https://x.com/itsAyushJ",
      icon: FaTwitter,
      label: "Twitter",
      glow: "drop-shadow(0 0 6px rgba(29,155,240,0.6))",
    },
  ];

  const sections = [
    {
      title: "✨ Features",
      links: [
        { label: "🤖 AI Recipe Generator", href: "/ai-recipe-generator" },
        { label: "📋 Diet Planner", href: "/diet-planner-ai" },
        { label: "🔍 Recipe Search", href: "/recipe-search" },
        { label: "📤 Upload Recipe", href: "/upload-recipe-new" },
      ],
    },
    {
      title: "🧭 Explore",
      links: [
        { label: "🥕 Ingredient Explorer", href: "/ingredient-explorer" },
        { label: "🔗 Ingredient Similarity", href: "/ingredient-similarity" },
        { label: "🎲 Random Recipe", href: "/random" },
        { label: "❤️ Favorites", href: "/favorite" },
      ],
    },
    {
      title: "👥 Community",
      links: [
        { label: "🍽️ Community Recipes", href: "/community" },
        { label: "🎉 Festive Recipes", href: "/festive" },
        { label: "🥬 Vegetarian Recipes", href: "/" },
        { label: "🍰 Dessert Recipes", href: "/festive" },
      ],
    },
    {
      title: "🛠️ Tools & Support",
      links: [
        { label: "🛒 Shopping List", href: "/shopping-list" },
        { label: "✉️ Feedback & Support", href: "/feedback" },
        { label: "📖 About Us", href: "/about" },
        { label: "📞 Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="footer rounded-md p-10 bg-base-200 text-base-content mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        {/* Brand */}
        <div className="text-center mb-12">
          <h3 className={`text-4xl font-extrabold ${textColor} tracking-tight`}>
            Flavor AI
          </h3>
          <p className={`${textColor} opacity-85 mt-2 max-w-2xl`}>
            Your AI-powered culinary companion for recipes, nutrition, meal
            planning & more
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 w-full items-start">
          {sections.map(({ title, links }) => (
            <div
              key={title}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 w-full h-full flex flex-col"
            >
              <h4
                className={`font-bold text-xl mb-6 ${textColor} text-center border-b border-white/20 pb-3`}
              >
                {title}
              </h4>

              {/* Align all links vertically */}
              <ul className="space-y-3 flex flex-col items-center flex-grow justify-start">
                {links.map(({ label, href }) => (
                  <li
                    key={label}
                    className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200 text-center w-full"
                  >
                    <Link
                      href={href}
                      className={`${textColor} opacity-80 hover:opacity-100 text-base transition-all duration-300 hover:scale-105 inline-block w-full`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-opacity-20 pt-12 w-full text-center flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-base">
            <Link
              href="/about"
              className={`${textColor} opacity-70 hover:opacity-90 transition-opacity`}
            >
              About Us
            </Link>
            <Link
              href="/privacy-policy"
              className={`${textColor} opacity-70 hover:opacity-90 transition-opacity`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className={`${textColor} opacity-70 hover:opacity-90 transition-opacity`}
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className={`${textColor} opacity-70 hover:opacity-90 transition-opacity`}
            >
              Contact
            </Link>
          </div>

          <div className="flex gap-3 justify-center">
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

          <div className={`${textColor} text-lg font-semibold mt-4`}>
            Created with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://x.com/itsAyushJ"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Ayush Jhawar
            </a>
          </div>

          <div className={`${textColor} opacity-70 text-sm`}>
            &copy; {new Date().getFullYear()} Flavor AI. All Rights Reserved.
          </div>

          <div className="mt-4">
            <a
              href="mailto:ayushjhawar499@gmail.com"
              className={`${textColor} opacity-70 hover:opacity-100 text-base transition-all duration-300 hover:underline`}
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
