import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePointsUsers1615405779272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
              name: "points_users",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                },
                {
                  name: "provider_id",
                  type: "uuid",
                },
                {
                  name: "point_id",
                  type: "uuid",
                },
                {
                  name: "value",
                  type: "int",
                  isNullable: true,
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
              foreignKeys: [
                {
                  name: "FKUser",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["provider_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
                },
                {
                  name: "FKPoint",
                  referencedTableName: "points",
                  referencedColumnNames: ["id"],
                  columnNames: ["point_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
                },
              ],
            })
          );
        }
      

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("points_users");
    }

}






