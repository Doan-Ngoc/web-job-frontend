import * as yup from 'yup';

export const userSignUpSchema = yup.object().shape({
  email: yup
  .string()
  .email()
  .required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: yup
    .string()
    .required("Please confirm your password")
    .equals(
      [yup.ref('password')],
      'Confirm password must be the same as password',
    ),
  role: yup
  .string()
  .required("Please select your role")
});

export const userSigninSchema = yup.object().shape({
  email: yup.string().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export const companySchema = yup.object().shape({
  name: yup.string()
  .required("Please enter your company name")
  .max(200, "Your company name must be at most 200 characters"),
  phone: yup
    .string()
    .required("Please enter your company's phone number")
    .matches(/^(0|\+84)[1-9]{1}[0-9]{8}$/, 'Invalid phone number'),
  email: yup.string()
  .email("Please enter a valid email address")
  .required("Please enter your company's email address"),
  companyIndustries: yup.array().required()
  .min(1, "Please select at least one industry")
  .max(3, "You can select up to three industries"),
  description: yup.string().required("Please give a brief description about your business")
  .min(10, "Your description must be at least 10 characters")
  .max(1000, "Your description must be at most 1000 characters"),
  address: yup.string()
  .required("Please enter your company's address")
  .max(200, "Your company's address must be at most 200 characters"),
});

export const applicantSchema = yup.object().shape({
  name: yup.string()
  .required("Please enter your name")
  .max(200, "Your company name must be at most 200 characters"),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .matches(/^(0|\+84)[1-9]{1}[0-9]{8}$/, 'Invalid phone number'),
  email: yup.string()
  .email("Please enter a valid email address")
  .required("Please enter your email address"),
  workingFields: yup.array().required()
  .min(1, "Please select at least one working field")
  .max(3, "You can select up to three working fields"),
  description: yup.string().required("Please give a brief description about yourself")
  .min(10, "Your description must be at least 10 characters")
  .max(1000, "Your description must be at most 1000 characters")
});
