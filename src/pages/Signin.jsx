import { useEffect, useState } from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HttpStatusCode } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { userSigninSchema } from '../utils/validation-schemas';
import { FormWrapper } from '../components/form-warpper';
import { InputWrapper } from '../components/input-wrapper';
import * as authApi from '../api/auth';
import { authActions } from '../features/auth/auth-slice';

const userSigninDefaultValues = {
  email: '',
  password: '',
};

export function Signin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: userSigninDefaultValues,
    resolver: yupResolver(userSigninSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (authState.isLogined) {
      navigate('/home');
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await authApi.signin(data);
      dispatch(authActions.login(response.data));
      toast.success('Successfully logged in');
      navigate('/home');
    } catch (err) {
      if (
        err.response &&
        err.response.status &&
        (err.response.status == HttpStatusCode.BadRequest ||
          err.response.status == HttpStatusCode.Unauthorized)
      ) {
        const { field, message } = err.response.data;
        setError(field, {
          type: 'server response',
          message,
        });
      } else {
        toast.error('Opps! There are issues!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <FormWrapper
        title="Sign In"
        description="Login to your account"
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        className=""
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
        </div>
        <Button type="submit" className="text-black bg-[#ffce00]" fullWidth>
          Sign In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Do not have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600">
            Sign Up
          </Link>
        </Typography>
      </FormWrapper>
    </div>
  );
}
