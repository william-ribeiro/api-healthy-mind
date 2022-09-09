import moment from 'moment';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { DATABASE } from '../../constants';

export class addAppointmentDateInTableSessions1662675249820 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      DATABASE.SESSIONS,
      new TableColumn({
        name: 'appointmentDate',
        type: 'timestamp',
        isNullable: true,
      }),
    );

    await queryRunner.query('select * from sessions').then((result) =>
      result.map(async ({ id, appointmentDate }) => {
        if (!appointmentDate)
          return queryRunner.query(
            `update sessions set "appointmentDate"='${moment().format()}' where id=${id}`,
          );
        return;
      }),
    );

    return queryRunner.query('ALTER TABLE sessions ALTER COLUMN "appointmentDate" SET NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(DATABASE.SESSIONS, 'appointmentDate');
  }
}
