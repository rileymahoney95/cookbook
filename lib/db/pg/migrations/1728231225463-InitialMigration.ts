import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1728231225463 implements MigrationInterface {
    name = 'InitialMigration1728231225463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nutritional_info" ADD "ingredient_id" integer`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" ADD CONSTRAINT "UQ_d80c20e1c0dd5e163c1223871b9" UNIQUE ("ingredient_id")`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" ADD CONSTRAINT "FK_d80c20e1c0dd5e163c1223871b9" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nutritional_info" DROP CONSTRAINT "FK_d80c20e1c0dd5e163c1223871b9"`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" DROP CONSTRAINT "UQ_d80c20e1c0dd5e163c1223871b9"`);
        await queryRunner.query(`ALTER TABLE "nutritional_info" DROP COLUMN "ingredient_id"`);
    }

}
