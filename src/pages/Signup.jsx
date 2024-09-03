import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HttpStatusCode } from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as authApi from '../api/authenticate';
import { userSignUpSchema } from '../utils/validation-schemas';
import { FormWrapper } from '../components/FormWrapper';
import { InputWrapper } from '../components/InputWrapper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AlreadyLogin } from './errors/AlreadyLogin';
import { useAuth } from '../contexts/AuthContext';

const defaultAccountValue = {
  email: '',
  password: '',
  confirm_password: '',
  role: '',
};

export function Signup() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultAccountValue,
    resolver: yupResolver(userSignUpSchema),
    mode: 'onSubmit'
  });

  const onSubmit = async (data) => {
    if (data.role === "company") {
      navigate(`/profile/company/create`, { state: { signUpData: data } })
    }
    else if (data.role === "applicant") {
      navigate(`/profile/applicant/create`, { state: { signUpData: data } })
    }
  }

  if (isLoggedIn) {
    return <AlreadyLogin />;
  }

  return (
    <div className="w-full h-full shadow-2xl rounded-md flex flex-col gap-10 items-center justify-center ">
      <h2 className='text-2xl font-bold'>Create an account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-1/3">
        <div className="mb-8 flex flex-col gap-6 ">
          <InputWrapper error={errors.email}>
            <Input
              type = "email"
              size="lg"
              label="Email"
              className={errors.email && 'outline-red-500'}
              error={errors.email}
              {...register('email')}
            />
          </InputWrapper>
          <InputWrapper error={errors.password}>
            <Input
              type="password"
              size="lg"
              label="Password"
              error={errors.password}
              {...register('password')}
            />
          </InputWrapper>
          <InputWrapper error={errors.confirm_password}>
            <Input
              type="password"
              size="lg"
              label="Confirm Password"
              error={errors.confirm_password}
              {...register('confirm_password')}
            />
          </InputWrapper>
          <InputWrapper error={errors.role}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select label="Select your role" {...field} error={errors.role}>
                  <Option className="items-start" value="company">
                    Recruiter/Company
                  </Option>
                  <Option className="items-start" value="applicant">
                    Applicant
                  </Option>
                </Select>
              )}
            />
          </InputWrapper>
        </div>
        <Button
          type="submit"
          className="mt-8 bg-[#ffce00] text-black text-sm"
          fullWidth
        >
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{' '}
          <Link to="/signin" href="#" className="font-medium text-blue-600">
            Sign In
          </Link>
        </Typography>
      </form>
    </div>
  );
}
