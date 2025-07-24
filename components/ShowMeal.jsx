"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon, YoutubeIcon } from "@/components/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextToSpeech from "./TextToSpeech";

/**
 * A visually appealing skeleton loader component that mimics the meal page layout.
 * It uses a shimmering animation to indicate that content is loading.
 */
function MealSkeleton() {
    return (
        <div className="relative max-w-96 md:max-w-7xl w-full bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="shimmer-wrapper px-10 md:px-20 py-10">
                {/* Skeleton for Title */}
                <div className="h-9 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6 animate-shimmer"></div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Skeleton for Image and Badges */}
                    <div className="w-full md:w-1/2">
                        <div className="w-full h-80 bg-gray-200 rounded-xl mb-4 animate-shimmer"></div>
                        <div className="flex items-center space-x-4">
                            <div className="h-6 w-24 bg-gray-200 rounded-full animate-shimmer"></div>
                            <div className="h-6 w-24 bg-gray-200 rounded-full animate-shimmer"></div>
                        </div>
                    </div>

                    {/* Skeleton for Ingredients */}
                    <div className="w-full md:w-1/2">
                        <div className="h-7 w-48 bg-gray-200 rounded-lg mb-4 animate-shimmer"></div>
                        <div className="space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-5 w-2/5 bg-gray-200 rounded-md animate-shimmer"></div>
                                    <div className="h-5 w-3/5 bg-gray-200 rounded-md animate-shimmer"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skeleton for Instructions */}
                <div className="mt-8">
                    <div className="h-7 w-56 bg-gray-200 rounded-lg mb-4 animate-shimmer"></div>
                    <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded-md w-full animate-shimmer"></div>
                        <div className="h-5 bg-gray-200 rounded-md w-11/12 animate-shimmer"></div>
                        <div className="h-5 bg-gray-200 rounded-md w-full animate-shimmer"></div>
                        <div className="h-5 bg-gray-200 rounded-md w-5/6 animate-shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function ShowMeal({ URL }) {
    const [mealData, setMealData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setMealData(data.meals[0]);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                // Add a small delay to prevent flash of content
                setTimeout(() => setLoading(false), 500);
            });
    }, [URL]);

    return (
        <div className="min-h-screen py-10 bg-gradient-to-br from-indigo-50 to-blue-100 flex justify-center items-center">
            <BackButton />
            {loading ? <MealSkeleton /> : mealData ? (
                <div className="relative max-w-96 md:max-w-7xl w-full bg-white text-gray-800 shadow-md rounded-lg overflow-hidden">
                    <div className="px-10 md:px-20 py-10">
                        <h1 className="text-3xl md:text-4xl text-center font-bold text-primary mb-4">
                            {mealData.strMeal} 🍲
                        </h1>
                        <div className="flex flex-col md:flex-row gap-10">
                            <div>
                                <img
                                    src={mealData.strMealThumb}
                                    alt={mealData.strMeal}
                                    className="max-w-72 md:max-w-xl h-auto rounded-lg mb-4"
                                />
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <span className="badge badge-primary">
                                        {mealData.strArea}
                                    </span>
                                    <span className="badge badge-success">
                                        {mealData.strCategory}
                                    </span>
                                    {mealData.strYoutube && (
                                        <Link
                                            href={mealData.strYoutube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-error btn-sm gap-2 hover:btn-error-focus transition-colors"
                                            title="Watch recipe video on YouTube"
                                        >
                                            <YoutubeIcon /> Watch Video
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl text-gray-800 font-semibold mb-2 flex items-center">
                                    <PlusIcon />
                                    <span className="ml-2">Ingredients</span>
                                </h2>
                                <table className="w-full mb-4">
                                    <tbody>
                                        {Object.keys(mealData)
                                            .filter(
                                                (key) => key.includes("strIngredient") && mealData[key]
                                            )
                                            .map((key, index) => (
                                                <tr key={index}>
                                                    <td className="py-1 pr-4">{mealData[key]}</td>
                                                    <td className="py-1">
                                                        {mealData[`strMeasure${key.slice(13)}`]}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
                                <PlusIcon />
                                <span className="ml-2">Instructions</span>
                            </h2>
                            <ol className="list-decimal list-inside space-y-2">
                                {mealData.strInstructions.split('.').filter(step => step.trim()).map((step, index) => (
                                    <li key={index} className="text-gray-800">{step.trim()}.</li>
                                ))}
                            </ol>
                            <TextToSpeech text={mealData.strInstructions} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-800 text-lg">No meal data found.</div>
            )}
        </div>
    );
}

export default ShowMeal;
