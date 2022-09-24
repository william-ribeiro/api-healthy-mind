import { MigrationInterface, QueryRunner } from 'typeorm';

import { DATABASE } from '@/constants';

export class createViewClinicalHistory1663730086638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE VIEW "${DATABASE.VIEWS.CLINICAL_HISTORY}" AS 
          SELECT 
            s.id,
            s.status,
            s.subject,
            s."patientId",
            s."userId",
            s.type,
            s.enabled,
            s.duration,
            s."appointmentDate",
            s.service,
            s."createdAt",
            s."updatedAt",
            r.category AS "resourceCategory",
            r.title AS "resourceTitle",
            r.description AS "resourceDescription",        
            p.name AS "patientName",
            u.name AS "userName"
          FROM sessions s 
            INNER JOIN patients p ON p.id = s."patientId"
            INNER JOIN users u ON u.id = s."userId"
            INNER JOIN resources r ON r.id = s."resourceId"
        WHERE s.status='closed'
        ORDER BY s."createdAt" DESC;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW ${DATABASE.VIEWS.CLINICAL_HISTORY}`);
  }
}
