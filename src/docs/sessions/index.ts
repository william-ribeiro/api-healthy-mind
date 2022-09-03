import { remove } from './remove';
import { create } from './create';
import { update } from './update';
import { listAll } from './listAll';

export const sessions = { ...listAll, ...create, ...update, ...remove };
