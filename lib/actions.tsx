'use server';

import fs from 'node:fs';
import { redirect } from 'next/navigation';
import { saveRecipe } from './db';
import { revalidatePath } from 'next/cache';
import { Recipe, User } from '@/types';

export const shareRecipe = async (
  prevState: {
    message: string;
  },
  formData: FormData
) => {
  console.log('<><><><><><>IN SHARE RECIPE ACTION<><><><><><><>')
  // try {
  //   if (!user || !user.id) {
  //     throw new Error('Invalid user, cannot save recipe.');
  //   }
  //   const userId = user.id;

  //   if (!recipe.imageBuffer || !recipe.imagePath) {
  //     throw new Error('Failed to share recipe due to invalid image');
  //   }

  //   const stream = fs.createWriteStream(
  //     `public/recipe-images/${recipe.imagePath}`
  //   );
  //   stream.write(Buffer.from(recipe.imageBuffer), (err) => {
  //     if (err) {
  //       throw new Error('Saving image failed!');
  //     }
  //   });

  //   await saveRecipe(recipe, userId);

  //   revalidatePath('/recipes');
  //   // redirect('/recipes');
  // } catch (error) {
  //   console.error('Error sharing recipe:', error);
  //   throw new Error('Failed to share recipe.');
  // }
};
