import * as yup from 'yup';

export class Validators {
  user = yup.object().shape({
    name: yup.string().required('invalid name'),
    email: yup.string().email('invalid email').required(),
  });
}
