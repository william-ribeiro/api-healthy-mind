import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DATABASE } from '../../constants';

export class createTablePatientCredentials1663509838594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DATABASE.PATIENT_CREDENTIALS,
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
            name: 'patientId',
            type: 'varchar',
          },
          {
            name: 'accessToken',
            type: 'varchar',
          },
          {
            name: 'refreshToken',
            type: 'varchar',
          },
          {
            name: 'expiresIn',
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
    await queryRunner.dropTable(DATABASE.PATIENT_CREDENTIALS);
  }
}
