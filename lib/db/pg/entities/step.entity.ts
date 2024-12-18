import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RecipeEntity } from './recipe.entity';
import type { RecipeEntity as RecipeType } from './types';

@Entity('steps')
export class StepEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'recipe_id' })
  recipeId: number;

  @Column({ name: 'step_number', type: 'int' })
  stepNumber: number;

  @Column({ type: 'text' })
  instruction: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe: RecipeType;
}
