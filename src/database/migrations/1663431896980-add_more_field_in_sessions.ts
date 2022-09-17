import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(DATABASE.SESSIONS, ['resourceId', 'service']);
  }
}
