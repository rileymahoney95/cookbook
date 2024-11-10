import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import type { Recipe } from './types';
import { RecipeEntity } from './recipe.entity';

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.author)
  recipes: Recipe[];
}