import { DataSource } from 'typeorm';
import { 
  UserEntity, 
  RecipeEntity, 
  IngredientEntity,
  StepEntity,
  RecipeIngredientEntity,
  NutritionalInfoEntity 
} from '../entities';

export const seed = async (dataSource: DataSource) => {
  // Clear existing data
  await dataSource.createQueryBuilder().delete().from(StepEntity).execute();
  await dataSource.createQueryBuilder().delete().from(RecipeIngredientEntity).execute();
  await dataSource.createQueryBuilder().delete().from(NutritionalInfoEntity).execute();
  await dataSource.createQueryBuilder().delete().from(RecipeEntity).execute();
  await dataSource.createQueryBuilder().delete().from(IngredientEntity).execute();
  await dataSource.createQueryBuilder().delete().from(UserEntity).execute();

  // Create user
  const userRepo = dataSource.getRepository(UserEntity);
  const user = await userRepo.save({
    name: 'John Doe',
    email: 'john@example.com',
  });

  // Create ingredients with nutritional info
  const ingredientRepo = dataSource.getRepository(IngredientEntity);
  const nutritionalInfoRepo = dataSource.getRepository(NutritionalInfoEntity);

  const ingredients = await Promise.all([
    ingredientRepo.save({ name: 'All-purpose flour' }),
    ingredientRepo.save({ name: 'Milk' }),
    ingredientRepo.save({ name: 'Egg' }),
    ingredientRepo.save({ name: 'Butter' }),
    ingredientRepo.save({ name: 'Salt' }),
    ingredientRepo.save({ name: 'Pepper' }),
  ]);

  // Create recipes
  const recipeRepo = dataSource.getRepository(RecipeEntity);
  const stepRepo = dataSource.getRepository(StepEntity);
  const recipeIngredientRepo = dataSource.getRepository(RecipeIngredientEntity);

  // Pancakes Recipe
  const pancakesRecipe = await recipeRepo.save({
    name: 'Classic Pancakes',
    slug: 'pancakes',
    description: 'Fluffy and delicious pancakes',
    servings: 4,
    authorId: user.id,
  });

  // Pancakes Steps
  await stepRepo.save([
    {
      recipeId: pancakesRecipe.id,
      stepNumber: 1,
      instruction: 'Mix flour, milk, and eggs in a large bowl until smooth',
    },
    {
      recipeId: pancakesRecipe.id,
      stepNumber: 2,
      instruction: 'Heat butter in a pan over medium heat',
    },
    {
      recipeId: pancakesRecipe.id,
      stepNumber: 3,
      instruction: 'Pour batter into pan and cook until bubbles form on surface',
    },
    {
      recipeId: pancakesRecipe.id,
      stepNumber: 4,
      instruction: 'Flip and cook other side until golden brown',
    },
  ]);

  // Pancakes Ingredients
  await recipeIngredientRepo.save([
    {
      recipeId: pancakesRecipe.id,
      ingredientId: ingredients[0].id, // flour
      quantity: 1.5,
      uom: 'cups',
    },
    {
      recipeId: pancakesRecipe.id,
      ingredientId: ingredients[1].id, // milk
      quantity: 1.25,
      uom: 'cups',
    },
    {
      recipeId: pancakesRecipe.id,
      ingredientId: ingredients[2].id, // egg
      quantity: 1,
      uom: 'unit',
    },
    {
      recipeId: pancakesRecipe.id,
      ingredientId: ingredients[3].id, // butter
      quantity: 3,
      uom: 'tablespoons',
    },
  ]);

  // Scrambled Eggs Recipe
  const scrambledEggsRecipe = await recipeRepo.save({
    name: 'Scrambled Eggs',
    slug: 'scrambled-eggs',
    description: 'Creamy scrambled eggs',
    servings: 2,
    authorId: user.id,
  });

  // Scrambled Eggs Steps
  await stepRepo.save([
    {
      recipeId: scrambledEggsRecipe.id,
      stepNumber: 1,
      instruction: 'Crack eggs into a bowl and whisk',
    },
    {
      recipeId: scrambledEggsRecipe.id,
      stepNumber: 2,
      instruction: 'Season with salt and pepper',
    },
    {
      recipeId: scrambledEggsRecipe.id,
      stepNumber: 3,
      instruction: 'Melt butter in pan over medium heat',
    },
    {
      recipeId: scrambledEggsRecipe.id,
      stepNumber: 4,
      instruction: 'Pour eggs and stir until cooked to desired consistency',
    },
  ]);

  // Scrambled Eggs Ingredients
  await recipeIngredientRepo.save([
    {
      recipeId: scrambledEggsRecipe.id,
      ingredientId: ingredients[2].id, // egg
      quantity: 4,
      uom: 'unit',
    },
    {
      recipeId: scrambledEggsRecipe.id,
      ingredientId: ingredients[3].id, // butter
      quantity: 1,
      uom: 'tablespoon',
    },
    {
      recipeId: scrambledEggsRecipe.id,
      ingredientId: ingredients[4].id, // salt
      quantity: 0.25,
      uom: 'teaspoon',
    },
    {
      recipeId: scrambledEggsRecipe.id,
      ingredientId: ingredients[5].id, // pepper
      quantity: 0.25,
      uom: 'teaspoon',
    },
  ]);

  console.log('Seed data inserted successfully!');
}; 