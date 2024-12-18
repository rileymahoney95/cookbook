'use server';

import { IngredientEntity } from '../pg/entities/ingredient.entity';
import { initializeDataSource } from '../pg/data-source';
import { DataSource } from 'typeorm/data-source/DataSource';
let datasource: DataSource;

export const getDataSource = async () => {
  if (!datasource) {
    datasource = await initializeDataSource();
  }
  return datasource;
};

export const getIngredients = async (): Promise<IngredientEntity[]> => {
  try {
    const pg = await getDataSource();
    const ingredients = await pg.getRepository(IngredientEntity).find();
    return ingredients;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch ingredients:', error.message);
    } else {
      console.error('An unknown error occurred while fetching ingredients');
    }
    throw new Error('Failed to fetch ingredients');
  }
};
