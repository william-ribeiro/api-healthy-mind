import { create } from './create';
import { filter } from './filter';
import { listAll } from './listAll';
import { remove } from './remove';
import { update } from './update';

export const sessions = { ...listAll, ...filter, ...create, ...update, ...remove };
