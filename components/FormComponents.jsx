"use client";

import { MicrophoneIcon, StopIcon, X } from "@/components/Icons";
import { useState , useEffect } from "react";

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export function SelectField({ label, name, options, register }) {
  const labelEmojis = {
    "Type of Dish:": "🍽️",
    "Cuisine Preference:": "🌍",
    "Spice Level:": "🌶️"
  };

  return (
    <div className="form-control mb-6 min-w-64">
      <label className="label">
        <span className="text-white font-semibold flex items-center space-x-2">
          <span className="text-xl">{labelEmojis[label] || "📝"}</span>
          <span>{label}</span>
        </span>
      </label>
      <select 
        {...register(name)} 
        className="glass-card p-3 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none bg-transparent"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-gray-800 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({ label, name, options, register, descriptions = {} }) {
  const dietEmojis = {
    "Vegetarian": "🥬",
    "Vegan": "🌱",
    "Gluten-Free": "🚫",
    "Keto": "🥑",
    "Low-Carb": "📉",
    "High-Protein": "💪"
  };

  return (
    <div className="form-control mb-6">
      <label>
        <span className="text-white font-semibold flex items-center space-x-2 mb-4">
          <span className="text-xl">🍽️</span>
          <span>{label}</span>
        </span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> 
        {options.map((option) => (
          <label
            className="ingredient-tag cursor-pointer flex items-center gap-3 p-3 hover:bg-white/20 transition-all"
            key={option}
            title={descriptions[option] || ""}
          >
            <input
              type="checkbox"
              value={option}
              {...register(name)}
              className="w-4 h-4 text-orange-500 bg-transparent border-2 border-white rounded focus:ring-orange-500 focus:ring-2"
            />
            <div className="text-white flex-1 flex items-center space-x-2">
              <span className="text-lg">{dietEmojis[option] || "🍽️"}</span>
              <span>{option}</span>
              <span style={{ display: 'none' }}>
                {descriptions[option] || ""}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

/**
 * The InputField component provides a text input field with speech recognition and clear functionality.
 *
 * - Displays a label and an input field.
 * - Allows users to input text manually or via speech recognition.
 * - Provides buttons to start speech recognition and clear the input field.
 *
 * @param {string} label - The label for the input field.
 * @param {string} name - The name attribute for the input field.
 * @param {Function} register - The register function for form handling.
 */
export function InputField({ label, name, register , watch }) {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

   const watchedValue = watch ? watch(name) : "";
  useEffect(() => {
    setInputValue(watchedValue || "");
  }, [watchedValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const startListening = () => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  return (
    <div className="form-control mb-6">
      <label className="label">
        <span className="text-white font-semibold flex items-center space-x-2 mb-2">
          <span className="text-xl">💭</span>
          <span>{label}</span>
        </span>
      </label>
      <div className="relative w-full">
        <input
          type="text"
          {...register(name)}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Tell me what you're craving... 🤤"
          className="glass-card w-full pr-20 p-4 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          type="button"
          onClick={startListening}
          className={`absolute top-1/2 right-12 transform -translate-y-1/2 w-8 h-8 rounded-full transition-all ${
            isListening 
              ? "bg-red-500 hover:bg-red-600 animate-pulse" 
              : "glass-card hover:bg-blue-500/30"
          }`}
          disabled={isListening}
        >
          <span className="text-lg">
            {isListening ? "🛑" : "🎤"}
          </span>
        </button>

        <button
          type="button"
          onClick={handleClearInput}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 rounded-full glass-card hover:bg-red-500/30 transition-all"
        >
          <span className="text-lg">❌</span>
        </button>
      </div>
    </div>
  );
}