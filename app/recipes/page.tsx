import React, { Suspense } from 'react';
import Link from 'next/link';

import RecipesGrid from '@/components/recipe-components/recipe-grid';
import LoadingFallback from './recipes-loading';
import styles from './page.module.css';

import { getRecipesByUserId } from '@/lib/db';

export const metadata = {
  title: 'All Recipes',
  description: 'Browse the delicious recipes shared by our vibrant community!',
};

async function Recipes() {
  const recipes = await getRecipesByUserId(1);

  return <RecipesGrid recipes={recipes} />;
}

export default function RecipesPage() {
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
        <Suspense fallback={<LoadingFallback />}>
          <Recipes />
        </Suspense>
      </main>
    </>
  );
}
