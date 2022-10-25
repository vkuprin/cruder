import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePractitoinerId1638830489469 implements MigrationInterface {
    name = 'ChangePractitoinerId1638830489469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "practishionalId" TO "practitionerId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" RENAME COLUMN "practitionerId" TO "practishionalId"`);
    }

}
