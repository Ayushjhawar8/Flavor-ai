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
  const hoverColor=currentTheme === "dark" ? "hover:text-[#5ba4fd]" : "hover:text-[#4b2508]";
  const colorbuttoncontri=currentTheme === "dark" ? "#5ba4fd" : "#4b2508";
  return (
    // --- ANIMATION ADDED ---
    <footer data-aos="fade-up" className="footer rounded-md pl-20 pr-20 pt-8 pb-8 bg-base-200 text-base-content footer-center mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-full mx-auto space-y-4 md:space-y-0">
        {/* Left: Title & Subtitle */}
        <div className="text-center md:text-left max-w-64">
          <h3
            className={`card-title text-lg md:text-2xl flex items-center ${textColor}`}
          >
            Flavor AI
          </h3>
          <p
            className={`card-title text-base md:text-lg flex items-center ${textColor}`}
          >
            Your AI-powered culinary companion that offers a range of intelligent features to streamline your cooking and meal planning. It uses AI-Curated Recipes and an AI Diet Planner for personalized meals tailored to your health and goals.
          </p>
          <div className="flex gap-4 text-xl pt-2 mb-1 justify-start">
            {socialLinks.map(({ href, icon: Icon, label, glow }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${iconBg} ${iconHoverBg} ${iconColor} p-2 rounded-lg flex items-center justify-center transition duration-300`}
                title={label}
                aria-label={label}
                style={{
                  filter: "none",
                  transition: "box-shadow 0.3s, filter 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = glow)}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Center: Useful Links */}
        <div className={`flex flex-col text-base md:text-lg  items-start space-y-2 ${textColor}`} >
          <h3
            className={`card-title text-lg md:text-2xl flex justify-center items-center ${textColor}`}
          >
            Useful Links
          </h3>
    
          <Link href="/ai" className={`${hoverColor}`}>
            Get AI-Generated Recipes
          </Link>
          <Link href="/random" className={`${hoverColor}`}>
            Discover a Random Recipe
          </Link>
          <Link href="/diet-planner" className={`${hoverColor}`}>
            AI Diet Planner
          </Link>
          <Link href="/festive" className={`${hoverColor}`}>
            Festive Dishes
          </Link>
          <Link href="/ingredient-explorer" className={`${hoverColor}`}>
            AI Ingredient Explorer
          </Link>
          <Link href="/favorite" className={`${hoverColor}`}>
            Favorites
          </Link>
          
                        
          
          
        </div>

        {/* Right: Social & Email & Copyright */}
        <div className="text-sm text-center md:text-start w-full md:w-auto">
          <a
            href="https://x.com/itsAyushJ"
            target="_blank"
            rel="noopener noreferrer"
            className={`card-title text-lg md:text-xl flex items-start justify-start mb-2 ${textColor}`}
          >
            Ayush Jhawar
          </a>
          <div className="flex flex-col sm:flex-row  items-start justify-start mb-5">
            <a
              href="https://github.com/Ayushjhawar8/Flavor-ai/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md flex items-center justify-center mb-2 hover:bg-primary-focus transition-colors"
              style={{ background: `${colorbuttoncontri}` }}
            >
              Contribute on GitHub
            </a>
          </div>
          
          
          <div
            className={`card-title text-lg md:text-xl flex items-start justify-start mb-2 ${textColor}`}
          >
            Connect with Ayush
          </div>
          
          
          <a
            href="mailto:ayushjhawar499@gmail.com"
            className={`text-base font-medium md:text-start ${textColor} block mb-5 ${hoverColor}`}
            style={{ wordBreak: "break-all" }}
          >
            ayushjhawar499@gmail.com
          </a>
          

          <p
            className={`card-title text-lg md:text-xl flex items-start ${textColor}`}
          >
            &copy; {new Date().getFullYear()} Flavor AI. All Rights Reserved.
          </p>
          {/* Privacy Policy link */}
          <Link
            href="/privacy-policy"
            className={`text-sm underline block mb-1 ${textColor} ${hoverColor}`}
          >
            Privacy Policy
          </Link>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
