import ShowMeal from "@/components/ShowMeal";
import ThemeToggle from "@/components/ThemeToggle";
import { RANDOM_MEAL_URL } from "@/lib/urls";

export default function Page()
{
  return <ShowMeal URL={RANDOM_MEAL_URL} />;
}
