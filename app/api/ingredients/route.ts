import { NextResponse } from 'next/server';
import { getTopIngredients } from '@/lib/db/repository/ingredient-repository';

export async function GET() {
  try {
    const ingredients = await getTopIngredients();

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error('Failed to fetch ingredients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ingredients' },
      { status: 500 }
    );
  }
}
