import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1731280543896 implements MigrationInterface {
    name = 'InitialMigration1731280543896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_afd4f74f8df44df574253a7f37b"`);
        await queryRunner.query(`ALTER TABLE "recipes" RENAME COLUMN "authorId" TO "author_id"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_266ecb7f0041e1327919f36f964" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_266ecb7f0041e1327919f36f964"`);
        await queryRunner.query(`ALTER TABLE "recipes" RENAME COLUMN "author_id" TO "authorId"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_afd4f74f8df44df574253a7f37b" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
