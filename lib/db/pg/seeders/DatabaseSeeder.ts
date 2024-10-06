import 'reflect-metadata';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RecipeEntity } from '../entities/recipe.entity';
import { IngredientEntity } from '../entities/ingredient.entity';
import { RecipeIngredientEntity } from '../entities/recipe-ingredients.entity';
import { StepEntity } from '../entities/step.entity';
import { NutritionalInfoEntity } from '../entities/nutritional-info.entity';

export default class DatabaseSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    // Repositories
    const userRepository = dataSource.getRepository(UserEntity);
    const recipeRepository = dataSource.getRepository(RecipeEntity);
    const ingredientRepository = dataSource.getRepository(IngredientEntity);
    const stepRepository = dataSource.getRepository(StepEntity);
    const recipeIngredientRepository = dataSource.getRepository(
      RecipeIngredientEntity
    );
    const nutritionalInfoRepository = dataSource.getRepository(
      NutritionalInfoEntity
    );

    // **Clear existing data**
    await recipeIngredientRepository.delete({});
    await stepRepository.delete({});
    await recipeRepository.delete({});
    await nutritionalInfoRepository.delete({});
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

    console.log('Creating Users...');
    await userRepository.save([user1, user2]);

    // **Create Ingredients**
    const flour = ingredientRepository.create({ name: 'Flour' });
    const sugar = ingredientRepository.create({ name: 'Sugar' });
    const eggs = ingredientRepository.create({ name: 'Eggs' });
    const milk = ingredientRepository.create({ name: 'Milk' });

    console.log('Creating Ingredients...');
    await ingredientRepository.save([flour, sugar, eggs, milk]);

    // **Create and Save Nutritional Info**
    console.log('Creating Nutritional Info...');

    const flourNutrition = nutritionalInfoRepository.create({
      ingredient: flour,
      ingredient_name: flour.name,
      serving_size: 100,
      uom: 'g',
      calories: 364,
      fat: 1,
      protein: 10,
      carbs: 76,
      sugar: 1,
    });

    const sugarNutrition = nutritionalInfoRepository.create({
      ingredient: sugar,
      ingredient_name: sugar.name,
      serving_size: 100,
      uom: 'g',
      calories: 387,
      fat: 0,
      protein: 0,
      carbs: 100,
      sugar: 100,
    });

    const eggsNutrition = nutritionalInfoRepository.create({
      ingredient: eggs,
      ingredient_name: eggs.name,
      serving_size: 50,
      uom: 'g',
      calories: 72,
      fat: 5,
      protein: 6,
      carbs: 0.4,
      sugar: 0.2,
    });

    const milkNutrition = nutritionalInfoRepository.create({
      ingredient: milk,
      ingredient_name: milk.name,
      serving_size: 244,
      uom: 'ml',
      calories: 149,
      fat: 8,
      protein: 8,
      carbs: 12,
      sugar: 12,
    });

    await nutritionalInfoRepository.save([
      flourNutrition,
      sugarNutrition,
      eggsNutrition,
      milkNutrition,
    ]);

    // **Recipes for User 1**
    const recipe1 = recipeRepository.create({
      name: 'Pancakes',
      description: 'Delicious fluffy pancakes.',
      slug: 'pancakes',
      image_key: 'pancakes_image_key',
      user: user1,
    });
    console.log('Creating Recipe 1...');
    await recipeRepository.save(recipe1);

    // **Steps for Recipe 1**
    const steps1 = [
      stepRepository.create({
        step_number: 1,
        instruction: 'Mix flour and sugar in a bowl.',
        recipe: recipe1,
        recipe_name: recipe1.name
      }),
      stepRepository.create({
        step_number: 2,
        instruction: 'Add eggs and milk, then stir until smooth.',
        recipe: recipe1,
        recipe_name: recipe1.name
      }),
    ];
    console.log('Creating Steps for Recipe 1...');
    await stepRepository.save(steps1);

    // **Recipe Ingredients for Recipe 1**
    const recipeIngredients1 = [
      recipeIngredientRepository.create({
        recipe: recipe1,
        ingredient: flour,
        quantity: 200,
        uom: 'grams',
        recipe_name: recipe1.name,
        ingredient_name: flour.name
      }),
      recipeIngredientRepository.create({
        recipe: recipe1,
        ingredient: sugar,
        quantity: 50,
        uom: 'grams',
        recipe_name: recipe1.name,
        ingredient_name: sugar.name
      }),
      recipeIngredientRepository.create({
        recipe: recipe1,
        ingredient: eggs,
        quantity: 2,
        uom: 'pieces',
        recipe_name: recipe1.name,
        ingredient_name: eggs.name
      }),
      recipeIngredientRepository.create({
        recipe: recipe1,
        ingredient: milk,
        quantity: 150,
        uom: 'ml',
        recipe_name: recipe1.name,
        ingredient_name: milk.name
      }),
    ];
    console.log('Creating Recipe Ingredients for Recipe 1...');
    await recipeIngredientRepository.save(recipeIngredients1);

    // **Recipes for User 2**
    const recipe2 = recipeRepository.create({
      name: 'Scrambled Eggs',
      description: 'Simple scrambled eggs.',
      slug: 'scrambled-eggs',
      image_key: 'scrambled_eggs_image_key',
      user: user2,
    });
    console.log('Creating Recipe 2...');
    await recipeRepository.save(recipe2);

    // **Steps for Recipe 2**
    const steps2 = [
      stepRepository.create({
        step_number: 1,
        instruction: 'Beat eggs and milk together.',
        recipe: recipe2,
        recipe_name: recipe2.name
      }),
      stepRepository.create({
        step_number: 2,
        instruction: 'Cook the mixture in a pan over medium heat.',
        recipe: recipe2,
        recipe_name: recipe2.name
      }),
    ];
    console.log('Creating Steps for Recipe 2...');
    await stepRepository.save(steps2);

    // **Recipe Ingredients for Recipe 2**
    const recipeIngredients2 = [
      recipeIngredientRepository.create({
        recipe: recipe2,
        ingredient: eggs,
        quantity: 3,
        uom: 'pieces',
        recipe_name: recipe2.name,
        ingredient_name: eggs.name
      }),
      recipeIngredientRepository.create({
        recipe: recipe2,
        ingredient: milk,
        quantity: 50,
        uom: 'ml',
        recipe_name: recipe2.name,
        ingredient_name: milk.name
      }),
    ];
    console.log('Creating Recipe Ingredients for Recipe 2...');
    await recipeIngredientRepository.save(recipeIngredients2);

    console.log('Seeding completed successfully!');
  }
}