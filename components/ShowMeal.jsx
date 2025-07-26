"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon, YoutubeIcon } from "@/components/Icons";
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";

/**
 * Highlights the currently spoken word in a sentence for the Text-to-Speech feature.
 */
function HighlightedSentence({ text, isActive, wordRange }) {
  if (!isActive || !wordRange) {
    return <span>{text}</span>;
  }

  const { startChar, endChar } = wordRange;
  const before = text.substring(0, startChar);
  const highlighted = text.substring(startChar, endChar);
  const after = text.substring(endChar);

  return (
    <span>
      {before}
      <span className="bg-blue-200 p-1 rounded-md">{highlighted}</span>
      {after}
    </span>
  );
}

/**
 * Renders a structured table of ingredients and their measurements.
 */
function IngredientsTable({ mealData }) {
  const ingredients = useMemo(() => {
    return Object.keys(mealData)
      .map(key => {
        if (key.startsWith("strIngredient") && mealData[key]) {
          const num = key.slice(13); // Gets the number from the key e.g., "1", "2"
          if (mealData[`strMeasure${num}`]) {
            return {
              measure: mealData[`strMeasure${num}`],
              name: mealData[key]
            };
          }
        }
        return null;
      })
      .filter(Boolean); // Filter out null values
  }, [mealData]);

  return (
    <div className="overflow-x-auto mt-2">
      <table className="table w-full">
        <thead>
          <tr className="text-left">
            <th className="p-2 w-1/3 text-sm font-semibold text-gray-600">Quantity</th>
            <th className="p-2 text-sm font-semibold text-gray-600">Ingredient</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing, i) => (
            <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="p-2 font-medium text-primary">{ing.measure}</td>
              <td className="p-2 text-gray-800">{ing.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The main page component to display a meal recipe with Text-to-Speech functionality.
 */
function ShowMeal({ URL }) {
  const [mealData, setMealData] = useState(null);
  const [playerState, setPlayerState] = useState('idle'); // 'idle', 'playing', 'paused'
  const [activeWordRange, setActiveWordRange] = useState({ sentenceIndex: -1, startChar: -1, endChar: -1 });
  const utterances = useRef([]);

  // Memoize instruction sentences to avoid recalculation on re-renders
  const instructionSentences = useMemo(() => {
    if (!mealData?.strInstructions) return [];

    // Split by newlines, which is more reliable for paragraphs
    return mealData.strInstructions.split(/\r?\n/).filter(s => s.trim());

    // Clean each instruction: remove leading numbers, dots, parentheses, and trim whitespace
    return mealData.strInstructions
      .split(/\r?\n/)
      .map(s => s.replace(/^\s*\d+([.)])?\s*/, "").trim())
      .filter(Boolean);

  }, [mealData]);

  // Effect to set up SpeechSynthesisUtterance objects when instructions change
  useEffect(() => {
    const synth = window.speechSynthesis;
    // Clear any previous speech queue
    synth.cancel();

    utterances.current = instructionSentences.map((text, sentenceIndex) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          setActiveWordRange({
            sentenceIndex,
            startChar: event.charIndex,
            endChar: event.charIndex + event.charLength,
          });
        }
      };

      utterance.onend = () => {
        // When the last sentence finishes, reset the player state
        if (sentenceIndex === instructionSentences.length - 1) {
          setPlayerState('idle');
          setActiveWordRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
        }
      };
      return utterance;
    });

    // Cleanup function to cancel speech when component unmounts or dependencies change
    return () => synth.cancel();
  }, [instructionSentences]);

  // Player control handlers
  const handlePlay = useCallback(() => {
    const synth = window.speechSynthesis;
    if (playerState === 'paused') {
      synth.resume();
    } else {
      utterances.current.forEach(utterance => synth.speak(utterance));
    }
    setPlayerState('playing');
  }, [playerState]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setPlayerState('paused');
  }, []);

  const handleRestart = useCallback(() => {
    window.speechSynthesis.cancel();
    setActiveWordRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    // Use a small timeout to ensure the queue is cleared before playing again
    setTimeout(() => {
        handlePlay();
    }, 100);
  }, [handlePlay]);


  // Effect to fetch meal data
  useEffect(() => {
    if (!URL) return;
    fetch(URL)
      .then(res => res.json())
      .then(data => setMealData(data.meals[0]))
      .catch(error => console.error("Error fetching data:", error));
  }, [URL]);

  // Loading state skeleton
  if (!mealData) {
    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-blue-50">
            <BackButton />
            <div className="max-w-4xl w-full p-12 bg-white rounded-xl shadow-lg">
                <div className="animate-pulse">
                    <div className="h-10 bg-gray-300 rounded-md w-3/4 mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded-md w-1/4 mx-auto mb-10"></div>
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/2">
                            <div className="h-80 bg-gray-300 rounded-lg"></div>
                        </div>
                        <div className="md:w-1/2 space-y-4">
                            <div className="h-8 bg-gray-300 rounded-md w-1/2"></div>
                            <div className="h-5 bg-gray-200 rounded-md"></div>
                            <div className="h-5 bg-gray-200 rounded-md"></div>
                            <div className="h-5 bg-gray-200 rounded-md"></div>
                            <div className="h-5 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // Main component render
  return (
    <div className="min-h-screen py-10 px-4 bg-blue-50 flex justify-center items-start">
      <BackButton />
      <div className="relative max-w-4xl w-full bg-white shadow-xl rounded-xl">
        <div className="p-6 md:p-12">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{mealData.strMeal}</h1>
            <p className="text-lg text-gray-500 mt-2">{mealData.strArea} Cuisine</p>
          </header>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            <div className="md:w-1/2">
              <img src={mealData.strMealThumb} alt={mealData.strMeal} className="w-full h-auto rounded-lg shadow-md mb-4" />
              <div className="flex items-center gap-4">
                <span className="badge badge-lg badge-accent">{mealData.strCategory}</span>
                {mealData.strYoutube && (
                  <Link href={mealData.strYoutube} target="_blank" rel="noopener noreferrer" className="btn btn-error btn-sm gap-2">
                    <YoutubeIcon /> Watch
                  </Link>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-gray-800">
                <PlusIcon />
                <span className="ml-2">Ingredients</span>
              </h2>
              <IngredientsTable mealData={mealData} />
            </div>
          </div>

          <section id="instructions-section">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Preparation Steps</h2>
              <div className="flex items-center gap-2 p-1 border border-gray-200 rounded-full bg-gray-50">
                <button onClick={playerState === 'playing' ? handlePause : handlePlay} className="btn btn-ghost btn-circle" title={playerState === 'playing' ? 'Pause' : 'Play'}>
                  {playerState === 'playing' ? <PauseIcon className="h-6 w-6 text-blue-600" /> : <PlayIcon className="h-6 w-6 text-green-600" />}
                </button>
                <button onClick={handleRestart} className="btn btn-ghost btn-circle" disabled={playerState === 'idle'} title="Restart">
                  <ArrowPathIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
              {instructionSentences.map((sentence, index) => (
                <li key={index}>
                  <HighlightedSentence
                    text={sentence}
                    isActive={index === activeWordRange.sentenceIndex}
                    wordRange={activeWordRange}
                  />
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ShowMeal;