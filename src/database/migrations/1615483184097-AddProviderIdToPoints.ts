import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProviderIdToPoints1615483184097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'points',
            new TableColumn({
              name: 'provider_id',
              type: 'uuid',
              isNullable: true, // permite null, pois assim quando usuário excluir a conta seu historico continua salvo
            }),
          );
          // criação da chave estrangeira
          await queryRunner.createForeignKey(
            'points',
            new TableForeignKey({
              name: 'PointProvider',
              columnNames: ['provider_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'RESTRICT', // Se o usuário for deletado, os pontos não serão deletados
              onUpdate: 'RESTRICT', // Se o id do usuário for alterado, não vai refletir em todos os relacionamentos, poin
            }),
          );
        }
      
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('points', 'PointProvider'); // desfaz a criação da chave estrangeira
        await queryRunner.dropColumn('points', 'provider_id'); // desfaz a criação do provider_id
    }

}
