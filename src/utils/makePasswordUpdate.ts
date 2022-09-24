import { compare } from 'bcryptjs';
import { AppError } from '@/errors';
import { IUpdatePatient, IUpdateUser } from '@/interfaces';
import { Validators } from '@/shared';
import { generatePasswordHash } from './helpers';

export const makePasswordUpdate = async (
  payload: IUpdateUser | IUpdatePatient,
  originalPassword: string,
) => {
  const isPassword = Object.keys(payload).find((data) => {
    if (data === 'password') return data;
    return null;
  });

  if (!isPassword) return;

  const { password, newPassword, confirmPassword } = payload;

  const passwordMatch = await compare(password, originalPassword);

  if (!newPassword && !confirmPassword) throw new AppError('New password is required');

  if (!passwordMatch) throw new AppError('Invalid password');

  if (newPassword !== confirmPassword) throw new AppError('Password mismatch');

  try {
    await new Validators().updateUser.validate(payload, { abortEarly: false });
  } catch (err) {
    throw new AppError(err.errors[0]);
  }

  payload.password = await generatePasswordHash(newPassword);

  delete payload.confirmPassword;
  delete payload.newPassword;

  return payload;
};
