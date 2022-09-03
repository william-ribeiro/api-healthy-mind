import { IAddress } from '../../../../../src/interfaces';
import { UpdateAddressUseCase } from '../../../../../src/modules/address';
import { AddressRepositoryMock, fakeAddress } from '../../../../mocks/address';

let updateAddressUseCase: UpdateAddressUseCase;
let addressRepositoryMock: AddressRepositoryMock;
let payload: IAddress;

beforeEach(() => {
  payload = fakeAddress[0];

  addressRepositoryMock = new AddressRepositoryMock();
  updateAddressUseCase = new UpdateAddressUseCase(addressRepositoryMock);
});

describe('Testing updateAddressUseCase', () => {
  //TO DO implementar o teste de authenticação

  it('must return updated address when a passed valid payload', async () => {
    payload.street = 'Update Street';

    const updateAddress = await updateAddressUseCase.execute(payload.id, payload);

    const expectResponse = await addressRepositoryMock.getAddressById(fakeAddress[0].id);
    expect(updateAddress).toEqual(expectResponse);
  });

  it('must return update address error when payload empty', async () => {
    try {
      return expect(await updateAddressUseCase.execute(payload.id, {})).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Invalid payload');
    }
  });

  it('must return update address error when address not found', async () => {
    try {
      return expect(await updateAddressUseCase.execute(999, { ...payload })).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Address not found');
    }
  });
});
