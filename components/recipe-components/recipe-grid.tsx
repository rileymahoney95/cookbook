import RecipeItem from './recipe-item';
import type { Recipe } from '@/lib/types/recipe';

type RecipeItemProps = {
  recipes: Recipe[];
};

export default function RecipesGrid({ recipes }: RecipeItemProps) {
  return (
    <ul className='w-[90%] max-w-[90rem] grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-20 my-8 mx-auto list-none p-0'>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeItem recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
