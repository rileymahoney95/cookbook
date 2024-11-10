import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import type { RecipeIngredient, NutritionalInfo } from './types';
import { RecipeIngredientEntity } from './recipe-ingredients.entity';
import { NutritionalInfoEntity } from './nutritional-info.entity';

@Entity("ingredients")
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => RecipeIngredientEntity, (recipeIngredient) => recipeIngredient.ingredient)
  recipeIngredients: RecipeIngredient[];

  @OneToOne(() => NutritionalInfoEntity, (nutritionalInfo) => nutritionalInfo.ingredient, {
    cascade: true,
    eager: true,
    nullable: true
  })
  nutritionalInfo: NutritionalInfo;
}