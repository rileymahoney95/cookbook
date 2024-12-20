// Forward declarations of entity types to break circular dependencies
export type Ingredient = {
  id: number;
  name: string;
  nutritionalInfo?: NutritionalInfo;
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
  ingredient: Ingredient;
  quantity: number;
  uom: string;
}

export type Recipe = {
  id: number;
  name: string;
  slug: string;
  description: string;
  servings: number;
  ingredients: RecipeIngredient[];
  steps: Step[];
  image_key?: string | null;
  image_url?: string | null;
  authorId: number;
  author: User;
}

export type User = {
  id: number;
  name: string;
  email: string;
}

export type Step = {
  id: number;
  recipeId: number;
  stepNumber: number;
  instruction: string;
} 