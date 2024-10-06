import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1728231702549 implements MigrationInterface {
    name = 'InitialMigration1728231702549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" ADD "recipe_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" ADD "ingredient_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD "recipe_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" ADD "ingredient_name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP COLUMN "ingredient_name"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredients" DROP COLUMN "recipe_name"`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" DROP COLUMN "ingredient_name"`);
        await queryRunner.query(`ALTER TABLE "steps" DROP COLUMN "recipe_name"`);
    }

}
