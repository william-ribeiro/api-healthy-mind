import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors';
import {
  IAddressRepository,
  IPatient,
  IPatientRepository,
  IUpdatePatient,
} from '../../../../interfaces';
import { Validators } from '../../../../shared';
import { makePasswordUpdate } from '../../../../utils';
import { CONTAINER } from './../../../../constants';
import {
  deletedPasswordResponse,
  filterDefinedProperties,
  removeSpecialCharactersFromString,
} from './../../../../utils/helpers';

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

    if (patient.isFirstLogin && !payload.password) throw new AppError('Password must be changed');

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

    const isUpdatePassword = await makePasswordUpdate(payload, patient.password);

    const payload_ = isUpdatePassword
      ? { ...filterDefinedProperties(isUpdatePassword) }
      : { ...filterDefinedProperties(payload) };

    const updatePatient = await this.patientRepository.update(patientId, userId, {
      ...payload_,
      isFirstLogin: false,
    });

    return deletedPasswordResponse(updatePatient)[0];
  }
}
