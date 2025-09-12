"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Plus, X, Clock, Users, ChefHat, Sparkles } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BackButton from "@/components/BackButton"

interface Recipe {
  id: string
  title: string
  image: string
  prepTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  missingIngredients: string[]
  availableIngredients: string[]
  description: string
  servings: number
  ingredients: string[]
  instructions: string[]
  cuisine: string
  calories?: number
}

export default function IngredientExplorer() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [savedSets, setSavedSets] = useState<{ name: string; ingredients: string[] }[]>([])
  const [showSavedSets, setShowSavedSets] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const recognitionRef = useRef<any>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearchFocus = () => setShowResults(true)
  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 200)
  }

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
        const recognition = new (window as any).webkitSpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"

        recognition.onresult = (event: any) => {
          try {
            const transcript = event.results[0][0].transcript
            const newIngredients = transcript
              .split(/[,\s]+/)
              .map((item: string) => item.trim())
              .filter((item: string) => item.length > 0)

            setIngredients((prev) => [...new Set([...prev, ...newIngredients])])
            setIsListening(false)
            setError(null)
          } catch (err) {
            console.error("Speech recognition result error:", err)
            setError("Failed to process speech input")
            setIsListening(false)
          }
        }

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setError(`Speech recognition error: ${event.error}`)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
        setSpeechSupported(true)
      } else {
        setSpeechSupported(false)
      }
    } catch (err) {
      console.error("Speech recognition initialization error:", err)
      setSpeechSupported(false)
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (err) {
          console.error("Error stopping speech recognition:", err)
        }
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const addIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()])
      setInputValue("")
      setError(null)
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const startListening = () => {
    if (!speechSupported) {
      setError("Speech recognition is not supported in your browser")
      return
    }

    if (recognitionRef.current) {
      try {
        setIsListening(true)
        setError(null)
        recognitionRef.current.start()
      } catch (err) {
        console.error("Error starting speech recognition:", err)
        setError("Failed to start speech recognition")
        setIsListening(false)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (err) {
        console.error("Error stopping speech recognition:", err)
      }
    }
    setIsListening(false)
  }

  const getRecipeImage = (recipeName: string, cuisine = "") => {
    const cleanName = recipeName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "+")

    // Comprehensive food image mapping for world cuisines
    const imageMap: { [key: string]: string } = {
      // Indian Cuisine
      "dal+tadka": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&q=80",
      "aloo+gobi": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop&q=80",
      "paneer+makhani": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&h=600&fit=crop&q=80",
      "rajma+curry": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop&q=80",
      "poha+breakfast": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop&q=80",
      "chole+bhature": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&q=80",
      "vegetable+biryani": "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=800&h=600&fit=crop&q=80",
      "sambar+south+indian": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&q=80",

      // Italian Cuisine
      "spaghetti+carbonara": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=600&fit=crop&q=80",
      "margherita+pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&q=80",
      risotto: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop&q=80",
      lasagna: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop&q=80",

      // Chinese Cuisine
      "fried+rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop&q=80",
      "sweet+and+sour+chicken":
        "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=600&fit=crop&q=80",
      "kung+pao+chicken": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop&q=80",
      dumplings: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&h=600&fit=crop&q=80",

      // Mexican Cuisine
      "chicken+tacos": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&q=80",
      "cheese+quesadilla": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop&q=80",
      burrito: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=600&fit=crop&q=80",
      guacamole: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop&q=80",

      // Thai Cuisine
      "pad+thai": "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=800&h=600&fit=crop&q=80",
      "green+curry+chicken": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop&q=80",
      "tom+yum": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop&q=80",

      // American Cuisine
      "classic+burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop&q=80",
      "mac+and+cheese": "https://images.unsplash.com/photo-1543826173-1ad64b6ac3c8?w=800&h=600&fit=crop&q=80",
      "bbq+ribs": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&q=80",

      // Japanese Cuisine
      "chicken+teriyaki": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&q=80",
      sushi: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop&q=80",
      ramen: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop&q=80",

      // Mediterranean Cuisine
      "greek+salad": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop&q=80",
      hummus: "https://images.unsplash.com/photo-1571197119282-621c1aff6aca?w=800&h=600&fit=crop&q=80",

      // French Cuisine
      ratatouille: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop&q=80",
      "coq+au+vin": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&q=80",
    }

    // Check for exact match first
    const exactMatch = imageMap[cleanName]
    if (exactMatch) return exactMatch

    // Check for partial matches
    for (const [key, value] of Object.entries(imageMap)) {
      if (cleanName.includes(key.replace(/\+/g, " ")) || key.includes(cleanName.replace(/\+/g, " "))) {
        return value
      }
    }

    // Cuisine-specific fallback images
    const cuisineFallbacks: { [key: string]: string } = {
      indian: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop&q=80",
      italian: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&h=600&fit=crop&q=80",
      chinese: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop&q=80",
      mexican: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&q=80",
      thai: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=800&h=600&fit=crop&q=80",
      american: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop&q=80",
      japanese: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop&q=80",
      mediterranean: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop&q=80",
      french: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=800&h=600&fit=crop&q=80",
    }

    // Use cuisine-specific fallback
    const cuisineFallback = cuisineFallbacks[cuisine.toLowerCase()]
    if (cuisineFallback) return cuisineFallback

    // Default fallback
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&q=80"
  }

  const generateRecipes = async () => {
    if (ingredients.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      const recipeDatabase: Recipe[] = [
        // Indian Cuisine
        {
          id: "dal-tadka",
          title: "Dal Tadka",
          image: getRecipeImage("dal tadka", "Indian"),
          prepTime: "25 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "A comforting lentil curry with aromatic spices - the heart of Indian home cooking! 🇮🇳💛",
          servings: 4,
          cuisine: "Indian",
          calories: 180,
          ingredients: [
            "lentils",
            "toor dal",
            "ghee",
            "oil",
            "cumin seeds",
            "onion",
            "tomatoes",
            "garlic",
            "ginger",
            "turmeric",
            "red chili powder",
            "garam masala",
            "salt",
            "cilantro",
          ],
          instructions: [
            "Wash and cook lentils with turmeric and salt until soft (about 15 minutes).",
            "Heat ghee in a pan, add cumin seeds and let them splutter.",
            "Add onions and sauté until golden brown.",
            "Add ginger-garlic paste and cook for 1 minute.",
            "Add tomatoes and cook until they break down.",
            "Add red chili powder and garam masala, cook for 30 seconds.",
            "Pour this tempering over cooked dal and simmer for 5 minutes.",
            "Garnish with fresh cilantro and serve hot with rice or roti.",
          ],
        },
        {
          id: "aloo-gobi",
          title: "Aloo Gobi",
          image: getRecipeImage("aloo gobi", "Indian"),
          prepTime: "30 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Classic potato and cauliflower curry - simple yet incredibly satisfying! 🥔🥬",
          servings: 4,
          cuisine: "Indian",
          calories: 150,
          ingredients: [
            "potatoes",
            "cauliflower",
            "oil",
            "cumin seeds",
            "onion",
            "tomatoes",
            "ginger",
            "garlic",
            "turmeric",
            "coriander powder",
            "red chili powder",
            "garam masala",
            "salt",
            "cilantro",
          ],
          instructions: [
            "Heat oil in a large pan, add cumin seeds.",
            "Add potatoes and fry until lightly golden. Remove and set aside.",
            "In the same pan, add cauliflower and fry for 3-4 minutes. Remove and set aside.",
            "Add onions to the pan and sauté until translucent.",
            "Add ginger-garlic paste and cook for 1 minute.",
            "Add tomatoes and all spices, cook until tomatoes are soft.",
            "Return potatoes and cauliflower to the pan.",
            "Cover and cook for 10-12 minutes until vegetables are tender.",
            "Garnish with cilantro and serve hot.",
          ],
        },
        {
          id: "paneer-makhani",
          title: "Paneer Makhani",
          image: getRecipeImage("paneer makhani", "Indian"),
          prepTime: "35 mins",
          difficulty: "Medium",
          missingIngredients: [],
          availableIngredients: [],
          description: "Rich, creamy, and absolutely divine! Restaurant-style paneer in tomato-butter gravy 🧈🧀",
          servings: 4,
          cuisine: "Indian",
          calories: 320,
          ingredients: [
            "paneer",
            "tomatoes",
            "onion",
            "garlic",
            "ginger",
            "butter",
            "cream",
            "red chili powder",
            "garam masala",
            "fenugreek leaves",
            "kasoori methi",
            "salt",
            "oil",
          ],
          instructions: [
            "Blanch tomatoes in boiling water, peel and blend into puree.",
            "Heat oil in a pan, lightly fry paneer cubes until golden. Set aside.",
            "In the same pan, add butter and sauté onions until golden.",
            "Add ginger-garlic paste and cook for 2 minutes.",
            "Add tomato puree and cook for 10 minutes until oil separates.",
            "Add red chili powder and garam masala, cook for 1 minute.",
            "Add cream and simmer for 5 minutes.",
            "Add paneer cubes and gently mix.",
            "Sprinkle kasoori methi and serve hot with naan or rice.",
          ],
        },
        {
          id: "biryani",
          title: "Vegetable Biryani",
          image: getRecipeImage("vegetable biryani", "Indian"),
          prepTime: "60 mins",
          difficulty: "Hard",
          missingIngredients: [],
          availableIngredients: [],
          description: "Aromatic rice dish layered with spiced vegetables - a royal feast! 👑🍚",
          servings: 6,
          cuisine: "Indian",
          calories: 350,
          ingredients: [
            "basmati rice",
            "mixed vegetables",
            "onion",
            "tomatoes",
            "yogurt",
            "ginger",
            "garlic",
            "biryani masala",
            "saffron",
            "milk",
            "ghee",
            "bay leaves",
            "cinnamon",
            "cardamom",
            "salt",
            "mint",
            "cilantro",
          ],
          instructions: [
            "Soak basmati rice for 30 minutes, then boil with whole spices until 70% cooked.",
            "Fry sliced onions until golden and crispy. Set aside.",
            "Cook mixed vegetables with spices until tender.",
            "Layer the rice and vegetables alternately in a heavy-bottomed pot.",
            "Sprinkle fried onions, mint, cilantro, and saffron soaked in milk.",
            "Cover and cook on high heat for 2 minutes, then reduce to low heat.",
            "Cook for 45 minutes on low heat (dum cooking).",
            "Let it rest for 10 minutes before opening.",
            "Gently mix and serve hot with raita and pickle.",
          ],
        },

        // Italian Cuisine
        {
          id: "spaghetti-carbonara",
          title: "Spaghetti Carbonara",
          image: getRecipeImage("spaghetti carbonara", "Italian"),
          prepTime: "20 mins",
          difficulty: "Medium",
          missingIngredients: [],
          availableIngredients: [],
          description: "Classic Roman pasta with eggs, cheese, and pancetta - pure Italian comfort! 🇮🇹🍝",
          servings: 4,
          cuisine: "Italian",
          calories: 450,
          ingredients: [
            "spaghetti",
            "pasta",
            "eggs",
            "parmesan cheese",
            "pancetta",
            "bacon",
            "black pepper",
            "salt",
            "garlic",
          ],
          instructions: [
            "Cook spaghetti in salted boiling water until al dente.",
            "Meanwhile, cook pancetta in a large pan until crispy.",
            "In a bowl, whisk eggs with grated parmesan and black pepper.",
            "Drain pasta, reserving 1 cup of pasta water.",
            "Add hot pasta to the pan with pancetta.",
            "Remove from heat and quickly mix in egg mixture, tossing constantly.",
            "Add pasta water gradually until creamy consistency is reached.",
            "Serve immediately with extra parmesan and black pepper.",
          ],
        },
        {
          id: "margherita-pizza",
          title: "Margherita Pizza",
          image: getRecipeImage("margherita pizza", "Italian"),
          prepTime: "30 mins",
          difficulty: "Medium",
          missingIngredients: [],
          availableIngredients: [],
          description: "The queen of pizzas with fresh tomatoes, mozzarella, and basil! 🍕👑",
          servings: 2,
          cuisine: "Italian",
          calories: 380,
          ingredients: [
            "pizza dough",
            "flour",
            "tomato sauce",
            "tomatoes",
            "mozzarella cheese",
            "fresh basil",
            "olive oil",
            "salt",
            "garlic",
          ],
          instructions: [
            "Preheat oven to 475°F (245°C).",
            "Roll out pizza dough on a floured surface.",
            "Spread tomato sauce evenly, leaving a border for crust.",
            "Add torn mozzarella pieces over the sauce.",
            "Drizzle with olive oil and season with salt.",
            "Bake for 12-15 minutes until crust is golden and cheese is bubbly.",
            "Remove from oven and top with fresh basil leaves.",
            "Slice and serve hot.",
          ],
        },
        {
          id: "risotto",
          title: "Mushroom Risotto",
          image: getRecipeImage("risotto", "Italian"),
          prepTime: "35 mins",
          difficulty: "Medium",
          missingIngredients: [],
          availableIngredients: [],
          description: "Creamy Italian rice dish with earthy mushrooms! 🍄🍚",
          servings: 4,
          cuisine: "Italian",
          calories: 320,
          ingredients: [
            "arborio rice",
            "rice",
            "mushrooms",
            "onion",
            "garlic",
            "white wine",
            "vegetable broth",
            "parmesan cheese",
            "butter",
            "olive oil",
            "salt",
            "pepper",
            "parsley",
          ],
          instructions: [
            "Heat broth in a separate pot and keep warm.",
            "Sauté mushrooms in olive oil until golden. Set aside.",
            "In the same pan, cook onions until translucent.",
            "Add rice and stir for 2 minutes until lightly toasted.",
            "Add wine and stir until absorbed.",
            "Add warm broth one ladle at a time, stirring constantly.",
            "Continue until rice is creamy and al dente (about 18 minutes).",
            "Stir in mushrooms, butter, and parmesan.",
            "Garnish with parsley and serve immediately.",
          ],
        },

        // Chinese Cuisine
        {
          id: "fried-rice",
          title: "Fried Rice",
          image: getRecipeImage("fried rice", "Chinese"),
          prepTime: "15 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Quick and satisfying Chinese-style fried rice with vegetables and eggs! 🇨🇳🍚",
          servings: 4,
          cuisine: "Chinese",
          calories: 280,
          ingredients: [
            "cooked rice",
            "rice",
            "eggs",
            "soy sauce",
            "vegetables",
            "carrots",
            "peas",
            "onion",
            "garlic",
            "ginger",
            "oil",
            "salt",
            "green onions",
          ],
          instructions: [
            "Heat oil in a large wok or pan over high heat.",
            "Scramble eggs and set aside.",
            "Add garlic and ginger, stir-fry for 30 seconds.",
            "Add vegetables and stir-fry for 2-3 minutes.",
            "Add cold cooked rice, breaking up any clumps.",
            "Stir-fry for 3-4 minutes until rice is heated through.",
            "Add soy sauce and scrambled eggs back to the pan.",
            "Garnish with chopped green onions and serve hot.",
          ],
        },
        {
          id: "kung-pao-chicken",
          title: "Kung Pao Chicken",
          image: getRecipeImage("kung pao chicken", "Chinese"),
          prepTime: "25 mins",
          difficulty: "Medium",
          missingIngredients: [],
          availableIngredients: [],
          description: "Spicy Sichuan chicken with peanuts and vegetables! 🌶️🥜",
          servings: 4,
          cuisine: "Chinese",
          calories: 380,
          ingredients: [
            "chicken breast",
            "chicken",
            "peanuts",
            "bell peppers",
            "onion",
            "garlic",
            "ginger",
            "soy sauce",
            "rice vinegar",
            "sugar",
            "cornstarch",
            "chili peppers",
            "oil",
            "green onions",
          ],
          instructions: [
            "Cut chicken into cubes and marinate with soy sauce and cornstarch.",
            "Heat oil in a wok over high heat.",
            "Stir-fry chicken until cooked through. Remove and set aside.",
            "Add garlic, ginger, and chili peppers to the wok.",
            "Add bell peppers and onions, stir-fry for 2 minutes.",
            "Return chicken to wok with sauce mixture.",
            "Add peanuts and toss everything together.",
            "Garnish with green onions and serve with rice.",
          ],
        },

        // Mexican Cuisine
        {
          id: "chicken-tacos",
          title: "Chicken Tacos",
          image: getRecipeImage("chicken tacos", "Mexican"),
          prepTime: "25 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Flavorful Mexican chicken tacos with fresh toppings! 🇲🇽🌮",
          servings: 4,
          cuisine: "Mexican",
          calories: 320,
          ingredients: [
            "chicken breast",
            "chicken",
            "tortillas",
            "onion",
            "tomatoes",
            "lettuce",
            "cheese",
            "lime",
            "cumin",
            "chili powder",
            "garlic",
            "oil",
            "salt",
            "cilantro",
          ],
          instructions: [
            "Season chicken with cumin, chili powder, and salt.",
            "Cook chicken in oil until fully cooked and slightly charred.",
            "Shred or dice the cooked chicken.",
            "Warm tortillas in a dry pan or microwave.",
            "Fill tortillas with chicken, diced onions, and tomatoes.",
            "Top with shredded lettuce, cheese, and cilantro.",
            "Squeeze lime juice over tacos before serving.",
            "Serve with salsa and hot sauce on the side.",
          ],
        },
        {
          id: "guacamole",
          title: "Fresh Guacamole",
          image: getRecipeImage("guacamole", "Mexican"),
          prepTime: "10 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Creamy avocado dip with lime and cilantro - perfect for chips! 🥑🌿",
          servings: 4,
          cuisine: "Mexican",
          calories: 160,
          ingredients: ["avocados", "lime", "onion", "tomatoes", "garlic", "cilantro", "jalapeño", "salt", "pepper"],
          instructions: [
            "Cut avocados in half, remove pits, and scoop into a bowl.",
            "Mash avocados with a fork, leaving some chunks for texture.",
            "Add lime juice immediately to prevent browning.",
            "Finely dice onion, tomatoes, and jalapeño.",
            "Mix in diced vegetables, minced garlic, and cilantro.",
            "Season with salt and pepper to taste.",
            "Let sit for 10 minutes for flavors to meld.",
            "Serve with tortilla chips or as a topping.",
          ],
        },

        // Thai Cuisine
        {
          id: "pad-thai",
          title: "Pad Thai",
          image: getRecipeImage("pad thai", "Thai"),
          prepTime: "30 mins",
          difficulty: "Medium",
          missingIngredients: [],
          availableIngredients: [],
          description: "Thailand's most famous noodle dish with sweet, sour, and savory flavors! 🇹🇭🍜",
          servings: 4,
          cuisine: "Thai",
          calories: 350,
          ingredients: [
            "rice noodles",
            "noodles",
            "shrimp",
            "chicken",
            "eggs",
            "bean sprouts",
            "peanuts",
            "lime",
            "fish sauce",
            "tamarind paste",
            "sugar",
            "garlic",
            "oil",
            "green onions",
          ],
          instructions: [
            "Soak rice noodles in warm water until soft.",
            "Heat oil in a wok over high heat.",
            "Add garlic and protein (shrimp/chicken), cook until done.",
            "Push to one side, scramble eggs on the other side.",
            "Add drained noodles and sauce mixture (fish sauce, tamarind, sugar).",
            "Toss everything together for 2-3 minutes.",
            "Add bean sprouts and cook for another minute.",
            "Garnish with peanuts, lime wedges, and green onions.",
          ],
        },
        {
          id: "tom-yum",
          title: "Tom Yum Soup",
          image: getRecipeImage("tom yum", "Thai"),
          prepTime: "20 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Spicy and sour Thai soup with shrimp and herbs! 🍤🌶️",
          servings: 4,
          cuisine: "Thai",
          calories: 120,
          ingredients: [
            "shrimp",
            "mushrooms",
            "lemongrass",
            "lime leaves",
            "galangal",
            "ginger",
            "chili peppers",
            "lime juice",
            "fish sauce",
            "tomatoes",
            "onion",
            "cilantro",
            "vegetable broth",
          ],
          instructions: [
            "Bring broth to a boil in a large pot.",
            "Add lemongrass, galangal, and lime leaves.",
            "Simmer for 5 minutes to infuse flavors.",
            "Add mushrooms and tomatoes, cook for 3 minutes.",
            "Add shrimp and cook until pink and cooked through.",
            "Season with fish sauce, lime juice, and chili peppers.",
            "Remove from heat and add cilantro.",
            "Serve hot with steamed rice.",
          ],
        },

        // American Cuisine
        {
          id: "classic-burger",
          title: "Classic Burger",
          image: getRecipeImage("classic burger", "American"),
          prepTime: "20 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "All-American beef burger with classic toppings! 🇺🇸🍔",
          servings: 4,
          cuisine: "American",
          calories: 520,
          ingredients: [
            "ground beef",
            "beef",
            "burger buns",
            "bread",
            "cheese",
            "lettuce",
            "tomatoes",
            "onion",
            "pickles",
            "ketchup",
            "mustard",
            "mayonnaise",
            "salt",
            "pepper",
          ],
          instructions: [
            "Form ground beef into 4 patties, season with salt and pepper.",
            "Heat a grill or pan over medium-high heat.",
            "Cook patties for 4-5 minutes per side for medium doneness.",
            "Add cheese in the last minute of cooking if desired.",
            "Toast burger buns lightly.",
            "Assemble burgers with lettuce, tomato, onion, and pickles.",
            "Add condiments as desired.",
            "Serve immediately with fries or chips.",
          ],
        },
        {
          id: "bbq-ribs",
          title: "BBQ Ribs",
          image: getRecipeImage("bbq ribs", "American"),
          prepTime: "3 hours",
          difficulty: "Hard",
          missingIngredients: [],
          availableIngredients: [],
          description: "Smoky, tender ribs with tangy barbecue sauce! 🍖🔥",
          servings: 4,
          cuisine: "American",
          calories: 650,
          ingredients: [
            "pork ribs",
            "ribs",
            "brown sugar",
            "paprika",
            "garlic powder",
            "onion powder",
            "chili powder",
            "salt",
            "pepper",
            "bbq sauce",
            "apple cider vinegar",
            "mustard",
          ],
          instructions: [
            "Mix all dry spices to create a rub.",
            "Coat ribs generously with the spice rub.",
            "Let ribs marinate for at least 2 hours or overnight.",
            "Preheat oven to 275°F (135°C).",
            "Wrap ribs in foil and bake for 2.5 hours.",
            "Remove foil and brush with BBQ sauce.",
            "Increase temperature to 400°F and bake 15 more minutes.",
            "Let rest for 10 minutes before cutting and serving.",
          ],
        },

        // Japanese Cuisine
        {
          id: "chicken-teriyaki",
          title: "Chicken Teriyaki",
          image: getRecipeImage("chicken teriyaki", "Japanese"),
          prepTime: "20 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Sweet and savory Japanese glazed chicken! 🇯🇵🍗",
          servings: 4,
          cuisine: "Japanese",
          calories: 280,
          ingredients: [
            "chicken thighs",
            "chicken",
            "soy sauce",
            "mirin",
            "sugar",
            "sake",
            "ginger",
            "garlic",
            "oil",
            "green onions",
            "sesame seeds",
          ],
          instructions: [
            "Mix soy sauce, mirin, sugar, and sake for teriyaki sauce.",
            "Heat oil in a pan over medium-high heat.",
            "Cook chicken skin-side down until golden, about 6 minutes.",
            "Flip and cook another 4-5 minutes until cooked through.",
            "Pour teriyaki sauce over chicken and simmer until glazed.",
            "Turn chicken to coat both sides with sauce.",
            "Garnish with green onions and sesame seeds.",
            "Serve with steamed rice and vegetables.",
          ],
        },
        {
          id: "sushi-bowl",
          title: "Sushi Bowl",
          image: getRecipeImage("sushi", "Japanese"),
          prepTime: "25 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Deconstructed sushi in a bowl - all the flavors, easier to make! 🍣🥢",
          servings: 2,
          cuisine: "Japanese",
          calories: 320,
          ingredients: [
            "sushi rice",
            "rice",
            "nori",
            "cucumber",
            "avocado",
            "carrots",
            "edamame",
            "soy sauce",
            "rice vinegar",
            "sesame oil",
            "sesame seeds",
            "wasabi",
            "ginger",
          ],
          instructions: [
            "Cook sushi rice according to package directions.",
            "Season rice with rice vinegar and a pinch of sugar.",
            "Slice cucumber, avocado, and carrots into thin strips.",
            "Cook edamame and remove from pods.",
            "Arrange rice in bowls as the base.",
            "Top with arranged vegetables in sections.",
            "Sprinkle with sesame seeds and torn nori.",
            "Serve with soy sauce, wasabi, and pickled ginger.",
          ],
        },

        // Mediterranean Cuisine
        {
          id: "greek-salad",
          title: "Greek Salad",
          image: getRecipeImage("greek salad", "Mediterranean"),
          prepTime: "15 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Fresh Mediterranean salad with feta, olives, and herbs! 🇬🇷🥗",
          servings: 4,
          cuisine: "Mediterranean",
          calories: 180,
          ingredients: [
            "tomatoes",
            "cucumber",
            "red onion",
            "onion",
            "feta cheese",
            "cheese",
            "olives",
            "olive oil",
            "lemon",
            "oregano",
            "salt",
            "pepper",
          ],
          instructions: [
            "Cut tomatoes and cucumber into chunks.",
            "Slice red onion thinly.",
            "Combine vegetables in a large bowl.",
            "Add olives and crumbled feta cheese.",
            "Whisk olive oil, lemon juice, oregano, salt, and pepper.",
            "Pour dressing over salad and toss gently.",
            "Let sit for 10 minutes for flavors to meld.",
            "Serve with pita bread or as a side dish.",
          ],
        },
        {
          id: "hummus",
          title: "Classic Hummus",
          image: getRecipeImage("hummus", "Mediterranean"),
          prepTime: "10 mins",
          difficulty: "Easy",
          missingIngredients: [],
          availableIngredients: [],
          description: "Creamy chickpea dip with tahini and lemon! 🫘🌿",
          servings: 6,
          cuisine: "Mediterranean",
          calories: 140,
          ingredients: ["chickpeas", "tahini", "lemon", "garlic", "olive oil", "cumin", "salt", "paprika", "parsley"],
          instructions: [
            "Drain and rinse chickpeas, reserve some liquid.",
            "In a food processor, blend garlic until minced.",
            "Add chickpeas, tahini, lemon juice, and cumin.",
            "Blend until smooth, adding reserved liquid as needed.",
            "Season with salt and adjust lemon juice to taste.",
            "Transfer to serving bowl and drizzle with olive oil.",
            "Sprinkle with paprika and chopped parsley.",
            "Serve with pita bread, vegetables, or crackers.",
          ],
        },

        // French Cuisine
        {
          id: "ratatouille",
          title: "Ratatouille",
          image: getRecipeImage("ratatouille", "French"),
          prepTime: "45 mins",
          difficulty: "Medium",
          missingIngredients: [],
          availableIngredients: [],
          description: "Classic French vegetable stew from Provence! 🇫🇷🍆",
          servings: 6,
          cuisine: "French",
          calories: 120,
          ingredients: [
            "eggplant",
            "zucchini",
            "bell peppers",
            "tomatoes",
            "onion",
            "garlic",
            "olive oil",
            "thyme",
            "basil",
            "bay leaves",
            "salt",
            "pepper",
          ],
          instructions: [
            "Cut all vegetables into similar-sized chunks.",
            "Heat olive oil in a large pot over medium heat.",
            "Sauté onions until translucent, add garlic.",
            "Add eggplant and cook for 5 minutes.",
            "Add bell peppers and zucchini, cook 5 more minutes.",
            "Add tomatoes, herbs, salt, and pepper.",
            "Simmer covered for 20-25 minutes until vegetables are tender.",
            "Adjust seasoning and serve hot or at room temperature.",
          ],
        },
        {
          id: "coq-au-vin",
          title: "Coq au Vin",
          image: getRecipeImage("coq au vin", "French"),
          prepTime: "90 mins",
          difficulty: "Hard",
          missingIngredients: [],
          availableIngredients: [],
          description: "Classic French chicken braised in wine with herbs! 🍷🐓",
          servings: 4,
          cuisine: "French",
          calories: 420,
          ingredients: [
            "chicken pieces",
            "chicken",
            "red wine",
            "bacon",
            "mushrooms",
            "onions",
            "carrots",
            "garlic",
            "thyme",
            "bay leaves",
            "butter",
            "flour",
            "salt",
            "pepper",
            "parsley",
          ],
          instructions: [
            "Cook bacon in a large pot until crispy. Remove and set aside.",
            "Brown chicken pieces in the bacon fat. Remove and set aside.",
            "Sauté onions, carrots, and mushrooms until softened.",
            "Add garlic and cook for 1 minute.",
            "Sprinkle flour over vegetables and cook for 2 minutes.",
            "Add wine, herbs, and return chicken and bacon to pot.",
            "Bring to a boil, then simmer covered for 45 minutes.",
            "Remove chicken and vegetables, reduce sauce if needed.",
            "Serve garnished with fresh parsley.",
          ],
        },
      ]

      const matchedRecipes = recipeDatabase
        .map((recipe) => {
          const availableInRecipe = ingredients.filter((ingredient) =>
            recipe.ingredients.some(
              (recipeIng) =>
                recipeIng.toLowerCase().includes(ingredient.toLowerCase()) ||
                ingredient.toLowerCase().includes(recipeIng.toLowerCase()),
            ),
          )

          const missingIngredients = recipe.ingredients
            .filter(
              (recipeIng) =>
                !ingredients.some(
                  (userIng) =>
                    recipeIng.toLowerCase().includes(userIng.toLowerCase()) ||
                    userIng.toLowerCase().includes(recipeIng.toLowerCase()),
                ),
            )
            .slice(0, 4) // Show only first 4 missing ingredients

          return {
            ...recipe,
            availableIngredients: availableInRecipe,
            missingIngredients: missingIngredients,
            matchScore: availableInRecipe.length,
          }
        })
        .filter((recipe) => recipe.matchScore > 0) // Only show recipes with at least 1 matching ingredient
        .sort((a, b) => b.matchScore - a.matchScore) // Sort by match score

      setRecipes(matchedRecipes)
    } catch (err) {
      console.error("Recipe generation error:", err)
      setError("Failed to generate recipes. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const saveIngredientSet = () => {
    if (ingredients.length === 0) return
    try {
      const name = prompt("Name this ingredient set:")
      if (name && name.trim()) {
        setSavedSets([...savedSets, { name: name.trim(), ingredients: [...ingredients] }])
        setError(null)
      }
    } catch (err) {
      console.error("Error saving ingredient set:", err)
      setError("Failed to save ingredient set")
    }
  }

  const loadIngredientSet = (set: { name: string; ingredients: string[] }) => {
    try {
      setIngredients(set.ingredients)
      setShowSavedSets(false)
      setError(null)
    } catch (err) {
      console.error("Error loading ingredient set:", err)
      setError("Failed to load ingredient set")
    }
  }

  const showFullRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
  }

  const closeRecipeModal = () => {
    setSelectedRecipe(null)
  }

  return (
    <div className="min-h-screen bg-base-100 relative">
      <BackButton fallbackUrl="/" />

      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-base-100 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-base-100 border-b border-base-300 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-base-content">{selectedRecipe.title}</h2>
              <button onClick={closeRecipeModal} className="btn btn-ghost btn-sm">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedRecipe.image || getRecipeImage(selectedRecipe.title, selectedRecipe.cuisine)}
                    alt={selectedRecipe.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(selectedRecipe.title + " " + selectedRecipe.cuisine + " food dish authentic")}`
                    }}
                  />
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedRecipe.prepTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedRecipe.servings} servings
                    </div>
                    <div
                      className={`badge ${
                        selectedRecipe.difficulty === "Easy"
                          ? "badge-success"
                          : selectedRecipe.difficulty === "Medium"
                            ? "badge-warning"
                            : "badge-error"
                      }`}
                    >
                      {selectedRecipe.difficulty}
                    </div>
                  </div>
                  <p className="text-base-content/70 mb-4">{selectedRecipe.description}</p>
                  <div className="bg-base-200 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Nutrition Info</h4>
                    <p className="text-sm text-base-content/70">
                      Cuisine: {selectedRecipe.cuisine} •
                      {selectedRecipe.calories && ` ${selectedRecipe.calories} calories per serving`}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm">{ingredient}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="bg-primary text-primary-content rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`container mx-auto md:mt-16 mt-28 px-4 py-8 transition-all duration-300 ${
          showResults ? "opacity-80 blur-sm" : "opacity-100"
        }`}
      >
        {/* ... existing code for header and input section ... */}
        <div className="text-center mb-8 mt-12 md:mt-0">
          <h1 className="text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            AI Ingredient Explorer
          </h1>
          <p className="text-lg text-base-content/70">Discover amazing recipes based on what you have at home!</p>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="btn btn-sm btn-ghost">
              Dismiss
            </button>
          </div>
        )}

        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body py-4 px-6">
            <h2 className="card-title text-xl mb-4 text-center">What ingredients do you have?</h2>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                  placeholder="Type an ingredient..."
                  className="input input-bordered flex-1"
                />
                <button onClick={addIngredient} className="btn btn-primary">
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {speechSupported && (
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={!speechSupported}
                  className={`btn ${isListening ? "btn-error" : "btn-info"} disabled:opacity-50`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening ? "Stop" : "Voice"}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="badge badge-primary badge-lg gap-2">
                  {ingredient}
                  <button onClick={() => removeIngredient(ingredient)} className="hover:text-error">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={generateRecipes}
                disabled={ingredients.length === 0 || isLoading}
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              >
                {!isLoading && <ChefHat className="w-4 h-4" />}
                {isLoading ? "Generating..." : "Find Recipes"}
              </button>
              <button
                onClick={saveIngredientSet}
                disabled={ingredients.length === 0}
                className="btn btn-outline btn-primary"
              >
                Save Set
              </button>
              <button onClick={() => setShowSavedSets(!showSavedSets)} className="btn btn-outline btn-primary">
                Saved Sets ({savedSets.length})
              </button>
            </div>
            {showSavedSets && savedSets.length > 0 && (
              <div className="mt-4 p-3 bg-base-300 rounded-lg">
                <h3 className="font-semibold text-base-content mb-2">Your Saved Ingredient Sets:</h3>
                <div className="space-y-2">
                  {savedSets.map((set, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-base-100 rounded-lg">
                      <div>
                        <div className="font-medium text-base-content">{set.name}</div>
                        <div className="text-sm text-base-content/70">{set.ingredients.join(", ")}</div>
                      </div>
                      <button onClick={() => loadIngredientSet(set)} className="btn btn-primary btn-sm">
                        Load
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {recipes.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-base-content text-center">AI-Curated Recipe Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                  <figure className="aspect-video">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        const cuisineFallback = getRecipeImage("fallback", recipe.cuisine.toLowerCase())
                        if (target.src !== cuisineFallback) {
                          target.src = cuisineFallback
                        } else {
                          target.src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&q=80"
                        }
                      }}
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-base-content">{recipe.title}</h3>
                    <p className="text-base-content/70 text-sm mb-4">{recipe.description}</p>
                    <div className="flex items-center gap-4 mb-4 text-sm text-base-content/70">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.prepTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {recipe.servings} servings
                      </div>
                      <div
                        className={`badge ${
                          recipe.difficulty === "Easy"
                            ? "badge-success"
                            : recipe.difficulty === "Medium"
                              ? "badge-warning"
                              : "badge-error"
                        }`}
                      >
                        {recipe.difficulty}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-base-content mb-2">You have:</div>
                      <div className="flex flex-wrap gap-1">
                        {recipe.availableIngredients.length > 0 ? (
                          recipe.availableIngredients.map((ingredient, index) => (
                            <span key={index} className="badge badge-success badge-sm">
                              ✓ {ingredient}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-base-content/50">No matching ingredients</span>
                        )}
                      </div>
                    </div>
                    {recipe.missingIngredients.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-base-content mb-2">You need:</div>
                        <div className="flex flex-wrap gap-1">
                          {recipe.missingIngredients.map((ingredient, index) => (
                            <span key={index} className="badge badge-warning badge-sm">
                              + {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="card-actions justify-end">
                      <button onClick={() => showFullRecipe(recipe)} className="btn btn-primary w-full">
                        View Full Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ingredients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🥘</div>
            <h3 className="text-xl font-semibold text-base-content mb-2">Start by adding your ingredients</h3>
            <p className="text-base-content/70">
              Type them in{speechSupported ? ", use voice input," : ""} or load a saved set to get started!
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
