import Link from 'next/link';
import Image from 'next/image';
import styles from './recipe-item.module.css';
import type { Recipe } from '@/lib/db/pg/entities/types';


type RecipeItemProps = {
  recipe: Recipe;
}

export default async function RecipeItem({ recipe }: RecipeItemProps) {
  const { name, slug, description } = recipe;
  const author = recipe.author;

  const imgPath = `/recipe-images/${slug}.jpeg`;
  return (
    <article className={styles.article}>
      <header>
        <div className={styles.imageContainer}>
          <Image src={imgPath} alt={name} layout='fill' objectFit='cover' />
        </div>
        <div className={styles.headerContent}>
          <h2>{name}</h2>
          <p>by {author.name}</p>
        </div>
      </header>
      <div className={styles.content}>
        <p className={styles.description}>{description}</p>
        <button className={styles.button}>
          <Link href={`/recipes/${slug}`}>View Details</Link>
        </button>
      </div>
    </article>
  );
}
