import styles from './page.module.css';
import RecipeShareForm from '@/components/recipe-share-form/recipe-share-form';

export default function ShareRecipePage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Share your <span className={styles.highlight}>favorite recipe</span>
        </h1>
      </header>
      <main className={styles.main}>
        <RecipeShareForm />
      </main>
    </>
  );
}
