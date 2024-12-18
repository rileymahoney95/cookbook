import { RecipeEntity } from '../db/pg/entities/recipe.entity';
import { Recipe } from '../types/recipe';

export const mapEntityToType = (entity: RecipeEntity): Recipe => {
  return {
    id: entity.id,
    name: entity.name,
    slug: entity.slug,
    description: entity.description,
    servings: entity.servings,
    ingredients: entity.recipeIngredients.map(ri => ({
      ingredient: {
        id: ri.ingredient.id,
        name: ri.ingredient.name,
        nutritionalInfo: ri.ingredient.nutritionalInfo && {
          id: ri.ingredient.nutritionalInfo.id,
          calories: ri.ingredient.nutritionalInfo.calories || 0,
          protein: ri.ingredient.nutritionalInfo.protein || 0,
          carbohydrates: ri.ingredient.nutritionalInfo.carbohydrates || 0,
          fat: ri.ingredient.nutritionalInfo.fat || 0,
          ingredientId: ri.ingredient.id,
          ingredient: ri.ingredient
        }
      },
      quantity: Number(ri.quantity),
      uom: ri.uom
    })),
    steps: entity.steps.map(step => ({
      id: step.id,
      recipeId: step.recipeId,
      stepNumber: step.stepNumber,
      instruction: step.instruction
    })),
    image_key: entity.image_key || null,
    authorId: entity.authorId,
    author: {
      id: entity.author.id,
      name: entity.author.name,
      email: entity.author.email,
    },
  };
};
