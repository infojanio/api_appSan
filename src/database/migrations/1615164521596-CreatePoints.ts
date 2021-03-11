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
                    default: 'uuid_generate_v4()',
                  },

             

                                     
                  /*
                  {
                    name: 'type_id',
                    type: 'uuid',
                    isNullable: false,
                  },
                  */

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
                    name: "latitude",
                    type: "float",
                    isNullable: true,
                  },

                  {
                    name: "longitude",
                    type: "float",
                    isNullable: true,
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
           

              }),
            );
          } 
               
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('points');
    }

}
