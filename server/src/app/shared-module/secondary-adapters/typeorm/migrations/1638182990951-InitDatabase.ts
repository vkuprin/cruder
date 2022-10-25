import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1638182990951 implements MigrationInterface {
    name = 'InitDatabase1638182990951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_type_entity_permission_enum" AS ENUM('Admin', 'User')`);
        await queryRunner.query(`CREATE TABLE "user_type_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "permission" "user_type_entity_permission_enum" NOT NULL DEFAULT 'User', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2189a0545429a54633a74977b15" UNIQUE ("name"), CONSTRAINT "PK_856f8615b9c762791581903fbf5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invitation_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "accepted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "UQ_91d21596c3c83f50d89fed1740c" UNIQUE ("key"), CONSTRAINT "PK_e5ae23b2f2922f2ae65f10b3709" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "namePrefix" character varying NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "practishionalId" character varying, "password" character varying NOT NULL, "phoneNumber" character varying, "providerId" uuid, "active" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userTypeId" uuid NOT NULL, CONSTRAINT "UQ_fe5731c5352e68074f5a8d143d1" UNIQUE ("phoneNumber", "providerId"), CONSTRAINT "UQ_fef76b119317dee76c07e0e3567" UNIQUE ("email", "providerId"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "domainName" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "parentProviderId" character varying, "sentence" character varying, "url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_04e9e5fc8b84833772eb7ec664e" UNIQUE ("domainName"), CONSTRAINT "PK_ddb6a817b511ba57dd7e37b2fe9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" ADD CONSTRAINT "FK_d87712458657a11e7b90d9e9faa" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_01f6e7331fcf031b041cbad5d1b" FOREIGN KEY ("providerId") REFERENCES "provider_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_35b24fa746e9212e24d3a5d8d72" FOREIGN KEY ("userTypeId") REFERENCES "user_type_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_35b24fa746e9212e24d3a5d8d72"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_01f6e7331fcf031b041cbad5d1b"`);
        await queryRunner.query(`ALTER TABLE "invitation_entity" DROP CONSTRAINT "FK_d87712458657a11e7b90d9e9faa"`);
        await queryRunner.query(`DROP TABLE "provider_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "invitation_entity"`);
        await queryRunner.query(`DROP TABLE "user_type_entity"`);
        await queryRunner.query(`DROP TYPE "user_type_entity_permission_enum"`);
    }

}
