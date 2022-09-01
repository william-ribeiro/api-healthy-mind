import { signIn } from './signIn';
import { signUp } from './signUp';

export const users = { ...signIn, ...signUp };
