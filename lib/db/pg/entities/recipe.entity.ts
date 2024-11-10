import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import type { User, Step, RecipeIngredient } from './types';
import { UserEntity } from './user.entity';
import { StepEntity } from './step.entity';
import { RecipeIngredientEntity } from './recipe-ingredients.entity';

@Entity("recipes")
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int' })
  servings: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_key?: string;

  @Column({ name: 'author_id' })
  authorId: number;

  @ManyToOne(() => UserEntity, (user) => user.recipes, {
    eager: true
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => StepEntity, (step) => step.recipe, {
    cascade: true,
    eager: true
  })
  steps: Step[];

  @OneToMany(() => RecipeIngredientEntity, (recipeIngredient) => recipeIngredient.recipe, {
    cascade: true
  })
  recipeIngredients: RecipeIngredient[];
}