// components/HeroSection.tsx

import Link from 'next/link';

interface HeroSectionProps {
  onShowCategories: () => void;
  showCategories: boolean;
}

const HeroSection = ({ onShowCategories, showCategories }: HeroSectionProps) => {
  const buttons = [
    { href: "/ai", icon: "auto_awesome", text: "Get AI-Generated Recipes", primary: true },
    { href: "/random", icon: "casino", text: "Discover a Random Recipe" },
    { href: "/diet-planner", icon: "restaurant_menu", text: "AI Diet Planner" },
    { href: "/festive", icon: "celebration", text: "Festive Dishes" },
    { href: "/ingredient-explorer", icon: "science", text: "AI Ingredient Explorer" },
    { href: "/favorite", icon: "favorite_border", text: "Favorites" },
  ];

  return (
    <section className="relative flex items-center justify-center min-h-screen text-center px-4">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 background-image">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white">
          Start Your Flavor Journey
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Unlock a world of flavors with AI-curated recipes, personalized suggestions, and exciting surprises.
        </p>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
          {buttons.map((btn) => (
            <Link href={btn.href} key={btn.text}>
              {/* Added h-full to the button className */}
              <button className={`flex w-full h-full items-center justify-center space-x-2 font-medium py-3 px-4 sm:px-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300
                ${btn.primary 
                  ? "bg-primary text-white hover:bg-opacity-90" 
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30"}`
                }
              >
                <span className="material-icons text-xl">{btn.icon}</span>
                <span className="text-sm sm:text-base">{btn.text}</span>
              </button>
            </Link>
          ))}
          <button 
            onClick={onShowCategories}
            // Added h-full to this button's className as well
            className="col-span-2 flex h-full items-center justify-center space-x-2 bg-sage-green text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="material-icons text-xl">category</span>
            <span className="text-sm sm:text-base">{showCategories ? "Hide Categories" : "Show Categories"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;