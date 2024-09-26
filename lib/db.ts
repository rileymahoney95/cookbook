'use server';

import prisma from './prisma'
import { Recipe } from '@/types';

export const getRecipesByUserId = async (userId: number) => {
  try {
    const recipes = await prisma.recipe_hdr.findMany({
      where: {
        author_id: userId,
      },
      include: {
        author: true,
        ingredients: true,
        steps: true,
      },
    });

    return recipes.map((recipe) => ({
      id: recipe.recipe_id,
      name: recipe.name,
      slug: recipe.slug,
      description: recipe.description,
      servings: recipe.servings,
      author: {
        id: recipe.author.user_id,
        name: recipe.author.name,
      },
      ingredients: recipe.ingredients.map((ingredient) => ({
        id: ingredient.ingredient_id,
        name: ingredient.name,
        quantity: ingredient.quantity,
        recipeId: ingredient.recipe_id,
      })),
      steps: recipe.steps.map((step) => ({
        stepNumber: step.step_number,
        description: step.description,
      })),
    }));
  } catch (error) {
    console.error('Error fetching recipes by user ID:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const saveRecipe = async (recipe: Recipe, userId: number) => {
  try {
    const author = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!author) {
      throw new Error('Author does not exist.');
    }

    const createdRecipe = await prisma.recipe_hdr.create({
      data: {
        name: recipe.name,
        slug: recipe.slug,
        description: recipe.description,
        servings: recipe.servings,
        author: {
          connect: { user_id: author.user_id },
        },
        ingredients: {
          create: recipe.ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            recipe_id: recipe.id,
          })),
        },
        steps: {
          create: recipe.steps.map((step) => ({
            recipe_id: recipe.id,
            step_number: step.stepNumber,
            description: step.description,
          })),
        },
        image_path: recipe.imagePath,
      },
    });
  } catch (error) {
    console.error('Error sharing recipe:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

