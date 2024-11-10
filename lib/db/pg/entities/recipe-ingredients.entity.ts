import { Entity, PrimaryColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import type { Recipe, Ingredient } from './types';
import { RecipeEntity } from './recipe.entity';
import { IngredientEntity } from './ingredient.entity';

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
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.recipeIngredients, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}