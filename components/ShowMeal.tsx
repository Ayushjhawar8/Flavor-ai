"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { PlusIcon, YoutubeIcon } from "@/components/Icons";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

interface ShowMealProps {
  URL: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  [key: string]: any;
}

interface WordRange {
  sentenceIndex: number;
  startChar: number;
  endChar: number;
}

export default function ShowMeal({ URL }: ShowMealProps) {
  const [mealData, setMealData] = useState<Meal | null>(null);
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [playerState, setPlayerState] = useState<"idle" | "playing" | "paused">("idle");
  const [activeWordRange, setActiveWordRange] = useState<WordRange>({
    sentenceIndex: -1,
    startChar: -1,
    endChar: -1,
  });
  const utterances = useRef<SpeechSynthesisUtterance[]>([]);

  // Load favorites from localStorage once on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites state changes
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites]);

  // Fetch meal data when URL changes


  // Compute instructions array
  const instructionSentences = useMemo(() => {
    if (!mealData?.strInstructions) return [];
    return mealData.strInstructions
      .split(/\r?\n/)
      .map((s) => s.replace(/^\s*\d+([.)])?\s*/, "").trim())
      .filter(Boolean);
  }, [mealData]);

  // Set up speech synthesis utterances
  useEffect(() => {
    if (instructionSentences.length === 0) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    utterances.current = instructionSentences.map((text, index) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          setActiveWordRange({
            sentenceIndex: index,
            startChar: event.charIndex,
            endChar: event.charIndex + event.charLength,
          });
        }
      };

      utterance.onend = () => {
        if (index === instructionSentences.length - 1) {
          setPlayerState("idle");
          setActiveWordRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
        }
      };

      return utterance;
    });

    return () => synth.cancel();
  }, [instructionSentences]);

  const handlePlay = useCallback(() => {
    const synth = window.speechSynthesis;
    if (playerState === "paused") {
      synth.resume();
    } else {
      // Prevent speaking utterances multiple times if already playing
      if (playerState !== "playing") {
        utterances.current.forEach((u) => synth.speak(u));
      }
    }
    setPlayerState("playing");
  }, [playerState]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setPlayerState("paused");
  }, []);

  const handleRestart = useCallback(() => {
    window.speechSynthesis.cancel();
    setPlayerState("idle");
    setTimeout(() => handlePlay(), 100);
  }, [handlePlay]);

const toggleFavorite = (meal: Meal) => {
  try {
    const stored = localStorage.getItem("favorites");
    let currentFavorites: Meal[] = stored ? JSON.parse(stored) : [];

    const exists = currentFavorites.some((f) => f.idMeal === meal.idMeal);

    // 3. Add or remove
    if (exists) {
      currentFavorites = currentFavorites.filter((f) => f.idMeal !== meal.idMeal);
    } else {
      currentFavorites.push(meal);
    }

    // 4. Save updated list to localStorage
    localStorage.setItem("favorites", JSON.stringify(currentFavorites));

    // 5. Update component state (so 💖 toggles live)
    setFavorites(currentFavorites);
  } catch (err) {
    console.error("Error updating favorites:", err);
  }
};



  // Check if meal is favorite
  const isFavorite = (idMeal: string) =>
    favorites.some((f) => f.idMeal === idMeal);

  // Guard UI rendering if mealData null (loading or error)
  if (!mealData) {
    return (
      <div className="min-h-screen py-10 px-4 bg-base-100 flex justify-center items-center">
        <BackButton />
        <p className="text-gray-600 text-lg mt-4">Loading meal details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-base-100 flex justify-center items-start">
      <BackButton />
      <div className="relative max-w-4xl w-full bg-base-200 shadow-xl rounded-xl">
        <div className="p-6 md:p-12">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">{mealData.strMeal}</h1>
            <p className="text-lg text-gray-600">{mealData.strArea} Cuisine</p>
          </header>

          <div className="flex flex-col md:flex-row gap-10 mb-10">
            <div className="md:w-1/2">
              <img
                src={mealData.strMealThumb}
                alt={mealData.strMeal}
                className="w-full rounded-lg shadow-md mb-4"
              />
              <div className="flex items-center gap-4">
                <span className="badge badge-lg badge-accent">{mealData.strCategory}</span>
                {mealData.strYoutube && (
                  <Link
                    href={mealData.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-error btn-sm gap-2"
                  >
                    <YoutubeIcon />
                    Watch
                  </Link>
                )}
                <button
                  onClick={() => toggleFavorite(mealData)}
                  className="btn btn-outline btn-sm ml-auto"
                >
                  {isFavorite(mealData.idMeal) ? "💖 Remove Favorite" : "🤍 Add Favorite"}
                </button>
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
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
                <button
                  onClick={playerState === "playing" ? handlePause : handlePlay}
                  className="btn btn-ghost btn-circle"
                >
                  {playerState === "playing" ? (
                    <PauseIcon className="h-6 w-6 text-blue-600" />
                  ) : (
                    <PlayIcon className="h-6 w-6 text-green-600" />
                  )}
                </button>
                <button
                  onClick={handleRestart}
                  className="btn btn-ghost btn-circle"
                  disabled={playerState === "idle"}
                >
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

// Highlighted word component
function HighlightedSentence({
  text,
  isActive,
  wordRange,
}: {
  text: string;
  isActive: boolean;
  wordRange: WordRange;
}) {
  if (!isActive || !wordRange) return <span>{text}</span>;

  const { startChar, endChar } = wordRange;
  const before = text.substring(0, startChar);
  const highlighted = text.substring(startChar, endChar);
  const after = text.substring(endChar);

  return (
    <span>
      {before}
      <span className="speaking-word text-blue-600 font-semibold">{highlighted}</span>
      {after}
    </span>
  );
}

// Ingredients table
function IngredientsTable({ mealData }: { mealData: Meal }) {
  const ingredients = useMemo(() => {
    return Object.keys(mealData)
      .filter((key) => key.startsWith("strIngredient") && mealData[key])
      .map((key) => {
        const num = key.slice(13);
        return {
          name: mealData[key],
          measure: mealData[`strMeasure${num}`],
        };
      });
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
