import { Button, Input, Textarea } from '@material-tailwind/react';
import { useForm} from 'react-hook-form';
import { useState, useEffect } from 'react';
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

const companyDefaultValue = {
  name: '',
  phone: '',
  email: '',
  address: '',
  workingFields: '',
  description: '',
};

function NewCompanyProfile({accountId}) {
  console.log('newcompanyprofile id', accountId)
  // const [isLoading, setLoading] = useState(false);
  // const [isAllowed, setIsAllowed] = useState(false);
  // const [accountId, setAccountId] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: companyDefaultValue,
    resolver: yupResolver(companySchema),
  });
  const { accessToken } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   //Check if the user: (1) is logged in (2) has the role of company (3) hasn't had a profile
  //   const confirmAccess = async () => {
  //     setLoading(true);
  //     if (accessToken) {
  //       const response = await companyApi.getCompanyProfile(
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       );
  //       //Check if the user is logged in
  //       if (response ==="company") {
  //         console.log(response)
  //       setIsAllowed(true)
  //       setLoading(false)
  //       setAccountId(response.user.id)
  //       }
  //       else {
  //         setIsAllowed(false)
  //         setLoading(false)
  //       }
  //     }
  //     //If not logged in
  //     else {
  //       setIsAllowed(false)
  //       setLoading(false)
  //     }
  //   confirmAccess()
  // }}, []);


  // const onSubmit = async (data) => {
  //   try {
  //     const newProfileData = { ...data, accountId }
  //     await companyApi.createCompanyProfile(
  //       newProfileData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );
  //     toast.success('Successfully created a company profile!');
  //     // navigate('/');
  //   } catch (err) {
  //     if (err.response?.status === HttpStatusCode.BadRequest) {
  //       if (err.response?.data?.errors?.length) {
  //         err.response?.data?.errors.forEach(({ message, path }) => {
  //           setError(path, { type: 'value', message });
  //         });
  //       } else {
  //         toast.error(err.response?.data?.message);
  //         // navigate('/');
  //       }
  //     } else {
  //       toast.error('Opps! There are issues!');
  //     }
  //   }
  // };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!isAllowed) {
  //   return <NoPermission />
  // }

  return (
    <FormWrapper
      title="New Business Profile"
      description="Let your candidate know more of your business"
    >
      <div className="flex flex-col gap-6">
        <InputWrapper error={errors.name}>
          <Input size="lg" type="text" label="Name" {...register('name')} />
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
        <InputWrapper error={errors.workingFields}>
          <Input
            size="lg"
            type="text"
            label="Work fields"
            {...register('workingFields')}
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
        Create Business Profile
      </Button>
    </FormWrapper>
  );
  // return (
  // <div>Hello</div>s
  // )
}
export default NewCompanyProfile
