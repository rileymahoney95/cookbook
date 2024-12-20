'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Recipe } from '@/lib/types/recipe';
import { useEffect } from 'react';

type RecipeItemProps = {
  recipe: Recipe;
};

export default function RecipeItem({ recipe }: RecipeItemProps) {
  useEffect(() => {
    if (recipe.image_url) {
      const img = document.querySelector(
        `img[alt="${name}"]`
      ) as HTMLImageElement;
      if (img) {
        img.src = recipe.image_url;
      }
    }
  }, [recipe]);

  const { id, name, slug, description } = recipe;
  const author = recipe.author;

  const imgPath = `/recipe-images/${slug}.jpeg`;
  return (
    <article className='flex flex-col justify-between h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out'>
      <header>
        <div className='relative h-60'>
          <Image src={imgPath} alt={name} layout='fill' objectFit='cover' />
        </div>
        <div className='p-2'>
          <h2>{name}</h2>
          <p>by {author.name}</p>
        </div>
      </header>
      <div className='p-2'>
        <button className="bg-gray-600 text-white border-none py-2 px-4 rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-700">
          <Link href={`/recipes/${id}`}>View Details</Link>
        </button>
      </div>
    </article>
  );
}
