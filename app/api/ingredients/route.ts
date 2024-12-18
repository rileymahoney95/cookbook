import { NextResponse } from 'next/server';
import { getIngredients } from '@/lib/db/repository/recipe-repository';

export async function GET() {
  try {
    const ingredients = await getIngredients();

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error('Failed to fetch ingredients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ingredients' },
      { status: 500 }
    );
  }
}
