import Link from 'next/link';
import Image from 'next/image';
import type { Recipe } from '@/lib/db/pg/entities/types';


type RecipeItemProps = {
  recipe: Recipe;
}

export default async function RecipeItem({ recipe }: RecipeItemProps) {
  const { name, slug, description } = recipe;
  const author = recipe.author;

  const imgPath = `/recipe-images/${slug}.jpeg`;
  return (
    <article className="flex flex-col justify-between h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
      <header>
        <div className="relative h-60">
          <Image src={imgPath} alt={name} layout='fill' objectFit='cover' />
        </div>
        <div className="p-2">
          <h2>{name}</h2>
          <p>by {author.name}</p>
        </div>
      </header>
      <div className="p-2">
        <p className="mb-2">{description}</p>
        <button>
          <Link href={`/recipes/${slug}`}>View Details</Link>
        </button>
      </div>
    </article>
  );
}
