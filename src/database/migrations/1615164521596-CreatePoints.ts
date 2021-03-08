import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePoints1615164521596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
