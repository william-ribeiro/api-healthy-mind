import { create } from './create';
import { remove } from './remove';
import { update } from './update';

export const address = { ...create, ...update, ...remove };
