import { create } from './create';
import { filter } from './filter';
import { listAll } from './listAll';
import { remove } from './remove';
import { update } from './update';

export const patients = { ...listAll, ...filter, ...create, ...update, ...remove };
