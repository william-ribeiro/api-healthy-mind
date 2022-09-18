import { AppError } from '../errors';
import { IUpdateUser } from '../interfaces';
import { Validators } from '../shared';
import { generatePasswordHash } from './helpers';

export const makePasswordUpdate = async (payload: IUpdateUser) => {
  const isPassword = Object.keys(payload).find((data) => {
    if (data === 'password') return data;
    return null;
  });

  if (!isPassword) return;

  const { password, confirmPassword } = payload;

  if (password !== confirmPassword) throw new AppError('Password mismatch');

  try {
    await new Validators().updateUser.validate(payload, { abortEarly: false });
  } catch (err) {
    throw new AppError(err.errors[0]);
  }

  payload.password = await generatePasswordHash(password);

  delete payload.confirmPassword;

  return payload;
};
