import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreatePoints1615164521596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'points',
                columns: [
                  {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                 //   default: 'uuid_generate_v4()',
                  },

                  {
                    name: 'provider_id',
                    type: 'uuid',
                    isNullable: true,
                  },

                  {
                    name: 'date',
                    type: 'timestamp with time zone',
                  },


                  {
                    name: 'meter',
                    type: 'varchar',
                  },
        
                  {
                    name: 'image',
                    type: 'varchar',
                  },

                  {
                    name: 'latitude',
                    type: 'integer',
                  },

                  {
                    name: 'longitude',
                    type: 'integer',
                  },

                  {
                    name: 'city',
                    type: 'varchar',
                  },

                  {
                    name: 'uf',
                    type: 'varchar',
                  },

                  {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                  },
        
                  {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                  },

                ],
                foreignKeys: [
                  {
                    name: 'PointUser',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['provider_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                  },
                ],

              }),
            );
          }
  
               

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('points');
    }

}
