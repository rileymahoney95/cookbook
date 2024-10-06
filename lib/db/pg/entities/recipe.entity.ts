import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { RecipeIngredientEntity } from './recipe-ingredients.entity';
import { StepEntity } from './step.entity';

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

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_key: string;

  @ManyToOne(() => UserEntity, (user) => user.recipes)
  user: UserEntity;

  @OneToMany(() => StepEntity, (step) => step.recipe, { cascade: true })
  steps: StepEntity[];

  @OneToMany(() => RecipeIngredientEntity, (recipeIngredient) => recipeIngredient.recipe)
  recipeIngredients: RecipeIngredientEntity[];
}