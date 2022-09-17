import { create } from './create';
import { listAll } from './listAll';
import { remove } from './remove';
import { update } from './update';

export const resources = { ...listAll, ...create, ...update, ...remove };
