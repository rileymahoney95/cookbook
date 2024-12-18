import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { RecipeIngredientEntity } from './recipe-ingredients.entity';
import { NutritionalInfoEntity } from './nutritional-info.entity';
import type { RecipeIngredientEntity as RecipeIngredientType } from './types';
import type { NutritionalInfoEntity as NutritionalInfoType } from './types';

@Entity('ingredients')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => RecipeIngredientEntity,
    (recipeIngredient) => recipeIngredient.ingredient
  )
  recipeIngredients: RecipeIngredientType[];

  @OneToOne(
    () => NutritionalInfoEntity,
    (nutritionalInfo) => nutritionalInfo.ingredient,
    {
      cascade: true,
      eager: true,
      nullable: true,
    }
  )
  nutritionalInfo: NutritionalInfoType;
}
