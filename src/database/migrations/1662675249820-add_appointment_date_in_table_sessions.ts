import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { DATABASE } from '../../constants';

export class addAppointmentDateInTableSessions1662675249820 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      DATABASE.SESSIONS,
      new TableColumn({
        name: 'appoitmentDate',
        type: 'timestamp',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(DATABASE.SESSIONS, 'appointmentDate');
  }
}
