import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddTypeIdToPoints1615483737357 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'points',
            new TableColumn({
              name: 'type_id',
              type: 'uuid',
              isNullable: true, // permite null, pois assim quando usuário excluir a conta seu historico continua salvo
            }),
          );
          // criação da chave estrangeira
          await queryRunner.createForeignKey(
            'points',
            new TableForeignKey({
              name: 'PointType',
              columnNames: ['type_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'types',
              onDelete: 'RESTRICT', // Se o usuário for deletado, os pontos não serão deletados
              onUpdate: 'RESTRICT', // Se o id do usuário for alterado, não vai refletir em todos os relacionamentos, poin
            
            }),
          );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('points', 'PointType'); // desfaz a criação da chave estrangeira
        await queryRunner.dropColumn('points', 'type_id'); // desfaz a criação do provider_id
    }
    }


