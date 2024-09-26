/*
  Warnings:

  - The primary key for the `recipe_hdr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `recipe_hdr` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipe_hdr" DROP CONSTRAINT "recipe_hdr_author_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipe_ingredient_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_step" DROP CONSTRAINT "recipe_step_recipe_id_fkey";

-- AlterTable
ALTER TABLE "recipe_hdr" DROP CONSTRAINT "recipe_hdr_pkey",
DROP COLUMN "id",
ADD COLUMN     "recipe_id" SERIAL NOT NULL,
ADD CONSTRAINT "recipe_hdr_pkey" PRIMARY KEY ("recipe_id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "recipe_hdr" ADD CONSTRAINT "recipe_hdr_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe_hdr"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_step" ADD CONSTRAINT "recipe_step_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe_hdr"("recipe_id") ON DELETE RESTRICT ON UPDATE CASCADE;
