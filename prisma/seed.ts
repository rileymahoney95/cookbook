import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.create({
    data: {
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish.',
      ingredients: 'Spaghetti, ground beef, tomato sauce, onions, garlic',
      instructions: 'Cook spaghetti. Prepare sauce. Combine and serve.',
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());