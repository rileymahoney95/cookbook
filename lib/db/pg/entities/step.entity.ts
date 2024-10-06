import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RecipeEntity } from './recipe.entity';

@Entity("steps")
export class StepEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, })
  recipe_name: string;

  @Column({ type: 'int' })
  step_number: number;

  @Column({ type: 'text' })
  instruction: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps)
  recipe: RecipeEntity;
}