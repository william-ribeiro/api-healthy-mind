import { remove } from './remove';
import { create } from './create';
import { update } from './update';
import { listAll } from './listAll';

export const patients = { ...listAll, ...create, ...update, ...remove };
