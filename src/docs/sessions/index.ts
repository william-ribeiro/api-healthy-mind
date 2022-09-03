import { listAll } from './listAll';
import { remove } from './remove';
import { create } from './create';
import { update } from './update';

export const sessions = { ...listAll, ...create, ...update, ...remove };
