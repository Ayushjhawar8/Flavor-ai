import ShowMeal from "@/components/ShowMeal";
import RecipeComments from "@/components/RecipeComments";
import { MEAL_URL } from "@/lib/urls";

export default function Page({ params }) {
  return (
    <div>
      <ShowMeal URL={MEAL_URL(params)} />
      <RecipeComments recipeId={params.meal} />
    </div>
  );
}
