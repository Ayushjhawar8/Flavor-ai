"use client"

import { useEffect, useState, useRef } from "react"

interface TrailPoint {
  x: number
  y: number
  id: number
  timestamp: number
}

export default function SnakeCursor() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [animationFrame, setAnimationFrame] = useState(0)
  const pointIdRef = useRef(0)

  const handleMouseMove = (e: MouseEvent) => {
    const newPoint: TrailPoint = {
      x: e.clientX,
      y: e.clientY,
      id: pointIdRef.current++,
      timestamp: Date.now(),
    }

    setTrail((prev) => {
      const filtered = prev.filter((pt) => Date.now() - pt.timestamp < 800)
      return [newPoint, ...filtered].slice(0, 12)
    })
  }

  const handleMouseEnter = () => setIsVisible(true)
  const handleMouseLeave = () => setIsVisible(false)

  useEffect(() => {
    document.body.classList.add("snake-cursor-active")

    let rafId: number
    const animate = () => {
      setAnimationFrame((prev) => prev + 1)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const checkDarkMode = () => {
      const theme = document.documentElement.getAttribute("data-theme")
      const isDark =
        theme === "dark" ||
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(isDark)
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", checkDarkMode)

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    const cleanupInterval = setInterval(() => {
      setTrail((prev) => prev.filter((pt) => Date.now() - pt.timestamp < 800))
    }, 100)

    return () => {
      document.body.classList.remove("snake-cursor-active")
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      observer.disconnect()
      mediaQuery.removeEventListener("change", checkDarkMode)
      clearInterval(cleanupInterval)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!isVisible || trail.length === 0) return null

  return (
    <div className="fixed pointer-events-none top-0 left-0 w-full h-full" style={{ zIndex: 999999 }}>
      {trail.map((point, index) => {
        const progress = index / Math.max(trail.length - 1, 1)
        const age = (Date.now() - point.timestamp) / 800
        const opacity = Math.max(0, Math.min(1, (1 - progress) * (1 - age)))
        const baseSize = 20
        const size = Math.max(6, baseSize * (1 - progress * 0.6) * (1 - age * 0.3))

        const colorSchemes = isDarkMode
          ? [
              { r: 168, g: 85, b: 247 },
              { r: 59, g: 130, b: 246 },
              { r: 236, g: 72, b: 153 },
              { r: 34, g: 197, b: 94 },
              { r: 251, g: 191, b: 36 },
              { r: 239, g: 68, b: 68 },
            ]
          : [
              { r: 147, g: 51, b: 234 },
              { r: 37, g: 99, b: 235 },
              { r: 219, g: 39, b: 119 },
              { r: 5, g: 150, b: 105 },
              { r: 245, g: 158, b: 11 },
              { r: 220, g: 38, b: 38 },
            ]

        const color = colorSchemes[index % colorSchemes.length]
        const isHead = index < 3
        const pulseIntensity = isHead ? 1 + Math.sin(animationFrame * 0.1 + index) * 0.15 : 1
        const smoothness = Math.min(1, opacity * 2)

        return (
          <div
            key={point.id}
            className="absolute rounded-full transition-all duration-75 ease-out"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              background: `radial-gradient(circle, 
                rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.9}) 0%, 
                rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.6}) 40%, 
                rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.2}) 70%, 
                transparent 100%)`,
              boxShadow: `
                0 0 ${size * 1.2}px rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.7}),
                0 0 ${size * 2.5}px rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.3}),
                inset 0 0 ${size * 0.3}px rgba(255, 255, 255, ${opacity * 0.4})`,
              transform: `scale(${smoothness * pulseIntensity})`,
              filter: `blur(${progress * 0.3}px)`,
              opacity: opacity,
            }}
          />
        )
      })}
    </div>
  )
}