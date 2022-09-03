import { CreateAddressUseCase } from '../../../../../src/modules/address';
import { AddressRepositoryMock } from '../../../../mocks/address';

let createAddressUseCase: CreateAddressUseCase;
let addressRepositoryMock: AddressRepositoryMock;
let payload: any;

beforeEach(() => {
  payload = {
    postalCode: 'testing postalcode',
    street: 'testing street',
    number: 'testing number',
    details: 'testing details',
    district: 'testing centro',
    city: 'testing city',
    state: 'testing state',
    country: 'testing country',
  };

  addressRepositoryMock = new AddressRepositoryMock();
  createAddressUseCase = new CreateAddressUseCase(addressRepositoryMock);
});

describe('Testing createAddressUseCase', () => {
  //TO DO implementar o teste de authenticação

  it('must return created address when passed a valid payload', async () => {
    const createAddress = await createAddressUseCase.execute({
      ...payload,
    });

    const expectResponse = await addressRepositoryMock.getAddressById(createAddress.id);

    expect(createAddress).toEqual(expectResponse);
  });

  it('must return error when passed invalid payload', async () => {
    payload.street = '';

    try {
      return expect(
        await createAddressUseCase.execute({
          ...payload,
        }),
      ).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid street');
    }
  });
});
