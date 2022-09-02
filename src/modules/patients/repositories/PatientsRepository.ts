import moment from 'moment';
import { getRepository, Repository } from 'typeorm';
import {
  ICreatePatients,
  IPatient,
  IPatientsRepository,
  IUpdatePatients,
} from '../../../interfaces';
import { Patient } from '../entities';

export class PatientsRepository implements IPatientsRepository {
  private repository: Repository<IPatient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  async getPatientById(idPatient: string, idUser: string): Promise<IPatient> {
    return this.repository.findOne({ id: idPatient, userId: idUser });
  }

  async create(payload: ICreatePatients): Promise<IPatient> {
    const newPatient = this.repository.create(payload);
    return this.repository.save(newPatient);
  }

  async update(idPatient: string, idUser: string, payload: IUpdatePatients): Promise<IPatient> {
    const { raw: updatePatient } = await this.repository
      .createQueryBuilder()
      .update({ ...payload, updatedAt: moment() })
      .where('id=:id', { id: idPatient })
      .andWhere('userId=:userId', { userId: idUser })
      .returning('*')
      .execute();

    return updatePatient;
  }

  async remove(idPatient: string, idUser: string): Promise<void> {
    await this.update(idPatient, idUser, { enabled: false });
  }
}
