import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { AppError } from '../../../../errors';
import { ICreatePatient, IPatient, IPatientRepository } from '../../../../interfaces';
import { Validators } from '../../../../shared';
import { parseName, removeSpecialCharactersFromString } from '../../../../utils';

@injectable()
export class CreatePatientUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
  ) {}

  async execute(payload: ICreatePatient): Promise<IPatient> {
    if (!Object.values(payload).length) throw new AppError('Invalid payload');
    try {
      await new Validators().patient.validate(payload, { abortEarly: true });
    } catch (err) {
      throw new AppError(err.errors[0]);
    }

    const { name, email, document } = payload;

    const patient = await this.patientRepository
      .getPatientByAttribute({ email: removeSpecialCharactersFromString(email) })
      .then(async (result) => {
        if (result) throw new AppError('Patient already exists', 409);

        return this.patientRepository.getPatientByAttribute({ document });
      });

    if (patient) throw new AppError('Patient already exists', 409);

    payload.name = parseName(name);
    payload.email = removeSpecialCharactersFromString(email);

    return this.patientRepository.create(payload);
  }
}
