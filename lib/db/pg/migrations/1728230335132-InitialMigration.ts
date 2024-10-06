import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1728230335132 implements MigrationInterface {
    name = 'InitialMigration1728230335132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "steps_recipe_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" DROP CONSTRAINT "nutritional_info_ingredient_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "recipe_ingredients_recipe_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "recipe_ingredients_ingredient_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "recipes_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "steps" RENAME COLUMN "recipe_id" TO "recipeId"`);
        await queryRunner.query(`ALTER TABLE "recipes" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" DROP COLUMN "ingredient_id"`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "nutritionalInfoId" integer`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "UQ_551625ca117ec3abe17b7e02794" UNIQUE ("nutritionalInfoId")`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD "recipeId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD "ingredientId" integer`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_551625ca117ec3abe17b7e02794" FOREIGN KEY ("nutritionalInfoId") REFERENCES "nutritional_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_2d7f407ae694e91bb3da1798c61" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "FK_05a2b62604dfd9840f4cda76a93" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_05a2b62604dfd9840f4cda76a93"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "FK_2d7f407ae694e91bb3da1798c61"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_551625ca117ec3abe17b7e02794"`);
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP COLUMN "ingredientId"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP COLUMN "recipeId"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "UQ_551625ca117ec3abe17b7e02794"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "nutritionalInfoId"`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" ADD "ingredient_id" integer`);
        await queryRunner.query(`ALTER TABLE "recipes" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "steps" RENAME COLUMN "recipeId" TO "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "recipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" ADD CONSTRAINT "nutritional_info_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
