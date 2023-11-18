import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
} from '@material-tailwind/react';
import { Controller, useForm } from 'react-hook-form';
import { HttpStatusCode } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FormWrapper } from '../../components/form-warpper';
import { InputWrapper } from '../../components/input-wrapper';
import * as employeeApi from '../../api/employee';
import * as accountApi from '../../api/account';
import { useEffect, useState } from 'react';

const employeeProfileDefaultValue = {
  name: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
  professions: '',
  address: '',
  description: '',
};

export function NewEmployeeProfile({}) {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: employeeProfileDefaultValue,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true);
      const response = await accountApi.getAccount();
      const account = response.data.account;
      if (account.role !== 'employee') {
        toast.error('You are not permitted to access this resource');
      }
      if (account.associatedProfile) {
        navigate('/');
      }
    };
    getAccount()
      .catch((_) => {
        navigate('/error/500');
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data) => {
    try {
      await employeeApi.createEmployeeProfile(data);
      toast.success('Successfully created an employee profile!');
      navigate('/');
    } catch (err) {
      if (err.response?.status === HttpStatusCode.BadRequest) {
        if (err.response?.data?.errors?.length) {
          err.response?.data?.errors.forEach(({ message, path }) => {
            setError(path, { type: 'value', message });
          });
        } else {
          toast.error(err.response?.data?.message);
          navigate('/');
        }
      } else {
        toast.error('Opps! There are issues!');
      }
    }
  };

  return (
    <FormWrapper
      title="New Employee Profile"
      description="Impress your dream business and get a job"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-6">
        <InputWrapper error={errors.name}>
          <Input
            color="purple"
            size="lg"
            type="text"
            label="Name"
            {...register('name')}
          />
        </InputWrapper>
        <InputWrapper error={errors.dob}>
          <Input
            color="purple"
            size="lg"
            type="date"
            label="D.O.B"
            {...register('dob')}
          />
        </InputWrapper>
        <InputWrapper error={errors.gender}>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                label="Select for gender"
                error={errors.gender}
                {...field}
              >
                <Option className="items-start" value="male">
                  Male
                </Option>
                <Option className="items-start" value="female">
                  Female
                </Option>
                <Option className="items-start" value="none">
                  Prefer not to say
                </Option>
              </Select>
            )}
          />
        </InputWrapper>
        <InputWrapper error={errors.phone}>
          <Input
            size="lg"
            type="tel"
            label="Phone number"
            {...register('phone')}
          />
        </InputWrapper>
        <InputWrapper error={errors.email}>
          <Input size="lg" type="text" label="Email" {...register('email')} />
        </InputWrapper>
        <InputWrapper error={errors.professions}>
          <Input
            size="lg"
            type="text"
            label="Professions"
            {...register('professions')}
          />
        </InputWrapper>
        <InputWrapper error={errors.address}>
          <Input
            size="lg"
            type="text"
            label="Address"
            {...register('address')}
          />
        </InputWrapper>
        <InputWrapper error={errors.description}>
          <Textarea
            size="lg"
            type="text"
            label="Description"
            {...register('description')}
          />
        </InputWrapper>
      </div>
      <Button type="submit" className="mt-6" fullWidth>
        Create Profile
      </Button>
    </FormWrapper>
  );
}
