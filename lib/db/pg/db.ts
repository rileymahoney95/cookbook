'use server';

import { pgDatasource } from './data-source';
import { RecipeEntity } from './entities/recipe.entity';

export const initializeDataSource = async () => {
  if (!pgDatasource.isInitialized) {
    try {
      await pgDatasource.initialize();
      console.log('Data Source has been initialized!');
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
      throw error;
    }
  }
};

export const getRecipesByUserId = async (userId: number): Promise<RecipeEntity[]> => {
  try {
    await initializeDataSource();

    const recipes = await pgDatasource.getRepository(RecipeEntity)
      .find({
        where: { user: { id: Number(userId) } },
        relations: ['user', 'steps', 'recipeIngredients', 'recipeIngredients.ingredient'],
      });

    return recipes;
  } catch (error) {
    console.error(`User id ${userId} not found:`, error);
    throw new Error('Failed to fetch recipes for user');
};

// export const saveRecipe = async (recipe: Recipe, userId: number) => {
//   try {
//     const author = await prisma.user.findUnique({
//       where: { user_id: userId },
//     });

//     if (!author) {
//       throw new Error('Author does not exist.');
//     }

//     const createdRecipe = await prisma.recipe_hdr.create({
//       data: {
//         name: recipe.name,
//         slug: slugify(recipe.name.toLowerCase()),
//         description: recipe.description,
//         servings: recipe.servings,
//         author: {
//           connect: { user_id: author.user_id },
//         },
//         ingredients: {
//           create: recipe.ingredients.map((ingredient) => ({
//             name: ingredient.name,
//             quantity: ingredient.quantity,
//             recipe_id: recipe.id,
//           })),
//         },
//         steps: {
//           create: recipe.steps.map((step) => ({
//             recipe_id: recipe.id,
//             step_number: step.stepNumber,
//             description: step.description,
//           })),
//         },
//         image_path: recipe.imagePath,
//       },
//     });
//   } catch (error) {
//     console.error('Error sharing recipe:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
};
