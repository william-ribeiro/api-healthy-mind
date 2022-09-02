import { DATABASE } from './../../constants/index';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableSessions1661490620503 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DATABASE.SESSIONS,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'userId',
            type: 'varchar',
          },
          {
            name: 'patientId',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'duration',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'comments',
            type: 'varchar',
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_users',
            referencedTableName: DATABASE.USERS,
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_patients',
            referencedTableName: DATABASE.PATIENTS,
            referencedColumnNames: ['id'],
            columnNames: ['patientId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions');
  }
}
