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
import * as authApi from '../api/auth';
import { userSignUpSchema } from '../utils/validation-schemas';
import { FormWrapper } from '../components/form-warpper';
import { InputWrapper } from '../components/input-wrapper';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const defaultAccountValue = {
  email: '',
  password: '',
  confirm_password: '',
  role: '',
};

export function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultAccountValue,
    resolver: yupResolver(userSignUpSchema),
    mode: 'onSubmit',
    shouldFocusError: false,
  });

  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isLogined) {
      navigate('/');
    }
  });

  const onSubmit = async (data) => {
    try {
      await authApi.signup(data);
      toast.success('Successfully signed up');
      navigate(`/signin`);
    } catch (err) {
      if (err?.response?.status == HttpStatusCode.BadRequest) {
        console.log(err.response);
        const { field, message } = err.response.data;
        setError(field, {
          type: 'server response',
          message,
        });
      } else {
        toast.error('Opps! There are issues!');
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <FormWrapper
        title="Sign Up"
        description="Create a new account"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8 flex flex-col gap-6">
          <InputWrapper error={errors.email}>
            <Input
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
                  <Option className="items-start" value="employee">
                    Employee
                  </Option>
                </Select>
              )}
            />
          </InputWrapper>
        </div>
        <Button
          type="submit"
          className="mt-8 bg-[#ffce00] text-black"
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
      </FormWrapper>
    </div>
  );
}
