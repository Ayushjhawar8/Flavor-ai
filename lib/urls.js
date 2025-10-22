export const RANDOM_MEAL_URL =
  "https://www.themealdb.com/api/json/v1/1/random.php";
export const CATEGORIES_URL =
  "https://www.themealdb.com/api/json/v1/1/categories.php";
export const MEAL_URL = (params) =>
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.meal}`;
