'use server';

import { DataSource } from 'typeorm/data-source/DataSource';
import { pgDatasource } from './data-source';
import { RecipeEntity } from './entities/recipe.entity';
import { Ingredient } from './entities/types';
import { IngredientEntity } from './entities/ingredient.entity';

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

export const getRecipesByAuthorId = async (
  authorId: number
): Promise<RecipeEntity[]> => {
  try {
    const pg = await getDataSource();
    const recipes = await pg
      .getRepository(RecipeEntity)
      .find({ where: { authorId } });
    return recipes;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Failed to fetch recipes for author ${authorId}:`,
        error.message
      );
    } else {
      console.error(
        `An unknown error occurred while fetching recipes for author ${authorId}`
      );
    }
    throw new Error('Failed to fetch recipes for author');
  }
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
