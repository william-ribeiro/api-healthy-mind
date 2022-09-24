import { Router } from 'express';

import {
  CreateAddressController,
  RemoveAddressController,
  UpdateAddressController,
} from '@/modules/address';

export const addressRoutes = Router();

addressRoutes.post('/', new CreateAddressController().handle);
addressRoutes.put('/update/:addressId', new UpdateAddressController().handle);
addressRoutes.delete('/remove/:addressId', new RemoveAddressController().handle);
