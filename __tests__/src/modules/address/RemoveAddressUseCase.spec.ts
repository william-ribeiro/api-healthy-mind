import { IAddress } from '@/interfaces';
import { RemoveAddressUseCase } from '@/modules/address';
import { AddressRepositoryMock, fakeAddress } from '../../../mocks';

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

    expect(await addressRepositoryMock.getAddressById(payload.id)).toBeUndefined();
  });

  it('must return error when passed invalid addressId', async () => {
    try {
      return expect(await removeAddressUseCase.execute(999)).toBeUndefined();
    } catch (err) {
      return expect(err.message).toBe('Address not found');
    }
  });
});
