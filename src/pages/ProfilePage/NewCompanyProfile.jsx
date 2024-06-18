import { Button, Input, Textarea } from '@material-tailwind/react';
import { useForm} from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from '../../components/FormWrapper';
import { InputWrapper } from '../../components/InputWrapper';
import { companySchema } from '../../utils/validation-schemas';
import * as accountApi from '../../api/account';
import * as companyApi from '../../api/company';
import * as authApi from '../../api/authenticate'
import { HttpStatusCode } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate,  useLocation } from 'react-router-dom';
import { NoPermission } from '../errors/NoPermission';
import * as authorizeApi from '../../api/authorize'
import { useAuth } from '../../contexts/AuthContext';
import { useJobContext } from '../../contexts/JobContext';

function NewCompanyProfile() {
  const location = useLocation();
  const { accountId} = location.state || ""; 
  useEffect(() => {
    if (!accountId) {
      navigate('/error/500'); 
    }
  }, [accountId]);
  const { jobFields } = useJobContext();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });
  

  const onSubmit = async (data) => {
    const newProfileData = { ...data, 
      accountId,
      logo: "https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_960_720.png" 
    }
    try {
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
      navigate('/profile')
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
        {/* <InputWrapper error={errors.companyIndustry}>
        <label
        className="pb-2"
        >
          Select Industry
        </label>
        <select
            name="companyIndustry"
            id="companyIndustry"
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            {...register("companyIndustry")}
          >
            <option value="" selected disabled hidden>
              --Select an option--
            </option>
            {jobFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
          </InputWrapper> */}
        <InputWrapper error={errors.companyIndustries}>
        <label className="pb-2">
          Industries
        </label>
          <div className="dropdown w-full">
            <div tabIndex={0} role="button" className="btn m-1 w-full">
              Select options
              <ion-icon name="caret-down"></ion-icon>
              </div>
            <div tabIndex={0} className="form-control dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-b-lg w-full">
              <div className="max-h-60 overflow-y-auto">
              {jobFields.map((field) => (
                <label className="label cursor-pointer" key={field}>
                <span className="label-text">{field}</span>
                <input type="checkbox" value={field}
                  className="checkbox checkbox-primary"
                  {...register("companyIndustries")}/>
              </label>
            ))}
            </div>
            </div>
          </div>
        </InputWrapper>
        <InputWrapper error={errors.description}>
          <Textarea
            size="lg"
            type="text"
            label="Company Description"
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
