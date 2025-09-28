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
      href: "https://www.linkedin.com/in/",
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
    <footer className="footer rounded-md p-10 bg-base-200 text-base-content footer-center mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto space-y-4 md:space-y-0">
        {/* Left: Title & Subtitle */}
        <div className="text-center md:text-left">
          <h3
            className={`card-title text-lg md:text-xl flex items-center ${textColor}`}
          >
            Flavor AI
          </h3>
          <p
            className={`card-title text-lg md:text-xl flex items-center ${textColor}`}
          >
            Your AI-powered culinary companion.
          </p>
        </div>

        {/* Center: Author & Button */}
        <div className="flex flex-col items-center space-y-4">
          <a
            href="https://x.com/itsAyushJ"
            target="_blank"
            rel="noopener noreferrer"
            className={`card-title text-lg md:text-xl flex items-center ${textColor}`}
          >
            Ayush Jhawar
          </a>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <a
              href="https://github.com/Ayushjhawar8/Flavor-ai/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md flex items-center gap-2 hover:bg-primary-focus transition-colors"
              style={{ background: "#6E4B2A" }}
            >
              Contribute on GitHub
            </a>
          </div>
        </div>

        {/* Right: Social & Email & Copyright */}
        <div className="text-sm text-center md:text-center w-full md:w-auto">
          <div
            className={`card-title text-lg md:text-xl flex items-center justify-center mb-2 ${textColor}`}
          >
            Connect with Ayush
          </div>
          <div className="flex gap-4 text-xl mb-2 justify-end md:justify-center">
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
          <a
            href="mailto:ayushjhawar499@gmail.com"
            className={`text-sm font-medium md:text-center ${textColor} block mb-1`}
            style={{ wordBreak: "break-all" }}
          >
            ayushjhawar499@gmail.com
          </a>

          <p
            className={`card-title text-lg md:text-xl flex items-center ${textColor}`}
          >
            &copy; {new Date().getFullYear()} Flavor AI. All Rights Reserved.
          </p>
          {/* Privacy Policy link */}
          <Link
            href="/privacy-policy"
            className={`text-sm underline hover:text-blue-500 block mb-1 ${textColor}`}
          >
            Privacy Policy
          </Link>
          {/* Terms of Service link */}
          <Link
            href="/terms"
            className={`text-sm underline hover:text-blue-500 block mb-1 ${textColor}`}
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
