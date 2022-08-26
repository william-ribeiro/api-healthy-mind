import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTablePatients1661489883008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'document',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'birth_date',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address_id',
            type: 'integer',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_address',
            referencedTableName: 'address',
            referencedColumnNames: ['id'],
            columnNames: ['address_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients');
  }
}
