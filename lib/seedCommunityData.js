import { saveCommunityRecipe } from "./communityStorage";
import { mockUsers } from "./mockAuth";

export const seedSampleRecipes = (force = false) => {
  const existingRecipes = localStorage.getItem("community_recipes");

  // Prevent reseeding unless force is true
  if (!force && existingRecipes && JSON.parse(existingRecipes).length > 0) {
    return;
  }

  // Clear and reseed
  localStorage.removeItem("community_recipes");

  const sampleRecipes = [
    {
      id: "chocolate-chip-cookies",
      title: "Grandma's Chocolate Chip Cookies",
      description:
        "The perfect chewy chocolate chip cookies that my grandmother used to make. These are always a hit at family gatherings!",
      ingredients: [
        "2 1/4 cups all-purpose flour",
        "1 tsp baking soda",
        "1 tsp salt",
        "1 cup butter, softened",
        "3/4 cup granulated sugar",
        "3/4 cup brown sugar",
        "2 large eggs",
        "2 tsp vanilla extract",
        "2 cups chocolate chips",
      ],
      instructions: [
        "Preheat oven to 375°F (190°C)",
        "Mix flour, baking soda, and salt in a bowl",
        "Cream butter and sugars until fluffy",
        "Beat in eggs and vanilla",
        "Gradually mix in flour mixture",
        "Stir in chocolate chips",
        "Drop rounded tablespoons onto ungreased baking sheets",
        "Bake 9-11 minutes until golden brown",
        "Cool on baking sheet for 2 minutes before removing",
      ],
      cookTime: "25 mins",
      servings: 48,
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
      author: {
        id: mockUsers[0].id,
        name: mockUsers[0].name,
        avatar: mockUsers[0].avatar,
      },
      type: "community",
      notes:
        "Add extra chocolate chips on top before baking for extra gooeyness! Bake 2-3 minutes longer if you prefer crispier cookies.",
    },
    {
      id: "thai-basil-chicken",
      title: "Spicy Thai Basil Chicken",
      description:
        "Authentic Thai street food that's quick, spicy, and incredibly flavorful. Perfect served over jasmine rice!",
      ingredients: [
        "1 lb ground chicken",
        "3 cloves garlic, minced",
        "2 Thai chilies, sliced",
        "1 onion, sliced",
        "1 bell pepper, sliced",
        "1 cup fresh Thai basil leaves",
        "2 tbsp vegetable oil",
        "2 tbsp fish sauce",
        "1 tbsp soy sauce",
        "1 tsp sugar",
        "Jasmine rice for serving",
      ],
      instructions: [
        "Heat oil in a wok over high heat",
        "Add garlic and chilies, stir-fry for 30 seconds",
        "Add ground chicken, cook until no longer pink",
        "Add onion and bell pepper, stir-fry for 2 minutes",
        "Add fish sauce, soy sauce, and sugar",
        "Stir in Thai basil leaves until wilted",
        "Serve immediately over jasmine rice",
      ],
      cookTime: "15 mins",
      servings: 4,
      difficulty: "Medium",
      image:
        "https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2020/07/Thai-basil-chicken-33.jpg",
      author: {
        id: mockUsers[1].id,
        name: mockUsers[1].name,
        avatar: mockUsers[1].avatar,
      },
      type: "community",
    },
    {
      id: "creamy-mushroom-risotto",
      title: "Creamy Mushroom Risotto",
      description:
        "Rich and creamy risotto with mixed mushrooms. A comforting dish that's perfect for dinner parties or cozy nights in.",
      ingredients: [
        "1 1/2 cups Arborio rice",
        "4 cups warm chicken broth",
        "1 lb mixed mushrooms, sliced",
        "1 onion, finely chopped",
        "3 cloves garlic, minced",
        "1/2 cup white wine",
        "1/2 cup Parmesan cheese, grated",
        "3 tbsp butter",
        "2 tbsp olive oil",
        "Salt and pepper to taste",
        "Fresh parsley for garnish",
      ],
      instructions: [
        "Heat olive oil in a large pan, sauté mushrooms until golden",
        "Remove mushrooms and set aside",
        "In the same pan, melt 1 tbsp butter and sauté onion until soft",
        "Add garlic and rice, stir for 2 minutes",
        "Add wine and stir until absorbed",
        "Add warm broth one ladle at a time, stirring constantly",
        "Continue until rice is creamy and tender (about 18-20 minutes)",
        "Stir in mushrooms, remaining butter, and Parmesan",
        "Season with salt and pepper",
        "Garnish with fresh parsley and serve immediately",
      ],
      cookTime: "35 mins",
      servings: 6,
      difficulty: "Hard",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      author: {
        id: mockUsers[2].id,
        name: mockUsers[2].name,
        avatar: mockUsers[2].avatar,
      },
      type: "community",
    },
  ];

  const moreSampleRecipes = [
    {
      id: "classic-margherita-pizza",
      title: "Classic Margherita Pizza",
      description:
        "Simple yet delicious pizza topped with fresh tomatoes, mozzarella, and basil. A true Italian classic!",
      ingredients: [
        "1 pizza dough ball",
        "1/2 cup tomato sauce",
        "8 oz fresh mozzarella, sliced",
        "Fresh basil leaves",
        "2 tbsp olive oil",
        "Salt to taste",
        "Flour for dusting",
      ],
      instructions: [
        "Preheat oven to 475°F (245°C)",
        "Roll out dough on a floured surface",
        "Spread tomato sauce evenly over dough",
        "Top with mozzarella slices and basil leaves",
        "Drizzle with olive oil and sprinkle salt",
        "Bake for 10-12 minutes until crust is golden",
        "Slice and serve hot",
      ],
      cookTime: "20 mins",
      servings: 2,
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop&auto=format",
      author: {
        id: mockUsers[3].id,
        name: mockUsers[3].name,
        avatar: mockUsers[3].avatar,
      },
      type: "community",
    },
    {
      id: "hearty-lentil-soup",
      title: "Hearty Lentil Soup",
      description:
        "A warm and nutritious lentil soup perfect for chilly days. Packed with veggies and protein!",
      ingredients: [
        "1 cup brown lentils",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 celery stalks, diced",
        "3 cloves garlic, minced",
        "1 can diced tomatoes",
        "6 cups vegetable broth",
        "2 tsp cumin",
        "1 tsp smoked paprika",
        "2 tbsp olive oil",
        "Salt and pepper to taste",
        "Fresh parsley for garnish",
      ],
      instructions: [
        "Heat olive oil in a large pot over medium heat",
        "Add onion, carrots, celery and cook until softened",
        "Stir in garlic, cumin, and smoked paprika",
        "Add lentils, diced tomatoes, and vegetable broth",
        "Bring to a boil, then simmer for 30-35 minutes",
        "Season with salt and pepper",
        "Garnish with fresh parsley and serve warm",
      ],
      cookTime: "45 mins",
      servings: 6,
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      author: {
        id: mockUsers[4].id,
        name: mockUsers[4].name,
        avatar: mockUsers[4].avatar,
      },
      type: "community",
    },
    {
      id: "avocado-toast-poached-eggs",
      title: "Avocado Toast with Poached Eggs",
      description:
        "Quick and healthy breakfast or snack featuring creamy avocado and perfectly poached eggs on toasted bread.",
      ingredients: [
        "2 slices whole grain bread",
        "1 ripe avocado",
        "2 large eggs",
        "1 tbsp vinegar",
        "Salt and pepper to taste",
        "Red pepper flakes (optional)",
        "Fresh lemon juice",
      ],
      instructions: [
        "Toast the bread slices to your liking",
        "Mash avocado with lemon juice, salt, and pepper",
        "Bring a pot of water to a simmer and add vinegar",
        "Poach eggs for 3-4 minutes until whites are set",
        "Spread mashed avocado on toast",
        "Top each slice with a poached egg",
        "Sprinkle red pepper flakes if desired and serve immediately",
      ],
      cookTime: "10 mins",
      servings: 1,
      difficulty: "Easy",
      image:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop",
      author: {
        id: mockUsers[5].id,
        name: mockUsers[5].name,
        avatar: mockUsers[5].avatar,
      },
      type: "community",
    },
    {
      id: "vegetable-stir-fry-tofu",
      title: "Vegetable Stir-Fry with Tofu",
      description:
        "A quick and healthy stir-fry loaded with colorful vegetables and crispy tofu. Perfect for a weeknight meal.",
      ingredients: [
        "1 block firm tofu, cubed",
        "1 red bell pepper, sliced",
        "1 broccoli head, cut into florets",
        "1 carrot, sliced",
        "2 cloves garlic, minced",
        "2 tbsp soy sauce",
        "1 tbsp sesame oil",
        "1 tbsp vegetable oil",
        "1 tsp grated ginger",
        "Cooked rice for serving",
      ],
      instructions: [
        "Press tofu to remove excess water and cube it",
        "Heat vegetable oil in a wok over medium-high heat",
        "Add tofu and cook until golden, then remove and set aside",
        "Add sesame oil, garlic, and ginger, stir-fry for 30 seconds",
        "Add vegetables and stir-fry for 5-7 minutes until tender-crisp",
        "Return tofu to wok, add soy sauce and toss to combine",
        "Serve hot over cooked rice",
      ],
      cookTime: "20 mins",
      servings: 4,
      difficulty: "Medium",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
      author: {
        id: mockUsers[6].id,
        name: mockUsers[6].name,
        avatar: mockUsers[6].avatar,
      },
      type: "community",
    },
  ];

  const allRecipes = [...sampleRecipes, ...moreSampleRecipes];

  localStorage.setItem("community_recipes", JSON.stringify(allRecipes));
};
