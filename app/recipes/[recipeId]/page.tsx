import { getRecipeById } from '@/lib/db/repository/recipe-repository';

type RecipeDetailsPageProps = {
  params: {
    recipeId: number,
  }
}
export default async function RecipeDetailsPage({ params }: RecipeDetailsPageProps) {
  const recipe = await getRecipeById(params.recipeId);  
  return (
    <main className='mx-auto max-w-screen-md flex flex-col gap-2'>
      <h1>{recipe.name}</h1>
      <h2>by {recipe.author.name}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.ingredient.id}>{ingredient.ingredient.name}</li>
        ))}
      </ul> 
      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((step) => (
          <li key={step.id}>{step.instruction}</li>
        ))}
      </ol>
    </main>
  )
}