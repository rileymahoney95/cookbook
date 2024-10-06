import { NextResponse } from 'next/server';
import { initializeDataSource } from '@/lib/db/pg/db';
import { pgDatasource } from '@/lib/db/pg/data-source';
import { RecipeEntity } from '@/lib/db/pg/entities/recipe.entity';

export async function GET() {
  try {
    await initializeDataSource();
    const recipeRepository = pgDatasource.getRepository(RecipeEntity);
    const recipes = await recipeRepository.find();

    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}
