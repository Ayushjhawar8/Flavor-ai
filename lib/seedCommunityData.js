// Seed some sample community recipes for demo purposes
import { saveCommunityRecipe } from "./communityStorage";
import { mockUsers } from "./mockAuth";

export const seedSampleRecipes = () => {
  const existingRecipes = localStorage.getItem("community_recipes");
  if (existingRecipes && JSON.parse(existingRecipes).length > 0) {
    return; // Already seeded
  }
  
  // Clear any existing data to ensure fresh seeding
  localStorage.removeItem("community_recipes");

  // sample recipes
  const sampleRecipes = [
    {
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
      type: "community"
    },
    {
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
      type: "community"
    },
    {
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
      type: "community"
    },
  ];

  // Save each recipe
  sampleRecipes.forEach(recipe => {
    saveCommunityRecipe(recipe);
  });
};