"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon, YoutubeIcon } from "@/components/Icons";
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

// --- Self-contained helper components ---
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
      <span className="speaking-word">{highlighted}</span>
      {after}
    </span>
  );
}

function IngredientsTable({ mealData }) {
  const ingredients = useMemo(
    () =>
      Object.keys(mealData)
        .map((key) => {
          if (key.startsWith("strIngredient") && mealData[key]) {
            const num = key.slice(13);
            if (mealData[`strMeasure${num}`])
              return {
                measure: mealData[`strMeasure${num}`],
                name: mealData[key],
              };
          }
          return null;
        })
        .filter(Boolean),
    [mealData]
  );
  return (
    <div className="overflow-x-auto mt-2">
      <table className="table w-full">
        <thead>
          <tr className="text-left">
            <th className="p-2 w-1/3 text-sm font-semibold text-primary">
              Quantity
            </th>
            <th className="p-2 text-sm font-semibold text-primary">
              Ingredient
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing, i) => (
            <tr key={i} className="border-t border-base-300 hover:bg-base-200">
              <td className="p-2 font-medium text-secondary">{ing.measure}</td>
              <td className="p-2 text-base-content">{ing.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- The Main Page Component ---
function ShowMeal({ URL }) {
  const [mealData, setMealData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (meal) => {
    let updatedFavorites = [];
    if (favorites.some((f) => f.idMeal === meal.idMeal)) {
      updatedFavorites = favorites.filter((f) => f.idMeal !== meal.idMeal);
    } else {
      updatedFavorites = [...favorites, meal];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (idMeal) => favorites.some((f) => f.idMeal === idMeal);

  // --- Instruction TTS ---
  const [playerState, setPlayerState] = useState("idle");
  const [activeWordRange, setActiveWordRange] = useState({
    sentenceIndex: -1,
    startChar: -1,
    endChar: -1,
  });
  const utterances = useRef([]);

  const instructionSentences = useMemo(() => {
    if (!mealData?.strInstructions) return [];
    return mealData.strInstructions
      .split(/\r?\n/)
      .map((s) => s.replace(/^\s*\d+([.)])?\s*/, "").trim())
      .filter(Boolean);
  }, [mealData]);

  const allergenKeywords = [
    "milk", "cheese", "butter", "cream", "egg", "peanut", "almond", "cashew", "walnut", "pecan", "hazelnut", "wheat", "barley", "rye", "soy", "soybean", "shrimp", "prawn", "crab", "lobster", "clam", "mussel", "oyster", "fish"
  ];

  const detectedAllergens = useMemo(() => {
    if (!mealData) return [];
    const ingredients = Object.keys(mealData)
      .filter(k => k.startsWith("strIngredient") && mealData[k])
      .map(k => mealData[k].toLowerCase());

    return allergenKeywords.filter(allergen =>
      ingredients.some(ing => ing.includes(allergen))
    );
  }, [mealData]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    synth.cancel();

    utterances.current = instructionSentences.map((text, sentenceIndex) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;

      utterance.onboundary = (event) => {
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
      utterances.current.forEach((utterance) => synth.speak(utterance));
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
    setTimeout(() => {
      handlePlay();
    }, 100);
  }, [handlePlay]);

  // --- Ingredient TTS ---
  const ingredientSentences = useMemo(() => {
    if (!mealData) return [];
    return Object.keys(mealData)
      .map((key) => {
        if (key.startsWith("strIngredient") && mealData[key]) {
          const num = key.slice(13);
          const measure = mealData[`strMeasure${num}`];
          if (measure) return `${measure.trim()} ${mealData[key].trim()}`;
        }
        return null;
      })
      .filter(Boolean);
  }, [mealData]);

  const [ingredientPlayerState, setIngredientPlayerState] = useState("idle");
  const ingredientUtterances = useRef([]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    synth.cancel();

    ingredientUtterances.current = ingredientSentences.map((text, index) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.onend = () => {
        if (index === ingredientSentences.length - 1) {
          setIngredientPlayerState("idle");
        }
      };
      return utterance;
    });

    return () => synth.cancel();
  }, [ingredientSentences]);

  const handleIngredientPlay = useCallback(() => {
    const synth = window.speechSynthesis;
    if (ingredientPlayerState === "paused") {
      synth.resume();
    } else {
      ingredientUtterances.current.forEach((utt) => synth.speak(utt));
    }
    setIngredientPlayerState("playing");
  }, [ingredientPlayerState]);

  const handleIngredientPause = useCallback(() => {
    window.speechSynthesis.pause();
    setIngredientPlayerState("paused");
  }, []);

  const handleIngredientRestart = useCallback(() => {
    window.speechSynthesis.cancel();
    setIngredientPlayerState("idle");
    setTimeout(() => {
      handleIngredientPlay();
    }, 100);
  }, [handleIngredientPlay]);

  // --- Fetch Meal ---
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setMealData(data.meals[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, [URL]);

  if (!mealData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen mt-20 flex bg-base-100 justify-center items-center p-4">
          <div className="max-w-4xl w-full p-12 my-6 skeleton bg-base-200 rounded-xl shadow-md">
            <div className="animate-pulse">
              <div className="h-10 bg-base-300 rounded-md w-60 mx-auto mb-4"></div>
              <div className="h-6 bg-base-300 rounded-md w-40 mx-auto mb-10"></div>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                  <div className="h-80 bg-base-300 rounded-lg"></div>
                </div>
                <div className="md:w-1/2 space-y-4">
                  <div className="h-8 bg-base-300 rounded-md w-40"></div>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-8 bg-base-300 rounded-md"></div>
                  ))}
                </div>
              </div>
              <div className="h-8 bg-base-300 rounded-md w-40 mt-6"></div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 bg-base-300 my-2 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 px-4 mt-20 bg-base-100 flex justify-center items-start">
        <BackButton />
        <div className="relative max-w-4xl w-full bg-base-200 shadow-xl rounded-xl">
          <div className="p-6 md:p-12">
            <header className="relative text-center mb-8">
              <button
                onClick={() => toggleFavorite({
                  idMeal: mealData.idMeal,
                  strMeal: mealData.strMeal,
                  strMealThumb: mealData.strMealThumb
                })}
                className="absolute top-0 right-0 bg-black text-white rounded-full p-2 text-lg hover:bg-black hover:text-black transition"
                aria-label="Toggle favorite"
              >
                {isFavorite(mealData.idMeal) ? "💖" : "🤍"}
              </button>
              <h1 className="text-3xl md:text-5xl font-bold text-base-content">
                {mealData.strMeal}
              </h1>
              <p className="text-lg text-primary mt-2">
                {mealData.strArea} Cuisine
              </p>
              {detectedAllergens.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {detectedAllergens.map((allergen) => (
                    <span key={allergen} className="badge badge-sm badge-error text-white">
                      {allergen}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
              <div className="md:w-1/2">
                <img
                  src={mealData.strMealThumb}
                  alt={mealData.strMeal}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <div className="flex items-center gap-4">
                  <span className="badge badge-lg badge-accent">
                    {mealData.strCategory}
                  </span>
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
                <h2 className="text-2xl font-bold mb-2 flex items-center justify-between text-base-content">
                  <div className="flex items-center">
                    <PlusIcon />
                    <span className="ml-2">Ingredients</span>
                  </div>
                  <div className="flex items-center gap-2 p-1 border border-base-300 rounded-full bg-base-200">
                    <button
                      onClick={
                        ingredientPlayerState === "playing"
                          ? handleIngredientPause
                          : handleIngredientPlay
                      }
                      className="btn btn-ghost btn-circle"
                    >
                      {ingredientPlayerState === "playing" ? (
                        <PauseIcon className="h-6 w-6 text-info" />
                      ) : (
                        <PlayIcon className="h-6 w-6 text-success" />
                      )}
                    </button>
                    <button
                      onClick={handleIngredientRestart}
                      className="btn btn-ghost btn-circle"
                      disabled={ingredientPlayerState === "idle"}
                    >
                      <ArrowPathIcon className="h-5 w-5 text-base-content/60" />
                    </button>
                  </div>
                </h2>
                <IngredientsTable mealData={mealData} />
              </div>
            </div>

            <section id="instructions-section">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-base-content">
                  Preparation Steps
                </h2>
                <div className="flex items-center gap-2 p-1 border border-base-300 rounded-full bg-base-200">
                  <button
                    onClick={
                      playerState === "playing" ? handlePause : handlePlay
                    }
                    className="btn btn-ghost btn-circle"
                  >
                    {playerState === "playing" ? (
                      <PauseIcon className="h-6 w-6 text-info" />
                    ) : (
                      <PlayIcon className="h-6 w-6 text-success" />
                    )}
                  </button>
                  <button
                    onClick={handleRestart}
                    className="btn btn-ghost btn-circle"
                    disabled={playerState === "idle"}
                  >
                    <ArrowPathIcon className="h-5 w-5 text-base-content/60" />
                  </button>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-4 text-base-content leading-relaxed">
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
      <Footer />
    </>
  );
}

export default ShowMeal;
