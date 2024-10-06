import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { RecipeIngredientEntity } from './recipe-ingredients.entity';
import { NutritionalInfoEntity } from './nutritional-info.entity';

@Entity("ingredients")
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => RecipeIngredientEntity, (recipeIngredient) => recipeIngredient.ingredient)
  recipeIngredients: RecipeIngredientEntity[];

  @OneToOne(() => NutritionalInfoEntity, (nutritionalInfo) => nutritionalInfo.ingredient, { cascade: true })
  @JoinColumn()
  nutritionalInfo: NutritionalInfoEntity;
}