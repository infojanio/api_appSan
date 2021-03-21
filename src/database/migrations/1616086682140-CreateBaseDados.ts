import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBaseDados1616086682140 implements MigrationInterface {
    name = 'CreateBaseDados1616086682140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "matricula" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "whatsapp" character varying NOT NULL, "avatar" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "meter" character varying NOT NULL, "image" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" character varying NOT NULL, "uf" character varying NOT NULL, "status" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57a558e5e1e17668324b165dadf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "types_points_points" ("typesId" uuid NOT NULL, "pointsId" uuid NOT NULL, CONSTRAINT "PK_a3f1a5da613eb341384033d4f6e" PRIMARY KEY ("typesId", "pointsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6d39df0310797676c7eec3a4a0" ON "types_points_points" ("typesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_db0575ecc3460f532ac7cd21ca" ON "types_points_points" ("pointsId") `);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_b777120b2815c7a2c3e2cb1e350" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "types_points_points" ADD CONSTRAINT "FK_6d39df0310797676c7eec3a4a03" FOREIGN KEY ("typesId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "types_points_points" ADD CONSTRAINT "FK_db0575ecc3460f532ac7cd21ca7" FOREIGN KEY ("pointsId") REFERENCES "points"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "types_points_points" DROP CONSTRAINT "FK_db0575ecc3460f532ac7cd21ca7"`);
        await queryRunner.query(`ALTER TABLE "types_points_points" DROP CONSTRAINT "FK_6d39df0310797676c7eec3a4a03"`);
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_b777120b2815c7a2c3e2cb1e350"`);
        await queryRunner.query(`DROP INDEX "IDX_db0575ecc3460f532ac7cd21ca"`);
        await queryRunner.query(`DROP INDEX "IDX_6d39df0310797676c7eec3a4a0"`);
        await queryRunner.query(`DROP TABLE "types_points_points"`);
        await queryRunner.query(`DROP TABLE "types"`);
        await queryRunner.query(`DROP TABLE "points"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
