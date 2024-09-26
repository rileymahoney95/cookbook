import RecipeItem from './recipe-item';
import { Recipe } from '@/types';
import styles from './recipe-grid.module.css';

interface RecipeItemProps {
  recipes: Recipe[];
}

export default function RecipesGrid({ recipes }: RecipeItemProps) {
  return (
    <ul className={styles.gridContainer}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeItem recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
