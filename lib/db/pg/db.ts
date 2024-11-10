'use server';

import { DataSource } from 'typeorm/data-source/DataSource';
import { pgDatasource } from './data-source';
import { RecipeEntity } from './entities/recipe.entity';

let datasource: DataSource;

export const getDataSource = async () => {
  if (!datasource) {
    datasource = await pgDatasource.initialize();
  }
  return datasource;
};

export const getAllRecipes = async (): Promise<RecipeEntity[]> => {
  try {
    const pg = await getDataSource();
    const recipes = await pg.getRepository(RecipeEntity).find({
      relations: {
        author: true,
        steps: true,
      },
    });
    return recipes;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch recipes:', error.message);
    } else {
      console.error('An unknown error occurred while fetching recipes');
    }
    throw new Error('Failed to fetch recipes');
  }
};

export const getRecipesByAuthorId = async (authorId: number): Promise<RecipeEntity[]> => {
  try {
    const pg = await getDataSource();
    const recipes = await pg.getRepository(RecipeEntity).find({ where: { authorId } });
    return recipes;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to fetch recipes for author ${authorId}:`, error.message);
    } else {
      console.error(`An unknown error occurred while fetching recipes for author ${authorId}`);
    }
    throw new Error('Failed to fetch recipes for author');
  }
};