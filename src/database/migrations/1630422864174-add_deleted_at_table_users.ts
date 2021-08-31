import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeletedAtTableUsers1630422864174 implements MigrationInterface {
    name = 'addDeletedAtTableUsers1630422864174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    }

}
