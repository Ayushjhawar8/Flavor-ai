import Link from 'next/link';

export default function SimilarRecipes({ recipes }) {
  if (!recipes || recipes.length === 0) {
    console.log('No similar recipes found');
    return null;
  }

  console.log('Rendering similar recipes:', recipes);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">More Recipes You'll Love</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="bg-white border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              // Store the recipe directly in localStorage for viewing
              localStorage.setItem('current_recipe', JSON.stringify(recipe));
              window.location.href = '/recipe';
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-medium text-lg">{recipe.title}</h3>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-600">{recipe.cookTime}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>❤️</span>
                <span>{Math.floor(Math.random() * 50) + 10} likes</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge badge-sm badge-primary">{recipe.difficulty}</span>
              <span className="text-xs text-gray-500">{recipe.servings} servings</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}