"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon, YoutubeIcon } from "@/components/Icons";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ShareButton from "@/components/ShareButton";

// --- Self-contained helper components ---
function HighlightedSentence({ text, isActive, wordRange }) {
  if (!isActive || !wordRange) return <span>{text}</span>;

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

function HighlightedIngredient({ text, temp, isActive, wordRange }) {
  if (!isActive || !wordRange) return <span>{text}</span>;

  const { startChar, endChar } = wordRange;
  const cellEndPos = temp + text.length;

  if (endChar <= temp || startChar >= cellEndPos) return <span>{text}</span>;

  const localStartChar = Math.max(0, startChar - temp);
  const localEndChar = Math.min(text.length, endChar - temp);

  const before = text.substring(0, localStartChar);
  const highlighted = text.substring(localStartChar, localEndChar);
  const after = text.substring(localEndChar);

  return (
    <span>
      {before}
      <span className="speaking-word">{highlighted}</span>
      {after}
    </span>
  );
}

function IngredientsTable({ mealData, activeIngRange }) {
  const ingredients = useMemo(
    () =>
      Object.keys(mealData)
        .map((key) => {
          if (key.startsWith("strIngredient") && mealData[key]) {
            const num = key.slice(13);
            if (mealData[`strMeasure${num}`]) {
              return {
                measure: mealData[`strMeasure${num}`],
                name: mealData[key],
              };
            }
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
              <td className="p-2 font-medium text-secondary">
                <HighlightedIngredient
                  text={ing.measure}
                  temp={0}
                  isActive={i == activeIngRange.sentenceIndex}
                  wordRange={activeIngRange}
                />
              </td>
              <td className="p-2 text-base-content">
                <HighlightedIngredient
                  text={ing.name}
                  temp={ing.measure.length + 1}
                  isActive={i == activeIngRange.sentenceIndex}
                  wordRange={activeIngRange}
                />
              </td>
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
  const [showResults, setShowResults] = useState(false);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

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

  const [ingredientPlayerState, setIngredientPlayerState] = useState("idle");
  const [activeIngRange, setActiveIngRange] = useState({
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
    "milk",
    "cheese",
    "butter",
    "cream",
    "egg",
    "peanut",
    "almond",
    "cashew",
    "walnut",
    "pecan",
    "hazelnut",
    "wheat",
    "barley",
    "rye",
    "soy",
    "soybean",
    "shrimp",
    "prawn",
    "crab",
    "lobster",
    "clam",
    "mussel",
    "oyster",
    "fish",
  ];

  const detectedAllergens = useMemo(() => {
    if (!mealData) return [];
    const ingredients = Object.keys(mealData)
      .filter((k) => k.startsWith("strIngredient") && mealData[k])
      .map((k) => mealData[k].toLowerCase());
    return allergenKeywords.filter((allergen) =>
      ingredients.some((ing) => ing.includes(allergen))
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
          setActiveWordRange({
            sentenceIndex: -1,
            startChar: -1,
            endChar: -1,
          });
        }
      };
      return utterance;
    });

    return () => synth.cancel();
  }, [instructionSentences]);

  const handlePlay = useCallback(() => {
    const synth = window.speechSynthesis;

    // stop ingredients TTS if running
    if (ingredientPlayerState === "playing" || ingredientPlayerState === "paused") {
      synth.cancel();
      setIngredientPlayerState("idle");
      setActiveIngRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    }

    if (playerState === "paused") {
      synth.resume();
    } else {
      utterances.current.forEach((utterance) => synth.speak(utterance));
    }
    setPlayerState("playing");
  }, [playerState, ingredientPlayerState]);

  const handlePause = useCallback(() => {
    if (playerState === "playing") {
      window.speechSynthesis.pause();
      setPlayerState("paused");
    }
  }, [playerState]);

  const handleRestart = useCallback(() => {
    const synth = window.speechSynthesis;

    // stop ingredients TTS if running
    if (ingredientPlayerState !== "idle") {
      synth.cancel();
      setIngredientPlayerState("idle");
      setActiveIngRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    }

    synth.cancel();
    setPlayerState("idle");

    setTimeout(() => {
      handlePlay();
    }, 100);
  }, [handlePlay, ingredientPlayerState]);

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

  // Build text for clipboard: one ingredient per line
  const ingredientsCopyText = useMemo(
    () => ingredientSentences.join("\n"),
    [ingredientSentences]
  );

  const [copied, setCopied] = useState(false);

  const handleCopyIngredients = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ingredientsCopyText);
      setCopied(true);
    } catch {
      // optional: toast error
    } finally {
      setTimeout(() => setCopied(false), 1200);
    }
  }, [ingredientsCopyText]);

  const ingredientUtterances = useRef([]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    synth.cancel();

    ingredientUtterances.current = ingredientSentences.map((text, index) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.onboundary = (event) => {
        if (event.name == "word") {
          setActiveIngRange({
            sentenceIndex: index,
            startChar: event.charIndex,
            endChar: event.charIndex + event.charLength,
          });
        }
      };
      utterance.onend = () => {
        if (index === ingredientSentences.length - 1) {
          setIngredientPlayerState("idle");
          setActiveIngRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
        }
      };
      return utterance;
    });

    return () => synth.cancel();
  }, [ingredientSentences]);

  const handleIngredientPlay = useCallback(() => {
    const synth = window.speechSynthesis;

    // stop steps TTS if running
    if (playerState === "playing" || playerState === "paused") {
      synth.cancel();
      setPlayerState("idle");
      setActiveWordRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    }

    if (ingredientPlayerState === "paused") {
      synth.resume();
    } else {
      ingredientUtterances.current.forEach((utt) => synth.speak(utt));
    }
    setIngredientPlayerState("playing");
  }, [ingredientPlayerState, playerState]);

  const handleIngredientPause = useCallback(() => {
    if (ingredientPlayerState === "playing") {
      window.speechSynthesis.pause();
      setIngredientPlayerState("paused");
    }
  }, [ingredientPlayerState]);

  const handleIngredientRestart = useCallback(() => {
    const synth = window.speechSynthesis;

    // stop steps TTS if running
    if (playerState !== "idle") {
      synth.cancel();
      setPlayerState("idle");
      setActiveWordRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    }

    synth.cancel();
    setIngredientPlayerState("idle");

    setTimeout(() => {
      handleIngredientPlay();
    }, 100);
  }, [handleIngredientPlay, playerState]);

  // --- Fetch Meal + Save to recentMeals ---
  useEffect(() => {
    let isMounted = true;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const meal = data?.meals?.[0];
        if (!isMounted || !meal) return;

        setMealData(meal);

        if (typeof window === "undefined") return;

        try {
          const mealInfo = {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
          };

          const raw = localStorage.getItem("recentMeals");
          const prev = raw ? JSON.parse(raw) : [];
          const list = Array.isArray(prev) ? prev : [];

          const updated = [
            mealInfo,
            ...list.filter((m) => m.idMeal !== meal.idMeal),
          ].slice(0, 5);

          localStorage.setItem("recentMeals", JSON.stringify(updated));
        } catch {
          localStorage.setItem(
            "recentMeals",
            JSON.stringify([
              {
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
              },
            ])
          );
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      isMounted = false;
    };
  }, [URL]);

  if (!mealData) {
    return (
      <>
        <Navbar
          showResults={showResults}
          setShowResults={setShowResults}
          handleSearchFocus={handleSearchFocus}
          handleBlur={handleBlur}
        />
        <div
          className={`min-h-screen mt-20 flex bg-base-100 justify-center items-center p-4 transition-all duration-300 ${
            showResults ? "opacity-80 blur-sm" : "opacity-100"
          }`}
        >
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
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      <div
        className={`min-h-screen py-10 px-4 mt-20 bg-base-100 flex justify-center items-start transition-all duration-300 ${
          showResults ? "opacity-80 blur-sm" : "opacity-100"
        }`}
      >
        <BackButton />
        <div className="relative max-w-4xl w-full bg-base-200 shadow-xl rounded-xl">
          {/* mark printable area */}
          <div className="p-6 md:p-12 print-area">
            <header className="relative text-center mb-8">
              <button
                onClick={() =>
                  toggleFavorite({
                    idMeal: mealData.idMeal,
                    strMeal: mealData.strMeal,
                    strMealThumb: mealData.strMealThumb,
                  })
                }
                className="absolute top-0 right-0 bg-black text-white rounded-full p-2 text-lg hover:bg-black hover:text-black transition w-[40px] h-[40px]"
                aria-label="Toggle favorite"
              >
                {isFavorite(mealData.idMeal) ? "💖" : "🤍"}
              </button>
              <h1 className="text-3xl md:text-5xl font-bold text-base-content">
                {mealData.strMeal}
              </h1>
              <p className="text-lg text-primary mt-2">{mealData.strArea} Cuisine</p>

              {detectedAllergens.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {detectedAllergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="badge badge-sm badge-error text-white"
                    >
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

                {/* Action toolbar (hidden in print) */}
                <div className="flex flex-wrap items-center gap-4 no-print">
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

                  <ShareButton title={mealData.strMeal} />

                  {/* Print / Save as PDF */}
                  <button
                    onClick={() => window.print()}
                    aria-label="Print or save recipe"
                    className="btn btn-primary btn-sm gap-2"
                    type="button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9V2h12v7" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <path d="M6 14h12v8H6z" />
                    </svg>
                    Print
                  </button>
                </div>
              </div>

              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-2 flex items-center justify-between text-base-content">
                  <div className="flex items-center">
                    <PlusIcon />
                    <span className="ml-2">Ingredients</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Copy Ingredients button (icon) */}
                    <button
                      onClick={handleCopyIngredients}
                      aria-label="Copy ingredients"
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip={copied ? "Copied!" : "Copy list"}
                      type="button"
                    >
                      {!copied ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>

                    {/* TTS controls */}
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
                  </div>
                </h2>

                <IngredientsTable
                  mealData={mealData}
                  activeIngRange={activeIngRange}
                />
              </div>
            </div>

            <section id="instructions-section">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-base-content">
                  Preparation Steps
                </h2>
                <div className="flex items-center gap-2 p-1 border border-base-300 rounded-full bg-base-200">
                  <button
                    onClick={playerState === "playing" ? handlePause : handlePlay}
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

      {/* Hide footer in print */}
      <div className="bg-base-100 no-print">
        <Footer />
      </div>
    </>
  );
}

export default ShowMeal;
