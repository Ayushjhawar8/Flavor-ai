"use client";

import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function Tooltip({ 
  children, 
  content, 
  position = "bottom", 
  delay = 300,
  className = ""
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updateTooltipPosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      let x = 0;
      let y = 0;

      switch (position) {
        case "top":
          x = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
          y = triggerRect.top + scrollY - tooltipRect.height - 8;
          break;
        case "bottom":
          x = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
          y = triggerRect.bottom + scrollY + 8;
          break;
        case "left":
          x = triggerRect.left + scrollX - tooltipRect.width - 8;
          y = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
          break;
        case "right":
          x = triggerRect.right + scrollX + 8;
          y = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
          break;
      }

      // Ensure tooltip stays within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (x < 8) x = 8;
      if (x + tooltipRect.width > viewportWidth - 8) {
        x = viewportWidth - tooltipRect.width - 8;
      }
      if (y < 8) y = 8;
      if (y + tooltipRect.height > viewportHeight - 8) {
        y = viewportHeight - tooltipRect.height - 8;
      }

      setTooltipPosition({ x, y });
    }
  };

  useEffect(() => {
    if (isVisible) {
      updateTooltipPosition();
      const handleScroll = () => updateTooltipPosition();
      const handleResize = () => updateTooltipPosition();
      
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isVisible, position]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className={className}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`fixed z-[9999] px-3 py-2 text-sm font-medium rounded-lg shadow-lg transition-opacity duration-200 pointer-events-none ${
            // Theme-aware styling
            "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
          } ${className}`}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          {content}
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 rotate-45 ${
              position === "top" ? "bottom-[-4px] left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100" :
              position === "bottom" ? "top-[-4px] left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100" :
              position === "left" ? "right-[-4px] top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-100" :
              "left-[-4px] top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-100"
            }`}
          />
        </div>
      )}
    </>
  );
}
