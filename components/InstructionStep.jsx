"use client";

import { useState, useEffect, useRef } from 'react';

// This component handles the visual word-by-word highlighting simulation.
function InstructionStep({ text, number, isActive }) {
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
  const words = text.split(' ');
  const timeouts = useRef([]);

  useEffect(() => {
    // This effect runs ONLY when a step becomes active.
    if (isActive) {
      let wordIndex = 0;
      // A function to highlight words sequentially.
      const highlightNextWord = () => {
        if (wordIndex < words.length) {
          setHighlightedWordIndex(wordIndex);
          // Estimate word duration based on length. Adjust these numbers to change speed.
          const duration = words[wordIndex].length * 90 + 150; 
          const timeoutId = setTimeout(highlightNextWord, duration);
          timeouts.current.push(timeoutId);
          wordIndex++;
        } else {
          // Reset after the last word
          setHighlightedWordIndex(-1);
        }
      };
      
      highlightNextWord();
    }

    // Cleanup function: This is crucial. It clears all scheduled highlights
    // if the component re-renders or if isActive becomes false.
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
      setHighlightedWordIndex(-1);
    };
  }, [isActive, text]); // Dependency array ensures this only runs when needed.

  return (
    <li className={`recipe-step ${isActive ? 'active-sentence' : ''}`}>
      {words.map((word, index) => (
        <span key={index} className={index === highlightedWordIndex ? 'speaking-word' : ''}>
          {word}{' '}
        </span>
      ))}
    </li>
  );
}

export default InstructionStep;
