import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableUserCredentials1661490328637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_credentials',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
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
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'access_token',
            type: 'varchar',
          },
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'expire_in',
            type: 'timestamp',
          },
          {
            name: 'isValid',
            type: 'boolean',
            default: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_credentials');
  }
}
