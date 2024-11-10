// Forward declarations of entity types to break circular dependencies
export type Ingredient = {
  id: number;
  name: string;
  recipeIngredients: RecipeIngredient[];
  nutritionalInfo: NutritionalInfo;
}

export type NutritionalInfo = {
  id: number;
  ingredientId: number;
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  ingredient: Ingredient;
}

export type RecipeIngredient = {
  recipeId: number;
  ingredientId: number;
  quantity: number;
  uom: string;
  recipe: Recipe;
  ingredient: Ingredient;
}

export type Recipe = {
  id: number;
  name: string;
  slug: string;
  description: string;
  servings: number;
  image_key?: string;
  authorId: number;
  author: User;
  steps: Step[];
  recipeIngredients: RecipeIngredient[];
}

export type User = {
  id: number;
  name: string;
  email: string;
  recipes: Recipe[];
}

export type Step = {
  id: number;
  recipeId: number;
  stepNumber: number;
  instruction: string;
  recipe: Recipe;
} 