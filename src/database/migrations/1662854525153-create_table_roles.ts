import { DATABASE } from './../../constants';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableRoles1662854525153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DATABASE.ROLES,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
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
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true,
          },
        ],
      }),
    );

    return queryRunner.query(
      `INSERT INTO ${DATABASE.ROLES} (name) VALUES 
          ('Admin'),
          ('Professional'),
          ('Patient')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DATABASE.ROLES);
  }
}
