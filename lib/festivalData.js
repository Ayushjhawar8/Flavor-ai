// Festival dishes data
export const festivalDishes = [
  // Holi Dishes
  {
    id: "holi_1",
    name: "Gujiya",
    festival: "Holi",
      type: "Festive",

    description:
      "Sweet dumplings filled with khoya and dry fruits, perfect for Holi celebrations",
    image:
      "https://spicecravings.com/wp-content/uploads/2024/03/Gujiya-Featured.jpg",
    ingredients: [
      "2 cups flour",
      "1 cup khoya",
      "1/2 cup sugar",
      "Almonds",
      "Pistachios",
      "Oil for frying",
    ],
    instructions: [
      "Make dough with flour",
      "Prepare sweet filling",
      "Shape and seal gujiya",
      "Deep fry until golden",
    ],
    cookTime: "45 mins",
    servings: 20,
    difficulty: "Medium",
  },
  {
    id: "holi_2",
    name: "Thandai",
  festival: "Holi",
    type: "Festive",

    description:
      "Traditional cooling drink with milk, nuts and spices for Holi festivities",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Thandai_%28Spiced_Indian_Milk_Drink%29.JPG/500px-Thandai_%28Spiced_Indian_Milk_Drink%29.JPG",
    ingredients: [
      "2 cups milk",
      "Almonds",
      "Pistachios",
      "Fennel seeds",
      "Rose petals",
      "Sugar",
    ],
    instructions: [
      "Soak nuts overnight",
      "Grind with spices",
      "Mix with chilled milk",
      "Strain and serve",
    ],
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
  },

  // Diwali Dishes
  {
    id: "diwali_1",
    name: "Kaju Katli",
  festival: "Diwali",
    type: "Festive",

    description: "Diamond-shaped cashew fudge, the king of Diwali sweets",
    image:
      "https://t3.ftcdn.net/jpg/05/36/29/96/360_F_536299651_UZpvmA2wBtaZF080Fg5TmTOagLxPRuBd.jpg",
    ingredients: [
      "2 cups cashews",
      "1 cup sugar",
      "1/4 cup water",
      "Silver leaf",
    ],
    instructions: [
      "Powder cashews finely",
      "Make sugar syrup",
      "Mix and cook",
      "Roll and cut diamonds",
    ],
    cookTime: "30 mins",
    servings: 25,
    difficulty: "Hard",
  },
  {
    id: "diwali_2",
    name: "Samosa",
  festival: "Diwali",
    type: "Festive",
    description: "Crispy triangular pastries filled with spiced potatoes",
    image:
      "https://www.pureindianfoods.com/cdn/shop/articles/indian-samosas-recipe.webp?v=1728682315",
    ingredients: [
      "2 cups flour",
      "4 potatoes",
      "Green peas",
      "Cumin seeds",
      "Garam masala",
      "Oil",
    ],
    instructions: [
      "Make dough",
      "Prepare potato filling",
      "Shape samosas",
      "Deep fry until golden",
    ],
    cookTime: "60 mins",
    servings: 15,
    difficulty: "Medium",
  },

  // Christmas Dishes
  {
    id: "christmas_1",
    name: "Christmas Cake",
    festival: "Christmas",
      type: "Festive",
      description:
      "Rich fruit cake soaked in rum, perfect for Christmas celebrations",
    image:
      "https://www.marcellinaincucina.com/wp-content/uploads/2024/11/rum-fruit-cake-featured.jpg",
    ingredients: [
      "2 cups flour",
      "Mixed dry fruits",
      "Butter",
      "Brown sugar",
      "Eggs",
      "Rum",
    ],
    instructions: [
      "Soak fruits in rum",
      "Cream butter and sugar",
      "Add eggs and flour",
      "Bake slowly",
    ],
    cookTime: "3 hours",
    servings: 12,
    difficulty: "Hard",
  },
  {
    id: "christmas_2",
    name: "Gingerbread Cookies",
  festival: "Christmas",
    type: "Festive",

    description:
      "Spiced cookies perfect for decorating and gifting during Christmas",
    image:
      "https://www.allrecipes.com/thmb/zy_j5bHmB7mbDHQ26CHdLTvRgPo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7322-favorite-old-fashioned-gingerbread-DDMFS-4x3-a15c0a20c8824c4cb4300989527f0d2f.jpg",
    ingredients: [
      "3 cups flour",
      "Ginger powder",
      "Cinnamon",
      "Molasses",
      "Butter",
      "Brown sugar",
    ],
    instructions: [
      "Mix dry ingredients",
      "Cream butter and sugar",
      "Combine and chill",
      "Roll, cut and bake",
    ],
    cookTime: "45 mins",
    servings: 30,
    difficulty: "Easy",
  },

  // Eid Dishes
  {
    id: "eid_1",
    name: "Sheer Khurma",
  festival: "Eid",
    type: "Festive",

    description:
      "Vermicelli pudding with milk, dates and nuts for Eid celebrations",
    image:
      "https://www.teaforturmeric.com/wp-content/uploads/2021/05/20-Minute-Seviyan-Sheer-Khurma-13.jpg",
    ingredients: [
      "1 cup vermicelli",
      "4 cups milk",
      "Dates",
      "Almonds",
      "Pistachios",
      "Sugar",
    ],
    instructions: [
      "Roast vermicelli",
      "Boil milk",
      "Add vermicelli and dates",
      "Garnish with nuts",
    ],
    cookTime: "30 mins",
    servings: 6,
    difficulty: "Easy",
  },
  {
    id: "eid_2",
    name: "Biryani",
  festival: "Eid",
    type: "Festive",

    description: "Aromatic rice dish with tender meat and fragrant spices",
    image:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
    ingredients: [
      "2 cups basmati rice",
      "1 kg mutton",
      "Yogurt",
      "Onions",
      "Biryani masala",
      "Saffron",
    ],
    instructions: [
      "Marinate meat",
      "Cook rice separately",
      "Layer rice and meat",
      "Dum cook together",
    ],
    cookTime: "2 hours",
    servings: 8,
    difficulty: "Hard",
  },
];

export const festivalInfo = {
  "All": {
    description: "Explore traditional dishes from various cultural festivals celebrated around the world"
  },
  "Holi": {
    description: "Festival of colors celebrating spring with sweet treats and refreshing drinks"
  },
  "Diwali": {
    description: "Festival of lights featuring rich sweets and savory snacks shared with loved ones"
  },
  "Christmas": {
    description: "Celebrate the season with traditional baked goods and festive treats"
  },
  "Eid": {
    description: "Mark the end of Ramadan with special dishes and sweet delicacies"
  }
};

export const festivals = ["All", "Holi", "Diwali", "Christmas", "Eid"];