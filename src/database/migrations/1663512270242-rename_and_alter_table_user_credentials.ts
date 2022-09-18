import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { DATABASE } from '../../constants';

export class renameAndAlterTableUserCredentials1663512270242 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(DATABASE.USER_CREDENTIALS, 'fk_user');

    await queryRunner.renameTable(DATABASE.USER_CREDENTIALS, DATABASE.CREDENTIALS);

    await queryRunner.renameColumn(DATABASE.CREDENTIALS, 'userId', 'ownerId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable(DATABASE.CREDENTIALS, DATABASE.USER_CREDENTIALS);

    await queryRunner.renameColumn(DATABASE.USER_CREDENTIALS, 'ownerId', 'userId');

    await queryRunner.createForeignKey(
      DATABASE.USER_CREDENTIALS,
      new TableForeignKey({
        name: 'fk_user',
        referencedTableName: DATABASE.USERS,
        referencedColumnNames: ['id'],
        columnNames: ['userId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
