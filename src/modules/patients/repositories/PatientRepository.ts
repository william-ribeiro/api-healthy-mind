import moment from 'moment';
import { getRepository, Raw, Repository } from 'typeorm';
import { DATABASE, PAGINATION, SELECT_FIELDS } from '../../../constants';
import {
  ICreatePatient,
  IGetPatientByAttribute,
  IPatient,
  IPatientRepository,
  IRemovePatient,
  IUpdatePatient,
} from '../../../interfaces';
import { Patient } from '../entities';

export class PatientRepository implements IPatientRepository {
  private repository: Repository<IPatient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  async getPatientById(patientId: string, userId: string): Promise<IPatient> {
    return this.repository.findOne({ id: patientId, userId, enabled: true });
  }

  async getLoginPatientById(patientId: string): Promise<IPatient> {
    return this.repository.findOne({ id: patientId, enabled: true });
  }

  async getPatientByAttribute(attribute: IGetPatientByAttribute): Promise<IPatient> {
    return this.repository.findOne({ ...attribute, enabled: true });
  }

  async filterPatients(userId: string, field: string, skip: number): Promise<[IPatient[], number]> {
    return this.repository
      .createQueryBuilder(DATABASE.PATIENTS)
      .leftJoinAndSelect(DATABASE.JOIN.PATIENT_ADDRESS, DATABASE.ALIAS.PATIENT)
      .select([
        DATABASE.PATIENTS,
        SELECT_FIELDS.PATIENT.POSTAL_CODE,
        SELECT_FIELDS.PATIENT.STREET,
        SELECT_FIELDS.PATIENT.NUMBER,
        SELECT_FIELDS.PATIENT.DETAILS,
        SELECT_FIELDS.PATIENT.DISTRICT,
        SELECT_FIELDS.PATIENT.CITY,
        SELECT_FIELDS.PATIENT.STATE,
        SELECT_FIELDS.PATIENT.COUNTRY,
      ])
      .where({
        name: Raw((alias) => `${alias} ILIKE '%${field.trim()}%'`),
        userId,
        enabled: true,
      })

      .orWhere({
        email: Raw((alias) => `${alias} ILIKE '%${field.trim()}%'`),
        userId,
        enabled: true,
      })

      .skip(skip)
      .take(PAGINATION.PER_PAGE)
      .getManyAndCount();
  }

  async getAllPatients(userId: string, skip: number): Promise<[IPatient[], number]> {
    return this.repository
      .createQueryBuilder(DATABASE.PATIENTS)
      .leftJoinAndSelect(DATABASE.JOIN.PATIENT_ADDRESS, DATABASE.ALIAS.PATIENT)
      .select([
        DATABASE.PATIENTS,
        SELECT_FIELDS.PATIENT.POSTAL_CODE,
        SELECT_FIELDS.PATIENT.STREET,
        SELECT_FIELDS.PATIENT.NUMBER,
        SELECT_FIELDS.PATIENT.DETAILS,
        SELECT_FIELDS.PATIENT.DISTRICT,
        SELECT_FIELDS.PATIENT.CITY,
        SELECT_FIELDS.PATIENT.STATE,
        SELECT_FIELDS.PATIENT.COUNTRY,
      ])
      .where('patients.userId=:userId', { userId })
      .andWhere('patients.enabled=:enabled', { enabled: true })
      .skip(skip)
      .take(PAGINATION.PER_PAGE)
      .getManyAndCount();
  }

  async create(payload: ICreatePatient): Promise<IPatient> {
    const newPatient = this.repository.create(payload);
    return this.repository.save(newPatient);
  }

  async update(patientId: string, userId: string, payload: IUpdatePatient): Promise<IPatient> {
    const { raw: updatePatient } = await this.repository
      .createQueryBuilder()
      .update({ ...payload, updatedAt: moment() })
      .where('id=:id', { id: patientId })
      .andWhere('userId=:userId', { userId })
      .returning('*')
      .execute();

    return updatePatient[0];
  }

  async remove(patientId: string, userId: string, payload: IRemovePatient): Promise<void> {
    await this.update(patientId, userId, { ...payload, enabled: false });
  }
}
