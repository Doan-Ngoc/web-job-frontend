import * as yup from 'yup';

export const userSignUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(6)
    .matches(/^[a-zA-Z0-9]+$/),
  confirm_password: yup
    .string()
    .required()
    .equals(
      [yup.ref('password')],
      'Confirm password must be the same as password',
    ),
  role: yup.string().required().oneOf(['company', 'employee']),
});

export const userSigninSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const companySchema = yup.object().shape({
  name: yup.string().min(1).max(200),
  phone: yup
    .string()
    .required()
    .matches(/^(0|\+84)[1-9]{1}[0-9]{8}$/, 'invalid phone number'),
  email: yup.string().email().required(),
  working_fields: yup.string().min(1).max(200),
  description: yup.string().min(1).max(500),
  address: yup.string().min(1).max(500),
});
