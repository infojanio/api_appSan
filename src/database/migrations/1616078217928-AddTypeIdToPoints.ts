
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddTypeIdToPoints1616078217928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'points',
        new TableColumn({
          name: 'typeId',
          type: 'uuid',
          isNullable: true, // permite null, pois assim quando usuário excluir a conta seu historico continua salvo
        }),
      );
      // criação da chave estrangeira
      await queryRunner.createForeignKey(
        'points',
        new TableForeignKey({
          name: 'pointType',
          columnNames: ['typeId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'types',
          onDelete: 'NO ACTION', // Se o usuário for deletado, todos os agendamentos ficarão null
          onUpdate: 'NO ACTION', // Se o id do usuário for alterado, vai refletir em todos os relacionamentos, agendamentos
        }),
      );
    }


      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('points', 'pointType'); // desfaz a criação da chave estrangeira
        await queryRunner.dropColumn('points', 'typeId'); // desfaz a criação do provider_id
      }
  }

