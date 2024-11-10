import { NextRequest, NextResponse } from 'next/server';
import { getDataSource, getAllRecipes } from '@/lib/db/pg/db';
import { RecipeEntity } from '@/lib/db/pg/entities/recipe.entity';
import { UserEntity } from '@/lib/db/pg/entities/user.entity';

import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const recipes = await getAllRecipes();

    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const dataSource = await getDataSource();
  const recipeRepository = dataSource.getRepository(RecipeEntity);
  const userRepository = dataSource.getRepository(UserEntity);

  try {
    const formData = await request.formData();
    
    const recipeName = formData.get('recipeName') as string;
    const description = formData.get('description') as string;
    const servings = parseInt(formData.get('servings') as string, 10);
    const ingredients = JSON.parse(formData.get('ingredients') as string);
    const steps = JSON.parse(formData.get('steps') as string);
    
    const imageFile = formData.get('image') as File | null;
    let imageKey: string | undefined;
    
    if (imageFile) {
      const imageFileName = `${uuidv4()}-${imageFile.name}`;
      const imagePath = join(process.cwd(), 'public', 'recipe-images', imageFileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(imagePath, buffer);
      imageKey = imageFileName;
    }

    const userId = 35;
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const recipe = new RecipeEntity();
    recipe.name = recipeName;
    recipe.description = description;
    recipe.image_key = imageKey;
    recipe.author = user;
    recipe.steps = steps;
    recipe.recipeIngredients = ingredients;
    recipe.servings = servings;

    await recipeRepository.save(recipe);

    return NextResponse.json({ message: 'Recipe saved successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving recipe' }, { status: 500 });
  }
}
