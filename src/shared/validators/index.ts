import * as yup from 'yup';

export class Validators {
  user = yup.object().shape({
    name: yup.string().required('Invalid name'),
    email: yup.string().email('Invalid email').required(),
    password: yup.string().required('Invalid password').min(6, 'Minimum 6 characters'),
  });
  updateUser = yup.object().shape({
    password: yup.string().min(6, 'Minimum 6 characters'),
  });
  email = yup.string().email('Invalid email');
}
