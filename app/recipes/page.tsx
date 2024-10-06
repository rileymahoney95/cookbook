import React from 'react';
import Link from 'next/link';

import RecipesGrid from '@/components/recipe-components/recipe-grid';
import styles from './page.module.css';

import { getRecipesByUserId } from '@/lib/db/pg/db';

export const metadata = {
  title: 'All Recipes',
  description: 'Browse the delicious recipes shared by our vibrant community!',
};

export default async function RecipesPage() {
  const recipes = await getRecipesByUserId(23);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.textContainer}>
            <h1>
              Delicious recipes, created
              <span className={styles.highlight}> by you</span>
            </h1>
          </div>
          <Link href='/recipes/share' passHref>
            <button className={styles.shareButton}>
              Share Your Favorite Recipe
            </button>
          </Link>
        </div>
      </header>
      <main>
        <RecipesGrid recipes={recipes} />
      </main>
    </>
  );
}
