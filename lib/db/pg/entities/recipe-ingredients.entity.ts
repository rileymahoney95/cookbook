import { Entity, PrimaryColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { RecipeEntity } from './recipe.entity';
import { IngredientEntity } from './ingredient.entity';
import type { RecipeEntity as RecipeType } from './types';
import type { IngredientEntity as IngredientType } from './types';

@Entity('recipe_ingredients')
export class RecipeIngredientEntity {
  @PrimaryColumn({ name: 'recipe_id', nullable: false })
  recipeId: number;

  @PrimaryColumn({ name: 'ingredient_id', nullable: false })
  ingredientId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  uom: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.recipeIngredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe: RecipeType;

  @ManyToOne(
    () => IngredientEntity,
    (ingredient) => ingredient.recipeIngredients,
    {
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: IngredientType;
}
