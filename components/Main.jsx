"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar"; // Reusable "Navbar" component
import { CATEGORIES_URL } from "@/lib/urls";
import { PlusIcon } from "@/components/Icons";


export default function Page() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleSearchFocus = () => setShowResults(true);

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        const sortedCategories = data.categories.sort((a, b) => {
          const categoryOrder = ['Dessert', 'Vegetarian', 'Pasta'];
          const aIndex = categoryOrder.findIndex(cat =>
            a.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          const bIndex = categoryOrder.findIndex(cat =>
            b.strCategory.toLowerCase().includes(cat.toLowerCase())
          );

          // If both categories are in our priority list
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          // If only a is in priority list
          if (aIndex !== -1) return -1;
          // If only b is in priority list
          if (bIndex !== -1) return 1;
          // If neither are in priority list
          return 0;
        });
        setCategories(sortedCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme") || "light";
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(initialTheme);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content");
    if (navbar && content) {
      content.style.marginTop = `${navbar.offsetHeight}px`;
    }
  }, []);

  return (
    <>
    
      {/*Navbar - contributed by Devika Harshey*/}
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />

      {/* Content */}
    {/*hero - contributed by Muskan fatima*/}
    <div className={` min-h-screen ${currentTheme === 'dark' ? 'bg-black' : 'bg-white'}`}>


      <div className="relative w-full h-screen ">
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
	    <div className="max-w-7xl mx-auto">
	      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
	        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
	          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-amber-950 ${currentTheme === 'dark' ? 'text-white' : 'text-amber-950'}  animate-fade-in`}>
	            Your Next Favorite Dish Starts Here
	          </h1>
	          <p className={`text-lg md:text-xl ${currentTheme === 'dark' ? 'text-white' : 'text-amber-950'} max-w-2xl leading-relaxed animate-fade-in-up`}>
	            Flavor AI helped me discover recipes I never knew I'd love — it's like having a personal chef who knows exactly what I'm craving!
	          </p>
	          <div className="flex flex-wrap gap-3 justify-center md:justify-start animate-fade-in-up">
	            <Link href="/ai" className="group">
	              <button className="btn bg-amber-900 hover:bg-amber-950 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
	                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0" />
	                </svg>
	                <span>AI Recipes</span>
	              </button>
	            </Link>
	            <Link href="/random" className="group">
	              <button className="btn bg-amber-900 hover:bg-amber-950 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
	                <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" />
	                </svg>
	                <span >Random Recipe</span>
	              </button>
	            </Link>
	            <Link href="/diet-planner" className="group">
	              <button className="btn bg-amber-900 hover:bg-amber-950 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
	                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
	                </svg>
	                <span>Diet Planner</span>
	              </button>
	            </Link>
	              <button className="btn bg-amber-900 hover:bg-amber-950 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                onClick={() => {
                  setShowCategories((prev) => !prev);
                  if (!showCategories) {
                    setTimeout(() => {
                      document.querySelector('.categories-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                style={{ animationDelay: '500ms' }}
              >
                {showCategories ? "Hide Categories" : "Show Categories"}
                {!showCategories && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

	          </div>
	        </div>
	        <div className="w-full md:w-1/2 relative">
	          <div className="aspect-square max-w-md mx-auto rounded-full overflow-hidden shadow-2xl border-8 border-white dark:border-amber-900 transform hover:rotate-3 transition-all duration-500">
	            <img 
	              src="https://images.unsplash.com/photo-1543353071-873f17a7a088" 
	              alt="Delicious food arrangement" 
	              className="w-full h-full object-cover"
	              keywords="food, cuisine, delicious, meal, healthy, cooking"
	            />
	          </div>
	        </div>
	      </div>
	    
      
            </div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8">
	    <div className="max-w-7xl mx-auto">
	      <div className="text-center mb-12">
	        <h2 className={`text-3xl md:text-4xl pt-5 font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-amber-950'}`}>Why Choose Our Recipe Platform</h2>
	        <p className={`mt-4 text-lg ${currentTheme === 'dark' ? 'text-white' : 'text-amber-950'}`}>Discover the features that make cooking with us a delightful experience</p>
	      </div>
	
	      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
	        {/* Feature 1 */}
	        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
	          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
	            <span className="material-symbols-outlined text-amber-600 dark:text-amber-300 text-2xl">smart_toy</span>
	          </div>
	          <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100">AI-Powered Recommendations</h3>
	          <p  className="mt-2 text-gray-600 dark:text-gray-300">Our AI learns your taste preferences and suggests recipes you'll love, helping you discover new favorites.</p>
	        </div>
	
	        {/* Feature 2 */}
	        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
	          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
	            <span className="material-symbols-outlined text-amber-600 dark:text-amber-300 text-2xl">landscape</span>
	          </div>
	          <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100">Dietary Flexibility</h3>
	          <p className="mt-2 text-gray-600 dark:text-gray-300">Filter recipes by dietary needs including vegetarian, vegan, gluten-free, and more for personalized meal planning.</p>
	        </div>
	
	        {/* Feature 3 */}
	        <div  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
	          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
	            <span className="material-symbols-outlined text-amber-600 dark:text-amber-300 text-2xl">favorite</span>
	          </div>
	          <h3  className="text-xl font-semibold text-amber-900 dark:text-amber-100">Save Your Favorites</h3>
	          <p className="mt-2 text-gray-600 dark:text-gray-300">Create a personal collection of recipes you love, making it easy to find and cook them again.</p>
	        </div>
	      </div>
	    </div>
	  </section>

        <div className="divider mt-10"></div>

        {/* Categories section */}
        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg shadow-lg">
            <h1 className={`text-xl md:text-3xl mb-10 font-semibold text-center ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
              }`}>
              A Taste for Every Mood and Moment
            </h1>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {["All", "Vegetarian", "Non-Vegetarian"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`btn btn-sm md:btn-md ${filter === type ? "btn-primary" : "btn-outline"} transition-all duration-200`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Grid layout for categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {categories
                .filter((category) => {
                  const lowerName = category.strCategory.toLowerCase();
                  const vegetarianKeywords = ["vegetarian", "vegan", "dessert", "pasta", "starter"];

                  if (filter === "All") return true;

                  if (filter === "Vegetarian") {
                    return vegetarianKeywords.some((keyword) => lowerName.includes(keyword));
                  }

                  if (filter === "Non-Vegetarian") {
                    return !vegetarianKeywords.some((keyword) => lowerName.includes(keyword));
                  }

                  return true;
                })
                .map((category) => (
                  <div key={category.idCategory} className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <figure className="relative">
                      <Image
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        width={384}
                        height={216}
                        className="w-full h-48 object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className={`card-title text-lg md:text-xl text-gray-800 flex items-center gap-2${
              currentTheme === "dark" ? "text-white" : "text-gray-800"
            }`}>
                        <PlusIcon />
                        {category.strCategory}
                      </h2>
                      <p className="text-sm text-gray-600">{category.strCategoryDescription.slice(0, 80)}...</p>
                      <div className="card-actions justify-end">
                        <Link href={`/category/${category.strCategory}`}>
                          <button className="btn btn-primary text-sm md:text-base">
                            Show Recipes 🍽️
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

            </div>
          </section>
        )}
      <Footer />

      </div>

      </div>

      </>
    )}
