// seed.ts

import 'reflect-metadata';
import { pgDatasource } from '../data-source';
import { UserEntity } from '../entities/user.entity';
import { RecipeEntity } from '../entities/recipe.entity';
import { IngredientEntity } from '../entities/ingredient.entity';
import { RecipeIngredientEntity } from '../entities/recipe-ingredients.entity';
import { StepEntity } from '../entities/step.entity';
import { NutritionalInfoEntity } from '../entities/nutritional-info.entity';

async function seedDatabase() {
  try {
    // Initialize the data source
    await pgDatasource.initialize();
    console.log('Data Source has been initialized!');

    // Repositories
    const userRepository = pgDatasource.getRepository(UserEntity);
    const recipeRepository = pgDatasource.getRepository(RecipeEntity);
    const ingredientRepository = pgDatasource.getRepository(IngredientEntity);
    const stepRepository = pgDatasource.getRepository(StepEntity);
    const recipeIngredientRepository = pgDatasource.getRepository(RecipeIngredientEntity);
    const nutritionalInfoRepository = pgDatasource.getRepository(NutritionalInfoEntity);

    // **Clear existing data**
    await recipeIngredientRepository.delete({});
    await stepRepository.delete({});
    await recipeRepository.delete({});
    await ingredientRepository.delete({});
    await userRepository.delete({});

    // **Create Users**
    const user1 = userRepository.create({
      name: 'Alice',
      email: 'alice@example.com',
    });

    const user2 = userRepository.create({
      name: 'Bob',
      email: 'bob@example.com',
    });

    await userRepository.save([user1, user2]);

    // **Create Ingredients**
    const flour = ingredientRepository.create({ name: 'Flour' });
    const sugar = ingredientRepository.create({ name: 'Sugar' });
    const eggs = ingredientRepository.create({ name: 'Eggs' });
    const milk = ingredientRepository.create({ name: 'Milk' });

    await ingredientRepository.save([flour, sugar, eggs, milk]);

    // **Add Nutritional Info for Ingredients**
    const flourNutrition = nutritionalInfoRepository.create({
      ingredient: flour,
      serving_size: 100,
      uom: 'g',
      calories: 364,
      fat: 1,
      protein: 10,
      carbs: 76,
      sugar: 1
    });

    const sugarNutrition = nutritionalInfoRepository.create({
      ingredient: sugar,
      serving_size: 100,
      uom: 'g',
      calories: 387,
      fat: 0,
      protein: 0,
      carbs: 100,
      sugar: 100
    });

    await nutritionalInfoRepository.save([flourNutrition, sugarNutrition]);

    // **Recipes for User 1**
    const recipe1 = recipeRepository.create({
      name: 'Pancakes',
      description: 'Delicious fluffy pancakes.',
      slug: 'pancakes',
      image_key: 'pancakes_image_key',
      user: user1,
    });
    await recipeRepository.save(recipe1);

    // **Steps for Recipe 1**
    const steps1 = [
      stepRepository.create({
        step_number: 1,
        instruction: 'Mix flour and sugar in a bowl.',
        recipe: recipe1,
      }),
      stepRepository.create({
        step_number: 2,
        instruction: 'Add eggs and milk, then stir until smooth.',
        recipe: recipe1,
      }),
    ];
    await stepRepository.save(steps1);

    // **Recipe Ingredients for Recipe 1**
    const recipeIngredients1 = [
      recipeIngredientRepository.create({
        recipe: recipe1,
        ingredient: flour,
        quantity: 200,
        uom: 'grams',
      }),
      recipeIngredientRepository.create({
        recipe: recipe1,
        ingredient: sugar,
        quantity: 50,
        uom: 'grams',
      }),
    ];
    await recipeIngredientRepository.save(recipeIngredients1);

    // **Recipes for User 2**
    const recipe2 = recipeRepository.create({
      name: 'Scrambled Eggs',
      description: 'Simple scrambled eggs.',
      slug: 'scrambled-eggs',
      image_key: 'scrambled_eggs_image_key',
      user: user2,
    });
    await recipeRepository.save(recipe2);

    // **Steps for Recipe 2**
    const steps2 = [
      stepRepository.create({
        step_number: 1,
        instruction: 'Beat eggs and milk together.',
        recipe: recipe2,
      }),
      stepRepository.create({
        step_number: 2,
        instruction: 'Cook the mixture in a pan over medium heat.',
        recipe: recipe2,
      }),
    ];
    await stepRepository.save(steps2);

    // **Recipe Ingredients for Recipe 2**
    const recipeIngredients2 = [
      recipeIngredientRepository.create({
        recipe: recipe2,
        ingredient: eggs,
        quantity: 3,
        uom: 'pieces',
      }),
      recipeIngredientRepository.create({
        recipe: recipe2,
        ingredient: milk,
        quantity: 50,
        uom: 'ml',
      }),
    ];
    await recipeIngredientRepository.save(recipeIngredients2);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seedDatabase();