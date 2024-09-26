/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_recipeId_fkey";

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "Recipe";

-- DropTable
DROP TABLE "Step";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_hdr" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "crt_ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipe_hdr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ingredient" (
    "ingredient_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" TEXT,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "recipe_ingredient_pkey" PRIMARY KEY ("ingredient_id")
);

-- CreateTable
CREATE TABLE "recipe_step" (
    "step_number" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "recipe_step_pkey" PRIMARY KEY ("recipe_id","step_number")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_hdr_name_key" ON "recipe_hdr"("name");

-- AddForeignKey
ALTER TABLE "recipe_hdr" ADD CONSTRAINT "recipe_hdr_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe_hdr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_step" ADD CONSTRAINT "recipe_step_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe_hdr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
