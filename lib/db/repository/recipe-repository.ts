'use server';

import { DataSource } from 'typeorm/data-source/DataSource';
import { initializeDataSource } from '../pg/data-source';
import { RecipeEntity } from '../pg/entities/recipe.entity';
import { Recipe } from '../../types/recipe';
import { mapEntityToType } from '@/lib/mappers/recipe-mapper';

let datasource: DataSource;

export const getDataSource = async () => {
  if (!datasource) {
    datasource = await initializeDataSource();
  }
  return datasource;
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  try {
    const pg = await getDataSource();
    const recipe = await pg.getRepository(RecipeEntity).findOne({
      where: { id },
      relations: {
        author: true,
        steps: true,
        recipeIngredients: {
          ingredient: {
            nutritionalInfo: true,
          },
        },
      }
    });
    
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    
    return mapEntityToType(recipe);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch recipe:', error.message);
    } else {
      console.error('An unknown error occurred while fetching recipe', error);
    }
    throw new Error(`Failed to fetch recipe ${id}`);
  }
};  

export const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const pg = await getDataSource();
    const recipes = await pg.getRepository(RecipeEntity).find({
      relations: {
        author: true,
        steps: true,
        recipeIngredients: {
          ingredient: {
            nutritionalInfo: true,
          },
        },
      },
      order: {
        id: 'DESC'
      }
    });
    
    return recipes.map(recipe => mapEntityToType(recipe));
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