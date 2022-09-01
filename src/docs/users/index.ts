import { remove } from './remove';
import { signIn } from './signIn';
import { signUp } from './signUp';
import { update } from './update';

export const users = { ...signIn, ...signUp, ...update, ...remove };
