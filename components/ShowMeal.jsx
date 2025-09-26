// components/ShowMeal.jsx
"use client";

import PreparationChecklist from "./PreparationChecklist";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";

import Navbar from "./Navbar";
import Footer from "./Footer";
import BackButton from "@/components/BackButton";
import ShareButton from "@/components/ShareButton";
import { PlusIcon, YoutubeIcon } from "@/components/Icons";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

// Shopping list helpers
import { addItemsToShoppingList, parseMeasure } from "@/lib/shoppingList";

// Unit system (metric/us)
import useUnitSystem from "@/hooks/useUnitSystem";
import UnitToggle from "@/components/UnitToggle";
import { formatMeasureForSystem } from "@/lib/units";

// Servings scaler
import { useServings } from "@/hooks/useServings";
import ServingSizeControl from "@/components/ServingSizeControl";

/* ---------------- Small helpers ---------------- */

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

/* ----- helpers for quantity text handling ----- */
const round1 = (n) => Math.round(n * 10) / 10;

/** Return text after the leading numeric qty (e.g. "tbs", "chopped", "g sugar") */
function tailAfterQty(raw) {
  const m = String(raw || "")
    .trim()
    .match(/^\s*([0-9]+(?:\.[0-9]+)?(?:\s*\/\s*[0-9]+)?)\s*(.*)$/i);
  return m ? (m[2] || "").trim() : "";
}

/* ---------------- Ingredients table ---------------- */

function IngredientsTable({ mealData, activeIngRange, unitSystem, factor = 1 }) {
  const ingredients = useMemo(
    () =>
      Object.keys(mealData)
        .map((key) => {
          if (key.startsWith("strIngredient") && mealData[key]) {
            const num = key.slice(13);
            const measure = mealData[`strMeasure${num}`];
            if (measure) return { measure, name: mealData[key] };
          }
          return null;
        })
        .filter(Boolean),
    [mealData]
  );

  return (
    <div className="overflow-x-auto mt-3">
      <table className="table w-full">
        <thead>
          <tr className="text-left">
            <th className="p-2 w-1/3 text-sm font-semibold text-primary">Quantity</th>
            <th className="p-2 text-sm font-semibold text-primary">Ingredient</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ing, i) => {
            const raw = (ing.measure || "").trim();
            let displayMeasure = raw;

            try {
              const parsed = parseMeasure(raw); // { qty, unit } when recognized
              if (parsed && Number.isFinite(parsed.qty)) {
                const scaledQty = parsed.qty * factor;
                const pretty = scaledQty >= 10 ? Math.round(scaledQty) : round1(scaledQty);

                // keep whatever appears after the number (unit and descriptors)
                const tail = tailAfterQty(raw);

                let candidate;
                if (parsed.unit) {
                  // avoid duplicating the unit when tail starts with it
                  const rx = new RegExp(`^${parsed.unit}\\b`, "i");
                  const extra = tail.replace(rx, "").trim();
                  candidate = `${pretty} ${parsed.unit}${extra ? ` ${extra}` : ""}`;
                } else {
                  // unit wasn't recognized (e.g., "tbs", "chopped") — keep it
                  candidate = tail ? `${pretty} ${tail}` : String(pretty);
                }

                const converted = formatMeasureForSystem(candidate, unitSystem);
                displayMeasure = converted || candidate;
              } else {
                // not parseable; still allow converter to normalize units text
                displayMeasure = formatMeasureForSystem(raw, unitSystem) || raw;
              }
            } catch {
              displayMeasure = formatMeasureForSystem(raw, unitSystem) || raw;
            }

            return (
              <tr key={i} className="border-t border-base-300 hover:bg-base-200">
                <td className="p-2 font-medium text-secondary tabular-nums text-left whitespace-nowrap">
                  <HighlightedIngredient
                    text={displayMeasure}
                    temp={0}
                    isActive={i === activeIngRange.sentenceIndex}
                    wordRange={activeIngRange}
                  />
                </td>
                <td className="p-2 text-base-content">
                  <HighlightedIngredient
                    text={ing.name}
                    temp={displayMeasure.length + 1}
                    isActive={i === activeIngRange.sentenceIndex}
                    wordRange={activeIngRange}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ===================== Main ===================== */

function ShowMeal({ URL }) {
  const [mealData, setMealData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (meal) => {
    const exists = favorites.some((f) => f.idMeal === meal.idMeal);
    const updated = exists
      ? favorites.filter((f) => f.idMeal !== meal.idMeal)
      : [...favorites, meal];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (idMeal) => favorites.some((f) => f.idMeal === idMeal);

  /* ---------- Instruction TTS ---------- */
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

  // unit system preference
  const [unitSystem, setUnitSystem] = useUnitSystem();

  // serving size scaler (baseline 2 if you don’t have a better one)
  const baseServings = 2;
  const { servings, setServings, factor, reset } = useServings(
    mealData?.idMeal || "pending",
    baseServings
  );

  const utterances = useRef([]);

  const instructionSentences = useMemo(() => {
    if (!mealData?.strInstructions) return [];
    return mealData.strInstructions
      .split(/\r?\n/)
      .map((s) => s.replace(/^\s*\d+([.)])?\s*/, "").trim())
      .filter(Boolean);
  }, [mealData]);

  const allergenKeywords = [
    "milk","cheese","butter","cream","egg",
    "peanut","almond","cashew","walnut","pecan","hazelnut",
    "wheat","barley","rye","soy","soybean",
    "shrimp","prawn","crab","lobster","clam","mussel","oyster","fish",
  ];

  const detectedAllergens = useMemo(() => {
    if (!mealData) return [];
    const ingredients = Object.keys(mealData)
      .filter((k) => k.startsWith("strIngredient") && mealData[k])
      .map((k) => mealData[k].toLowerCase());
    return allergenKeywords.filter((a) => ingredients.some((ing) => ing.includes(a)));
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

    if (ingredientPlayerState === "playing" || ingredientPlayerState === "paused") {
      synth.cancel();
      setIngredientPlayerState("idle");
      setActiveIngRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    }

    if (playerState === "paused") synth.resume();
    else utterances.current.forEach((utt) => synth.speak(utt));

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

    if (ingredientPlayerState !== "idle") {
      synth.cancel();
      setIngredientPlayerState("idle");
      setActiveIngRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    }

    synth.cancel();
    setPlayerState("idle");
    setTimeout(() => handlePlay(), 100);
  }, [handlePlay, ingredientPlayerState]);

  /* ---------- Ingredient TTS + Copy ---------- */

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
      // ignore
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
        if (event.name === "word") {
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

    if (playerState === "playing" || playerState === "paused") {
      synth.cancel();
      setPlayerState("idle");
      setActiveWordRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    }

    if (ingredientPlayerState === "paused") synth.resume();
    else ingredientUtterances.current.forEach((utt) => synth.speak(utt));

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

    if (playerState !== "idle") {
      synth.cancel();
      setPlayerState("idle");
      setActiveWordRange({ sentenceIndex: -1, startChar: -1, endChar: -1 });
    }

    synth.cancel();
    setIngredientPlayerState("idle");
    setTimeout(() => handleIngredientPlay(), 100);
  }, [handleIngredientPlay, playerState]);

  // shopping list
  const [addedToList, setAddedToList] = useState(false);

  const buildShoppingItems = useCallback(() => {
    if (!mealData) return [];
    const out = [];
    for (let n = 1; n <= 20; n++) {
      const name = mealData[`strIngredient${n}`];
      const measure = mealData[`strMeasure${n}`];
      if (!name || !name.trim()) continue;
      const { qty, unit } = parseMeasure(measure || "");
      out.push({ name: name.trim(), qty, unit });
    }
    return out;
  }, [mealData]);

  const handleAddToShopping = useCallback(() => {
    const items = buildShoppingItems();
    if (items.length) {
      addItemsToShoppingList(items);
      setAddedToList(true);
      setTimeout(() => setAddedToList(false), 1200);
    }
  }, [buildShoppingItems]);

  // Fetch Meal + Save to recentMeals
  useEffect(() => {
    let alive = true;

    fetch(URL)
      .then((r) => r.json())
      .then((data) => {
        const meal = data?.meals?.[0];
        if (!alive || !meal) return;

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
      .catch((e) => console.error("Error fetching data:", e));

    return () => {
      alive = false;
    };
  }, [URL]);

  /* ---------- Loading ---------- */
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

  /* ---------- Render ---------- */
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
          <div className="p-6 md:p-12 print-area">
            <header className="relative text-center mb-8">
              <div className="absolute top-0 right-0 flex items-center gap-2">
                <Link
                  href="/shopping-list"
                  aria-label="Open shopping list"
                  className="btn btn-ghost btn-circle"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </Link>

                <button
                  onClick={() =>
                    toggleFavorite({
                      idMeal: mealData.idMeal,
                      strMeal: mealData.strMeal,
                      strMealThumb: mealData.strMealThumb,
                    })
                  }
                  className="btn btn-ghost btn-circle text-lg w-[40px] h-[40px]"
                  aria-label="Toggle favorite"
                >
                  {isFavorite(mealData.idMeal) ? "💖" : "🤍"}
                </button>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-base-content">
                {mealData.strMeal}
              </h1>
              <p className="text-lg text-primary mt-2">{mealData.strArea} Cuisine</p>

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
              {/* LEFT: image + badges + steps */}
              <div className="md:w-1/2">
                <img
                  src={mealData.strMealThumb}
                  alt={mealData.strMeal}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />

                <div className="flex flex-wrap items-center gap-4 no-print">
                  <span className="badge badge-lg badge-accent">{mealData.strCategory}</span>

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
<section id="instructions-section" className="mt-10">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold text-base-content">Preparation Steps</h2>
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

  <PreparationChecklist
    steps={instructionSentences}
    checklistKey={`showmeal-steps-${mealData.idMeal}`}
  />
</section>
              </div>

              {/* RIGHT: Ingredients */}
              <div className="md:w-1/2 md:self-start md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] md:overflow-auto md:z-[1]">
                {/* Heading */}
                <div className="mb-1">
                  <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
                    <PlusIcon />
                    <span>Ingredients</span>
                  </h2>
                </div>

                {/* Row: Servings (left)  •  Unit toggle (right) */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <ServingSizeControl
                    servings={servings}
                    setServings={setServings}
                    baseServings={baseServings}
                    onReset={reset}
                  />
                  <UnitToggle value={unitSystem} onChange={setUnitSystem} />
                </div>

                {/* Row: Add/Copy (left) • TTS controls (right) */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAddToShopping}
                      aria-label="Add all ingredients to shopping list"
                      className="btn btn-primary btn-xs"
                      type="button"
                    >
                      {addedToList ? "Added!" : "Add to list"}
                    </button>

                    <button
                      onClick={handleCopyIngredients}
                      aria-label="Copy ingredients"
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip={copied ? "Copied!" : "Copy list"}
                      type="button"
                    >
                      {!copied ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>

                    <Link href="/shopping-list" className="link link-primary link-hover text-xs sm:hidden">
                      Open list
                    </Link>
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
                </div>

                {/* Table */}
                <IngredientsTable
                  mealData={mealData}
                  activeIngRange={activeIngRange}
                  unitSystem={unitSystem}
                  factor={factor}
                />
              </div>
            </div>
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
