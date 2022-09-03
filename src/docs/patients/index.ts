import { remove } from './remove';
import { create } from './create';
import { update } from './update';

export const patients = { ...create, ...update, ...remove };
