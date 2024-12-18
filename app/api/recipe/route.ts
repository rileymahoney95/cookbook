import { NextRequest, NextResponse } from 'next/server';
import {
  getDataSource,
  getAllRecipes,
} from '@/lib/db/repository/recipe-repository';
import { RecipeEntity } from '@/lib/db/pg/entities/recipe.entity';
import { UserEntity } from '@/lib/db/pg/entities/user.entity';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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
      imageKey = `recipe-images/${uuidv4()}-${imageFile.name}`;

      // Upload to S3
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey,
          Body: buffer,
          ContentType: imageFile.type,
        })
      );
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

    return NextResponse.json(
      { message: 'Recipe saved successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving recipe' }, { status: 500 });
  }
}
