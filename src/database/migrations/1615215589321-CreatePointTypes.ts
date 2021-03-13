import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreatePointTypes1615215589321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'point_types',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
            //      default: 'uuid_generate_v4()',
                },

                {
                  name: 'provider_id',
                  type: 'uuid',
                  isNullable: false,
                },
        
                {
                    name: 'point_id',
                    type: 'uuid',
                    isNullable: true,
                  },


                  {
                    name: 'type_id',
                    type: 'uuid',
                    isNullable: true,
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
        name: 'FKUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['provider_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },

      {
        name: 'FKPoint',
        referencedTableName: 'points',
        referencedColumnNames: ['id'],
        columnNames: ['point_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
    
      {
        name: 'FKType',
        referencedTableName: 'types',
        referencedColumnNames: ['id'],
        columnNames: ['type_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      },
    ],


    
  }),
);
}
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('point_types');
    }
}

