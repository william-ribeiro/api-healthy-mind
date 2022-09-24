import { inject, injectable } from 'tsyringe';
import {
  IAddressRepository,
  IPatient,
  IPatientRepository,
  IUpdatePatient,
} from '../../../../interfaces';
import { Validators } from '../../../../shared';
import { makePasswordUpdate } from '../../../../utils';
import { CONTAINER } from './../../../../constants';
import { AppError } from './../../../../errors/AppError';
import { filterDefinedProperties, removeSpecialCharactersFromString } from '@/utils/helpers';

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

    let isUserLogged = true;
    const patient = await this.patientRepository
      .getPatientById(patientId, userId)
      .then(async (result) => {
        if (!result) {
          isUserLogged = false;

          return this.patientRepository.getLoginPatientById(userId);
        }
        return result;
      });

    if (!patient) throw new AppError('Patient not found', 404);

    if (!isUserLogged && patient?.isFirstLogin && !payload.password)
      throw new AppError('Password must be changed');

    const { email, document } = payload;

    if (payload?.address) {
      await this.addressrepository
        .update(patient.addressId, { ...payload.address })
        .then((result) => {
          payload.addressId = result.id;
          delete payload.address;
        })
        .catch(() => {
          throw new AppError('Address not created');
        });
    }

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

    if (!patient?.isFirstLogin) isUserLogged = false;

    const updatePatient = await this.patientRepository.update(patient.id, patient.userId, {
      ...payload_,
      isFirstLogin: isUserLogged,
    });

    delete updatePatient?.password;

    return updatePatient;
  }
}
