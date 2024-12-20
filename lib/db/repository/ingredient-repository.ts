'use server';

import { IngredientEntity } from '../pg/entities/ingredient.entity';
import { initializeDataSource } from '../pg/data-source';
import { DataSource } from 'typeorm/data-source/DataSource';
import { Ingredient } from '@/lib/types/recipe';
let datasource: DataSource;

export const getDataSource = async () => {
  if (!datasource) {
    datasource = await initializeDataSource();
  }
  return datasource;
};

const TOP_INGREDIENTS_LIMIT = 10;

export const getTopIngredients = async (): Promise<Ingredient[]> => {
  try {
    const pg = await getDataSource();
    const ingredients = await pg
      .getRepository(IngredientEntity)
      .createQueryBuilder('ingredient')
      .leftJoin('ingredient.recipeIngredients', 'recipeIngredients')
      .select(['ingredient', 'COUNT(recipeIngredients.ingredientId) as count'])
      .groupBy('ingredient.id')
      .orderBy('count', 'DESC')
      .limit(TOP_INGREDIENTS_LIMIT)
      .getRawMany();
    
    return ingredients.map(ingredient => ({
      id: ingredient.ingredient_id,
      name: ingredient.ingredient_name
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch ingredients:', error.message);
    } else {
      console.error('An unknown error occurred while fetching ingredients');
    }
    throw new Error('Failed to fetch ingredients');
  }
};
