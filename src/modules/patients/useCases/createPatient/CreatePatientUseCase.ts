import { inject, injectable } from 'tsyringe';

import { CONTAINER, ROLE_IDS } from '@/constants';
import { AppError } from '@/errors';
import { IAddressRepository, ICreatePatient, IPatient, IPatientRepository } from '@/interfaces';
import { sendMail, Validators } from '@/shared';
import {
  generatedPassword,
  generatePasswordHash,
  parseName,
  payloadValidate,
  removeSpecialCharactersFromString,
} from '@/utils/helpers';

@injectable()
export class CreatePatientUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
    @inject(CONTAINER.ADDRESS_REPOSITORY)
    private addressRepository: IAddressRepository,
  ) {}

  async execute(payload: ICreatePatient): Promise<IPatient> {
    const addressPayload = payload.address;

    if (payload.address) delete payload.address;

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

    const { name, email, document } = payload;

    const patient = await this.patientRepository
      .getPatientByAttribute({ email: removeSpecialCharactersFromString(email) })
      .then(async (result) => {
        if (result) throw new AppError('Patient already exists', 409);

        return this.patientRepository.getPatientByAttribute({ document });
      });

    if (patient) throw new AppError('Patient already exists', 409);

    try {
      await new Validators().address.validate(addressPayload, { abortEarly: true });
    } catch (err) {
      throw new AppError(err.errors[0]);
    }

    const { id: addressId } = await this.addressRepository.create(addressPayload);

    if (!addressId) throw new AppError('Address not created', 400);

    payload.name = parseName(name);
    payload.email = removeSpecialCharactersFromString(email);

    const patient_ = await this.patientRepository.create({ ...payload, addressId });

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      if (patient_.isFirstLogin) {
        await sendMail('teste', {
          code: +password,
          name: patient_.name.split(' ')[0],
          email: patient_.email,
        });
      }
    }

    delete patient_.password;
    patient_.password = password;

    return patient_;
  }
}
