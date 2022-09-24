import { MigrationInterface, QueryRunner } from 'typeorm';

import { DATABASE } from '@/constants';

export class createViewDashboard1663823044287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE VIEW "${DATABASE.VIEWS.DASHBOARD}" 
            AS
              SELECT
                u.id as "userId",
              (SELECT COUNT(id) from patients where "userId"=u.id and enabled=true) as "totalPatients",
              (SELECT COUNT(id) from sessions where "userId"=u.id and type ILIKE 'individual' and enabled=true) as "totalSessionsIndividual",
              (SELECT COUNT(id) from sessions where "userId"=u.id and type ILIKE 'dupla' and enabled=true) as "totalSessionsPair",
              (SELECT COUNT(id) from sessions where "userId"=u.id and type ILIKE 'grupo' and enabled=true) as "totalSessionsGroup",    
              (SELECT COUNT(id) from sessions where "userId"=u.id and status ILIKE 'agendada' and date("appointmentDate")=current_date and enabled=true) as "totalSessionsScheduledPerDay",
              (SELECT COUNT(id) from sessions where "userId"=u.id and status ILIKE 'agendada' 
               and DATE_PART('MONTH',"appointmentDate")=date_part('month',current_date) and enabled=true) as "totalSessionsScheduledPerMonth",
              (SELECT COUNT(id) from sessions where "userId"=u.id and status ILIKE 'cancelada' 
               and DATE_PART('MONTH',"appointmentDate")=date_part('month',current_date) and enabled=true) as "totalSessionsCanceledPerMonth"
              from users u
                where u.enabled=true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW ${DATABASE.VIEWS.DASHBOARD}`);
  }
}
