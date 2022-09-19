import { inject, injectable } from 'tsyringe';
import { CONTAINER, ROLE_IDS } from '../../../../constants';
import { AppError } from '../../../../errors';
import {
  IAddressRepository,
  ICreatePatient,
  IPatient,
  IPatientRepository,
} from '../../../../interfaces';
import { Validators } from '../../../../shared';
import { parseName, payloadValidate, removeSpecialCharactersFromString } from '../../../../utils';
import { generatedPassword, generatePasswordHash } from './../../../../utils/helpers';

@injectable()
export class CreatePatientUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
    @inject(CONTAINER.ADDRESS_REPOSITORY)
    private addressRepository: IAddressRepository,
  ) {}

  async execute(payload: ICreatePatient): Promise<IPatient> {
    payloadValidate(payload);

    const password = generatedPassword();
    payload.password = await generatePasswordHash(password);
    console.log({ password });

    payload.roleId = ROLE_IDS.PATIENT;

    try {
      await new Validators().patient.validate(payload, { abortEarly: true });
    } catch (err) {
      throw new AppError(err.errors[0]);
    }

    const address = await this.addressRepository.getAddressById(payload.addressId);

    if (!address) throw new AppError('Address not found', 404);

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
