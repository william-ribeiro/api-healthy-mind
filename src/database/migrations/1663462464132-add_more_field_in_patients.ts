import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { DATABASE } from '../../constants';
import { generatePasswordHash } from '../../utils';

export class addMoreFieldInPatients1663462464132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(DATABASE.PATIENTS, [
      new TableColumn({
        name: 'roleId',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      DATABASE.PATIENTS,
      new TableForeignKey({
        name: 'fk_roles',
        referencedTableName: DATABASE.ROLES,
        referencedColumnNames: ['id'],
        columnNames: ['roleId'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.query(`
        UPDATE patients SET "roleId"=3 WHERE "roleId" IS NULL;
        ALTER TABLE patients ALTER COLUMN "roleId" SET NOT NULL;
        `);

    const passwordMigration = await generatePasswordHash(process.env.PASSWORD_MIGRATION);

    await queryRunner.query(
      `UPDATE patients SET password='${passwordMigration}' WHERE password IS NULL;
      ALTER TABLE patients ALTER COLUMN password SET NOT NULL;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(DATABASE.PATIENTS, ['roleId', 'password']);
  }
}
