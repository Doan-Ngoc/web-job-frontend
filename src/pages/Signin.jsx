import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { HttpStatusCode } from 'axios';
import { userSigninSchema } from '../utils/validation-schemas';
import { InputWrapper } from '../components/InputWrapper';
import * as authApi from '../api/authenticate';
import { useAuth } from '../contexts/AuthContext';
import { AlreadyLogin } from './errors/AlreadyLogin';
import toast from 'react-hot-toast';
import { Input, Button, Typography } from '@material-tailwind/react';

const userSigninDefaultValues = {
  email: '',
  password: '',
};

export function Signin() {
  const { isLoggedIn, setIsLoggedIn, setAccessToken } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: userSigninDefaultValues,
    resolver: yupResolver(userSigninSchema),
    mode: 'onSubmit',
  });
  const navigate = useNavigate();

  //Log in request
  const onSubmit = async (data) => {
    try {
      const response = await authApi.signin(data);
      localStorage.setItem('accessToken', response.data.accessToken);
      setAccessToken(localStorage.getItem('accessToken'))
      setIsLoggedIn(true);
      toast.success('Successfully logged in');
      navigate('/');
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
        toast.error('Opps! There are issues with the sign in process!');
      }
    } 
  };
  //If accessed when already logged in
  if (isLoggedIn) {
    return <AlreadyLogin />;
  }
  
  return (
    <div className="w-full h-full shadow-2xl rounded-md flex flex-col items-center justify-center gap-20">
      <h2 className='text-2xl font-bold'>Sign in to your account</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-1/3"
      >
        <div className="mb-8 flex flex-col gap-6">
          <InputWrapper error={errors.email}>
            <Input
              type="email"
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
        <Button type="submit" className="text-black text-sm bg-[#ffce00]" fullWidth>
          Sign In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Do not have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600">
            Sign Up
          </Link>
        </Typography>
      </form>
    </div>
  );
}
