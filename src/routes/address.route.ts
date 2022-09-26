import { Router } from 'express';

import { AUTH } from '@/middlewares';
import {
  CreateAddressController,
  RemoveAddressController,
  UpdateAddressController,
} from '@/modules/address';

export const addressRoutes = Router();

addressRoutes.post('/', AUTH.PROFESSIONAL, new CreateAddressController().handle);
addressRoutes.put('/update/:addressId', AUTH.PROFESSIONAL, new UpdateAddressController().handle);
addressRoutes.delete('/remove/:addressId', AUTH.PROFESSIONAL, new RemoveAddressController().handle);
