import React from "react";
import { MousePointerClick } from "lucide-react";

const CursorToggle = ({ cursorEnabled, setCursorEnabled }) => {
  return (
    <button
      onClick={() => setCursorEnabled(!cursorEnabled)}
      className="relative p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md ml-3"
      aria-label="Toggle animated cursor"
      title={cursorEnabled ? "Disable animated cursor" : "Enable animated cursor"}
      style={{
        transform: cursorEnabled ? "rotate(0deg) scale(1)" : "rotate(360deg) scale(0.8)",
        opacity: cursorEnabled ? 1 : 0.5,
        transition: "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
      }}
    >
      <div className="w-5 h-5">
        <MousePointerClick className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      </div>
    </button>
  );
};

export default CursorToggle;
