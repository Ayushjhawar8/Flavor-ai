"use client";

import { MicrophoneIcon, StopIcon, X } from "@/components/Icons";
import { useState } from "react";

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export function SelectField({ label, name, options, register }) {
  return (
    <div className="form-control mb-4 min-w-64">
      <label className="label">
        <span className="label-text text-gray-700 font-medium">{label}</span>
      </label>
      <select {...register(name)} className="select select-bordered w-full">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({ label, name, options, register, descriptions = {} }) {
  return (
    <div className="form-control mb-4 ">
      <label>
        <span className="label-text">{label}</span>
      </label>
      <div className="grid grid-cols-2 gap-4"> 
        {options.map((option) => (
          <label
            className="label cursor-pointer inline-flex items-center gap-3 "
            key={option}
            title={descriptions[option] || ""}
          >
            <input
              type="checkbox"
              value={option}
              {...register(name)}
              className="checkbox checkbox-primary "
            />
            <div className="label-text text-gray-700 flex-1 ">
              {option}
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
export function InputField({ label, name, register }) {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

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
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative w-full">
        <input
          type="text"
          {...register(name)}
          value={inputValue}
          onChange={handleInputChange}
          className="input input-bordered w-full pr-16 text-gray-700 bg-white border-gray-300"
        />

        <button
          type="button"
          onClick={startListening}
          className={`absolute top-1/2 right-12 transform -translate-y-1/2 btn btn-circle btn-sm ${
            isListening ? "btn-secondary" : "btn-primary"
          }`}
          disabled={isListening}
        >
          {isListening ? <StopIcon /> : <MicrophoneIcon />}
        </button>

        <button
          type="button"
          onClick={handleClearInput}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 btn btn-circle btn-sm btn-error"
        >
          <X />
        </button>
      </div>
    </div>
  );
}
