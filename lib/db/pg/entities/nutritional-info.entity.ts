import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne } from 'typeorm';
import { IngredientEntity } from './ingredient.entity';

@Entity('nutritional_info')
export class NutritionalInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => IngredientEntity, (ingredient) => ingredient.nutritionalInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: IngredientEntity;

  @Column({ type: 'varchar', length: 255, })
  ingredient_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  serving_size: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  uom: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  calories: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  protein: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  carbs: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  sugar: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  sodium: number;
}