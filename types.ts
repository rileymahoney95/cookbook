export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface Recipe {
  id?: number;
  name: string;
  slug: string;
  description: string;
  servings: number;
  author: User;
  ingredients: Ingredient[];
  steps: Step[];
  imageBuffer?: ArrayBuffer;
  imagePath?: string;
}

export interface Ingredient {
  name: string;
  quantity?: string | null;
}

export interface Step {
  stepNumber: number;
  description: string;
}

export type Maybe<T> = T | null | undefined;
export type Nullable<T> = T | null;