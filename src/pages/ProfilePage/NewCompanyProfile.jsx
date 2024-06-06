import { Button, Input, Textarea } from '@material-tailwind/react';
import { useForm} from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from '../../components/form-warpper';
import { InputWrapper } from '../../components/input-wrapper';
import { companySchema } from '../../utils/validation-schemas';
import * as accountApi from '../../api/account';
import * as companyApi from '../../api/company';
import * as authApi from '../../api/authenticate'
import { HttpStatusCode } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { NoPermission } from '../errors/NoPermission';
import * as authorizeApi from '../../api/authorize'
import { useAuth } from '../../contexts/AuthContext';
import { useJobContext } from '../../contexts/JobContext';

// const companyDefaultValue = {
//   name: '',
//   logo: '',
//   phone: '',
//   email: '',
//   address: '',
//   workingFields: '',
//   description: '',
// };


function NewCompanyProfile({accountId, setReloadProfile}) {
  const { jobFields } = useJobContext();
  // {jobFields.map((field) => (
  //     console.log(field.field)))}
  const { accessToken } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    // defaultValues: companyDefaultValue,
    resolver: yupResolver(companySchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newProfileData = { ...data, 
      accountId,
      logo: "https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_960_720.png" }
    try {
      console.log('profile dâta', newProfileData)
      await companyApi.createCompanyProfile(
        newProfileData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('Successfully created a company profile!');
      setReloadProfile(true)
      // navigate('/');
    } 
    catch (err) {
      const errorMessage = err.response?.data?.message || ' Oops something went wrong! ';
      toast.error(errorMessage);
    }
  }

  return (
    <FormWrapper
      title="New Business Profile"
      description="Let your candidate know more of your business"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-6">
        <InputWrapper error={errors.name}>
          <Input size="lg" type="text" label="Company Name" {...register('name')} />
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
        <InputWrapper error={errors.address}>
          <Input
            size="lg"
            type="text"
            label="Address"
            {...register('address')}
          />
        </InputWrapper>
        <InputWrapper>
        <select
            name="workingFields"
            id="workingFields"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
            {...register("workingFields")}
          >
            <option value="" selected disabled hidden>
              --Select an option--
            </option>
            {jobFields.map((field) => (
              <option key={field.field} value={field.field}>
                {field.field}
              </option>
            ))}
          </select>
          </InputWrapper>
        {/* <InputWrapper error={errors.workingFields}>
          <Input
            size="lg"
            type="text"
            label="Work fields"
            {...register('workingFields')}
          />
        </InputWrapper> */}
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
        Create Business Profile
      </Button>
    </FormWrapper>
  );
  // return (
  // <div>Hello</div>s
  // )
}
export default NewCompanyProfile
