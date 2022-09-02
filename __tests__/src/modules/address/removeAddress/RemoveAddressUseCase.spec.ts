import { IAddress } from '../../../../../src/interfaces';
import { RemoveAddressUseCase } from '../../../../../src/modules/address';
import { AddressRepositoryMock, fakeAddress } from '../../../../mocks/address';

let removeAddressUseCase: RemoveAddressUseCase;
let addressRepositoryMock: AddressRepositoryMock;
let payload: IAddress;

beforeEach(() => {
  payload = fakeAddress[0];

  addressRepositoryMock = new AddressRepositoryMock();
  removeAddressUseCase = new RemoveAddressUseCase(addressRepositoryMock);
});

describe('Testing removeAddressUseCase', () => {
  it('must removed address when passed a valid addressId', async () => {
    await removeAddressUseCase.execute(payload.id);

    const { enabled } = await addressRepositoryMock.getAddressById(payload.id);

    expect(enabled).toEqual(false);
  });

  it('must return error when passed invalid addressId', async () => {
    try {
      return expect(await addressRepositoryMock.getAddressById(99)).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Address not found');
    }
  });
});
