/*
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddUserIdToPoints1616076699413 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'points',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        isNullable: true, // permite null, pois assim quando usuário excluir a conta seu historico continua salvo
      }),
    );
    // criação da chave estrangeira
    await queryRunner.createForeignKey(
      'points',
      new TableForeignKey({
        name: 'pointUser',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION', // Se o usuário for deletado, todos os agendamentos ficarão null
        onUpdate: 'NO ACTION', // Se o id do usuário for alterado, vai refletir em todos os relacionamentos, agendamentos
      }),
    );
  }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('points', 'pointUser'); // desfaz a criação da chave estrangeira
      await queryRunner.dropColumn('points', 'userId'); // desfaz a criação do provider_id
    }
}
*/
