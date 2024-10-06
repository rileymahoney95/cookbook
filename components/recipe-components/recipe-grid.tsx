import RecipeItem from './recipe-item';
import { RecipeEntity } from '@/lib/db/pg/entities/recipe.entity';
import styles from './recipe-grid.module.css';

type RecipeItemProps = {
  recipes: RecipeEntity[];
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
