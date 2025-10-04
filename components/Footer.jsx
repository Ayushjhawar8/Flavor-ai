"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaShieldAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // react-icons v4.10+
import Link from "next/link";

const Footer = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const textColor = currentTheme === "dark" ? "text-white" : "text-gray-800";

  return (
    <footer
      data-aos="fade-up"
      className="footer rounded-md p-10 bg-base-200 text-base-content mt-auto"
    >
      {/* Branding */}
      <div className="text-center md:text-left space-y-4">
        <h3 className={`font-extrabold text-2xl tracking-wide ${textColor}`}>
          FlavorAI
        </h3>
        <p className={`text-xl ${textColor} opacity-85 max-w-xs leading-relaxed`}>
          Your AI-powered culinary companion for recipes, meal planning, and
          more!
        </p>
      </div>

      {/* 4 Columns Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 text-lg">
        {/* Features */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
          <h4 className={`font-bold text-xl mb-4 ${textColor}`}>✨ Features</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/generate" className="hover:underline">
                🤖 AI Recipe Generator
              </Link>
            </li>
            <li>
              <Link href="/planner" className="hover:underline">
                🗓 Meal Planner
              </Link>
            </li>
            <li>
              <Link href="/nutrition" className="hover:underline">
                🍎 Nutrition Analysis
              </Link>
            </li>
            <li>
              <Link href="/shopping" className="hover:underline">
                🛒 Shopping List
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
          <h4 className={`font-bold text-xl mb-4 ${textColor}`}>🔍 Explore</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/categories" className="hover:underline">
                📂 Categories
              </Link>
            </li>
            <li>
              <Link href="/trending" className="hover:underline">
                🔥 Trending Recipes
              </Link>
            </li>
            <li>
              <span>🎲 Random Recipe</span>
            </li>
            <li>
              <span>❤️ My Favorites</span>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
          <h4 className={`font-bold text-xl mb-4 ${textColor}`}>👥 Community</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="hover:underline">
                ℹ️ About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                📩 Contact Us
              </Link>
            </li>
            <li>
              <span>🥬 Vegetarian Recipes</span>
            </li>
            <li>
              <span>🍰 Dessert Recipes</span>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
          <h4 className={`font-bold text-xl mb-4 ${textColor}`}>⚖️ Legal</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/privacy" className="hover:underline">
                🔒 Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                📜 Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                ❓ FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 pt-6 border-t border-gray-400/50 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left space-y-6 lg:space-y-0">
        {/* Author */}
        <div className="text-center order-2 lg:order-1">
          <p className={`text-sm ${textColor}`}>
            Built with ❤️ by{" "}
            <Link
              href="https://github.com/KavlinKaur"
              target="_blank"
              className="hover:underline"
            >
              Kavlin Kaur
            </Link>
          </p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FlavorAI. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 order-1 lg:order-2">
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/contact" className="hover:underline">
            Support
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-6 order-3">
          <a
            href="https://github.com/KavlinKaur"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/kavlin-kaur"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://twitter.com/kavlin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaXTwitter size={24} />
          </a>
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaShieldAlt size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
