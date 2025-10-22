import Link from "next/link";
import React from "react";

const Logo = ({ currentTheme }) => {
  return (
    <Link
      href="/"
      id="main"
      className={`text-sm md:text-base font-bold px-3.5 py-1.5 rounded-full transition-all duration-300 backdrop-blur-md 
      ${
        currentTheme === "dark"
          ? "bg-gradient-to-br from-pink-700 via-purple-800 to-pink-700 text-white hover:shadow-lg"
          : "bg-gradient-to-br from-pink-200 via-purple-300 to-pink-200 text-gray-900 hover:shadow-md"
      } hover:scale-[1.02] border border-white/10`}
    >
      Flavor AI
    </Link>
  );
};

export default Logo;
