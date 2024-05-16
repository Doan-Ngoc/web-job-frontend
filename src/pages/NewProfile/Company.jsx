import { Button, Input, Textarea } from '@material-tailwind/react';
import { useForm} from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from '../../components/form-warpper';
import { InputWrapper } from '../../components/input-wrapper';
import { companySchema } from '../../utils/validation-schemas';
import * as accountApi from '../../api/account';
import * as companyApi from '../../api/company';
import { HttpStatusCode } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const companyDefaultValue = {
  name: '',
  phone: '',
  email: '',
  address: '',
  working_fields: '',
  description: '',
};

function NewBusinessProfile({}) {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: companyDefaultValue,
    resolver: yupResolver(companySchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getAccount = async () => {
      setLoading(true);
      const response = await accountApi.getAccount();
      const account = response.data.account;
      if (account.role !== 'company') {
        toast.error('You are not permitted to access this resource');
      }
      if (account.associatedCompany) {
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
      await companyApi.createCompanyProfile(data);
      toast.success('Successfully created a company profile!');
      // navigate('/');
    } catch (err) {
      if (err.response?.status === HttpStatusCode.BadRequest) {
        if (err.response?.data?.errors?.length) {
          err.response?.data?.errors.forEach(({ message, path }) => {
            setError(path, { type: 'value', message });
          });
        } else {
          toast.error(err.response?.data?.message);
          // navigate('/');
        }
      } else {
        toast.error('Opps! There are issues!');
      }
    }
  };

  return (
    <FormWrapper
      title="New Business Profile"
      description="Let your candidate know more of your business"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
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
        <InputWrapper error={errors.working_fields}>
          <Input
            size="lg"
            type="text"
            label="Work fields"
            {...register('working_fields')}
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
}
export default NewBusinessProfile
