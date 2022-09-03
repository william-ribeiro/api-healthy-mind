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
  createAddres = yup.object().shape({
    postalCode: yup.string().required('Invalid postalCode'),
    street: yup.string().required('Invalid street'),
    number: yup.string().required('Invalid number'),
    district: yup.string().required('Invalid district'),
    city: yup.string().required('Invalid city'),
    state: yup.string().required('Invalid state'),
    country: yup.string().required('Invalid country'),
  });
  patient = yup.object().shape({
    userId: yup.string().required('Invalid userId'),
    addressId: yup.string().required('Invalid addressId'),
    name: yup.string().required('Invalid name'),
    email: yup.string().email('Invalid email').required(),
    gender: yup.string().label('Invalid gender'),
    birthDate: yup.string().label('Invalid birthDate'),
    phone: yup.string().label('Invalid phone'),
  });

  email = yup.string().email('Invalid email');
}
