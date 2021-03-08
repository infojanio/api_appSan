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
        name: 'PointType',
        referencedTableName: 'points',
        referencedColumnNames: ['id'],
        columnNames: ['point_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    


      {
        name: 'TypePoint',
        referencedTableName: 'types',
        referencedColumnNames: ['id'],
        columnNames: ['type_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    ],


    
  }),
);
}
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('point_types');
    }
}

