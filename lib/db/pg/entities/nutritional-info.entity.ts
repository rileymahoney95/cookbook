import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IngredientEntity } from './ingredient.entity';
import type { IngredientEntity as IngredientType } from './types';

@Entity('nutritional_info')
export class NutritionalInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ingredient_id' })
  ingredientId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  calories?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  protein?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  carbohydrates?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fat?: number;

  @OneToOne(
    () => IngredientEntity,
    (ingredient) => ingredient.nutritionalInfo,
    {
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: IngredientType;
}
