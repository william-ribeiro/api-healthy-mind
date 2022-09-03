import { inject, injectable } from 'tsyringe';
import {
  IAddressRepository,
  IPatient,
  IPatientRepository,
  IUpdatePatient,
} from '../../../../interfaces';
import {
  filterDefinedProperties,
  removeSpecialCharactersFromString,
} from './../../../../utils/helpers';
import { CONTAINER } from './../../../../constants';
import { AppError } from '../../../../errors';
import { Validators } from '../../../../shared';

@injectable()
export class UpdatePatientUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
    @inject(CONTAINER.ADDRESS_REPOSITORY)
    private addressrepository: IAddressRepository,
  ) {}

  async execute(patientId: string, userId: string, payload: IUpdatePatient): Promise<IPatient> {
    if (!Object.values(payload).length || !patientId) throw new AppError('Invalid payload');
    const patient = await this.patientRepository.getPatientById(patientId, userId);

    if (!patient) throw new AppError('Patient not found', 404);

    const { addressId, email, document } = payload;

    if (addressId)
      await this.addressrepository.getAddressById(addressId).then((result) => {
        if (!result) throw new AppError('Address not found', 404);
      });

    if (email && email !== patient.email) {
      try {
        await new Validators().email.validate(removeSpecialCharactersFromString(email), {
          abortEarly: true,
        });
        payload.email = removeSpecialCharactersFromString(email);
      } catch (err) {
        throw new AppError(err.errors[0]);
      }

      await this.patientRepository
        .getPatientByAttribute({ email: payload.email })
        .then((result) => {
          if (result) throw new AppError('Email in use', 409);
        });
    }

    if (document && document !== patient.document)
      await this.patientRepository.getPatientByAttribute({ document }).then((result) => {
        if (result) throw new AppError('Patient already exists', 409);
      });

    return this.patientRepository.update(patientId, userId, {
      ...filterDefinedProperties(payload),
    });
  }
}
