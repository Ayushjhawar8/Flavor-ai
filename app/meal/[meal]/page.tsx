// app/meal/[meal]/page.tsx
"use client";

import { use, useEffect, useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ShowMeal from "@/components/ShowMeal";
import BackButton from "@/components/BackButton";
import { PlusIcon, YoutubeIcon } from "@/components/Icons";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
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

export default function Page({ params }: { params: Promise<{ meal: string }> }) {
  const { meal } = use(params);

  const [mealData, setMealData] = useState<Meal | null>(null);
  const [playerState, setPlayerState] = useState<"idle" | "playing" | "paused">("idle");
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [activeWordRange, setActiveWordRange] = useState<WordRange>({
    sentenceIndex: -1,
    startChar: -1,
    endChar: -1,
  });

  const utterances = useRef<SpeechSynthesisUtterance[]>([]);

  const instructionSentences = useMemo(() => {
    if (!mealData?.strInstructions) return [];
    return mealData.strInstructions
      .split(/\r?\n/)
      .map((s) => s.replace(/^\s*\d+([.)])?\s*/, "").trim())
      .filter(Boolean);
  }, [mealData]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
      .then((res) => res.json())
      .then((data) => setMealData(data.meals?.[0]))
      .catch((err) => console.error("Error fetching meal:", err));
  }, [meal]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (meal: Meal) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.idMeal === meal.idMeal);
      return exists ? prev.filter((m) => m.idMeal !== meal.idMeal) : [...prev, meal];
    });
  };

  const isFavorite = (id: string) => favorites.some((m) => m.idMeal === id);

  useEffect(() => {
    const synth = window.speechSynthesis;
    synth.cancel();

    utterances.current = instructionSentences.map((text, sentenceIndex) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;

      utterance.onboundary = (event: any) => {
        if (event.name === "word") {
          setActiveWordRange({
            sentenceIndex,
            startChar: event.charIndex,
            endChar: event.charIndex + event.charLength,
          });
        }
      };

      utterance.onend = () => {
        if (sentenceIndex === instructionSentences.length - 1) {
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
      utterances.current.forEach((u) => synth.speak(u));
    }
    setPlayerState("playing");
  }, [playerState]);

  const handlePause = () => {
    window.speechSynthesis.pause();
    setPlayerState("paused");
  };

  const handleRestart = () => {
    window.speechSynthesis.cancel();
    setPlayerState("idle");
    setTimeout(() => handlePlay(), 100);
  };

  if (!mealData) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen py-10 px-4 bg-base-100 flex justify-center items-start">
      <BackButton />
      <div className="relative max-w-4xl w-full bg-base-200 shadow-xl rounded-xl">
        <div className="p-6 md:p-12">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              {mealData.strMeal}
            </h1>
            <p className="text-lg text-gray-500 mt-2">{mealData.strArea} Cuisine</p>
          </header>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
            <div className="md:w-1/2">
              <Image
                src={mealData.strMealThumb}
                alt={mealData.strMeal}
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div className="flex items-center gap-4 mt-4">
                <span className="badge badge-accent">{mealData.strCategory}</span>
                <button
                  onClick={() => toggleFavorite(mealData)}
                  className="btn btn-sm btn-outline"
                >
                  {isFavorite(mealData.idMeal) ? "💖 Remove Favorite" : "🤍 Add Favorite"}
                </button>
                {mealData.strYoutube && (
                  <Link
                    href={mealData.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-error btn-sm gap-2"
                  >
                    <YoutubeIcon /> Watch
                  </Link>
                )}
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2 flex items-center text-gray-800">
                <PlusIcon /> <span className="ml-2">Ingredients</span>
              </h2>
              <IngredientsTable mealData={mealData} />
            </div>
          </div>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Preparation Steps</h2>
              <div className="flex items-center gap-2 p-1 border rounded-full bg-gray-50">
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

function HighlightedSentence({
  text,
  isActive,
  wordRange,
}: {
  text: string;
  isActive: boolean;
  wordRange: WordRange;
}) {
  if (!isActive || wordRange.startChar === -1) return <span>{text}</span>;

  const { startChar, endChar } = wordRange;
  const before = text.substring(0, startChar);
  const highlighted = text.substring(startChar, endChar);
  const after = text.substring(endChar);

  return (
    <span>
      {before}
      <span className="bg-yellow-200 font-bold">{highlighted}</span>
      {after}
    </span>
  );
}

function IngredientsTable({ mealData }: { mealData: Meal }) {
  const ingredients = useMemo(() => {
    return Object.keys(mealData)
      .filter((key) => key.startsWith("strIngredient") && mealData[key])
      .map((key) => {
        const number = key.replace("strIngredient", "");
        return {
          name: mealData[key],
          measure: mealData[`strMeasure${number}`],
        };
      })
      .filter((item) => item.name && item.measure);
  }, [mealData]);

  return (
    <table className="table-auto w-full mt-2 text-left">
      <thead>
        <tr>
          <th className="p-2">Quantity</th>
          <th className="p-2">Ingredient</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((ing, idx) => (
          <tr key={idx}>
            <td className="p-2 font-semibold">{ing.measure}</td>
            <td className="p-2">{ing.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
