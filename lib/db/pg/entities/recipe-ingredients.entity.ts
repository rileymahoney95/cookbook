import { Entity, PrimaryColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { RecipeEntity } from './recipe.entity';
import { IngredientEntity } from './ingredient.entity';

@Entity('recipe_ingredients')
export class RecipeIngredientEntity {
  @PrimaryColumn()
  recipe_id: number;

  @PrimaryColumn()
  ingredient_id: number;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.recipeIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: RecipeEntity;

  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.recipeIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: IngredientEntity;

  @Column({ type: 'varchar', length: 255, })
  recipe_name: string;

  @Column({ type: 'varchar', length: 255, })
  ingredient_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  uom: string;
}