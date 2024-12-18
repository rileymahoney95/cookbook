import React from 'react';
import Link from 'next/link';

import RecipesGrid from '@/components/recipe-components/recipe-grid';

import { getAllRecipes } from '@/lib/db/repository/recipe-repository';
import { getImageUrl } from '@/lib/utils/s3';
import { Recipe } from '@/lib/types/recipe';

export const metadata = {
  title: 'All Recipes',
  description: 'Browse the delicious recipes shared by our vibrant community!',
};

export default async function RecipesPage() {
  const recipes: Recipe[] = await getAllRecipes();

  if (!recipes) {
    return <div>No recipes found</div>;
  }

  const recipesWithImages = await Promise.all(
    recipes?.map(async (recipe) => ({
      ...recipe,
      image_url: await getImageUrl(recipe.image_key || null),
    })) || []
  );

  console.log(recipesWithImages);

  return (
    <>
      <header className='flex justify-center mt-6 mb-12'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col justify-between'>
            <h1>
              Delicious recipes, created
              <span className='text-primary-red'> by you</span>
            </h1>
          </div>
          <Link href='/recipes/share' passHref>
            <button className='ml-12'>Share Your Favorite Recipe</button>
          </Link>
        </div>
      </header>
      <main>
        <RecipesGrid recipes={recipesWithImages} />
      </main>
    </>
  );
}
