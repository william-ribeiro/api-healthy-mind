import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { DATABASE } from '../../constants';

export class addMoreFieldInSessions1663431896980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(DATABASE.SESSIONS, [
      new TableColumn({
        name: 'resourceId',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'service',
        type: 'varchar',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      DATABASE.SESSIONS,
      new TableForeignKey({
        name: 'fk_resources',
        referencedTableName: DATABASE.RESOURCES,
        referencedColumnNames: ['id'],
        columnNames: ['resourceId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(DATABASE.SESSIONS, ['resourceId', 'service']);
  }
}
