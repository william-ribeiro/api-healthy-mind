import moment from 'moment';
import { getRepository, Repository } from 'typeorm';
import { PAGINATION } from '../../../constants';
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

  async getPatientByAttribute(attribute: IGetPatientByAttribute): Promise<IPatient> {
    return this.repository.findOne({ ...attribute, enabled: true });
  }

  async getAllPatients(userId: string, skip: number): Promise<[IPatient[], number]> {
    return this.repository
      .createQueryBuilder()
      .where('"userId"=:userId', { userId, enabled: true })
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

    return updatePatient;
  }

  async remove(patientId: string, userId: string, payload: IRemovePatient): Promise<void> {
    await this.update(patientId, userId, { ...payload, enabled: false });
  }
}
