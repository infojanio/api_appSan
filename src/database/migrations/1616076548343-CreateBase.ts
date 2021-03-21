/*
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBase1616076548343 implements MigrationInterface {
    name = 'CreateBase1616076548343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP WITH TIME ZONE NOT NULL, "meter" character varying NOT NULL, "image" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" character varying NOT NULL, "uf" character varying NOT NULL, "status" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57a558e5e1e17668324b165dadf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "matricula" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "whatsapp" character varying NOT NULL, "avatar" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "types"`);
        await queryRunner.query(`DROP TABLE "points"`);
    }

}
*/
