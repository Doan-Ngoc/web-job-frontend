import { Button, Input, Textarea, Card, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from '../../components/FormWrapper';
import { InputWrapper } from '../../components/InputWrapper';
import { applicantSchema } from '../../utils/validation-schemas';
import * as accountApi from '../../api/account';
import * as companyApi from '../../api/company';
import * as authApi from '../../api/authenticate'
import * as applicantApi from '../../api/applicant'
import { HttpStatusCode } from 'axios';
import { request } from '../../utils/request';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { NoPermission } from '../errors/NoPermission';
import * as authorizeApi from '../../api/authorize'
import { useAuth } from '../../contexts/AuthContext';
import { useJobContext } from '../../contexts/JobContext';

export default function NewApplicantProfile() {
  const location = useLocation();
  const { signUpData } = location.state || "";
  const { jobFields } = useJobContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applicantSchema),
    defaultValues: {
      workingFields: [], // Set default value as an empty array
    },
  });

  useEffect(() => {
    if (!signUpData) {
      navigate('/error/500');
    }
  }, []);

  const [profilePic, setProfilePic] = useState("http://localhost:3000/uploads/profilePictures/applicantAvatars/default-avatar.jpg");
  const photoInputRef = useRef(null);
  const [photoUploaded, setphotoUploaded] = useState(false);

  const handlePhotoRemove = () => {
    setProfilePic("http://localhost:3000/uploads/profilePictures/applicantAvatars/default-avatar.jpg");
    setphotoUploaded(false);
    if (photoInputRef.current) {
      photoInputRef.current.value = null;
    }
  };

  const onSubmit = async (data) => {
    try {
      // const response = await authApi.signup(signUpData);
      console.log('submitted', data)
      const formData = new FormData();
      console.log('come here', data.profilePicture)
      if (photoUploaded && data.profilePicture && data.profilePicture[0]) {
        formData.append('profilePicture', data.profilePicture[0]);
      }
      formData.append('applicantCV', data.applicantCV[0]);
      console.log('photo', data.profilePicture[0])
      // formData.append('accountId', response.data.id)
      Object.keys(data).forEach((key) => {
        if (key !== 'profilePicture' && key !== 'applicantCV') {
          formData.append(key, data[key]);
        }
      });
      const res = await applicantApi.createApplicantProfile(formData)
      toast.success('Your profile is created!');
    }
    catch (err) {
      console.error("Signing up failed", err.message);
      const errorMessage = err.response?.data?.message || ' Oops something went wrong! ';
      toast.error(errorMessage);
    }
  }

  return (
    <div className="w-screen flex items-center justify-center">
      <Card color="transparent" className="items-center p-12 shadow-2xl">
        <form
          className="mt-8 mb-2 sm:w-96 flex-col justify-evenly gap-2"
          onSubmit={handleSubmit(onSubmit)} >
          {/* <FormWrapper
      title="New Applicant Profile"
      description="Tell us more about yourself"
      // encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    > */}
          <div className="mb-8">
            <Typography variant="h4" color="blue-gray" className="text-center">
              New Applicant Profile
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-center">
              Tell us more about yourself
            </Typography>
          </div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <img id='applicantPhoto'
              src={profilePic}
              alt="Profile Picture"
              // src="http://localhost:3000/uploads/profilePictures/applicantAvatars/default-avatar.jpg" 
              className="w-44 h-44 rounded-full my-6 object-cover" />
            {/* <Button className="w-30"> */}
            {photoUploaded ?
              (<button
                className="btn text-white text-xs bg-black hover:bg-black"
                type='button'
                onClick={handlePhotoRemove}>
                Remove photo
              </button>) 
              : (<label for="photoInput" className='btn text-white text-xs bg-black hover:bg-black cursor-pointer'>
                Upload photo</label>)
            }
            {/* </Button> */}
            <input type="file" id="photoInput" accept="image/jpeg, image/jpg, image/png"
              ref={photoInputRef}
              {...register('profilePicture', {
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfilePic(URL.createObjectURL(file))
                    setphotoUploaded(true)}
                }
              })}
              hidden />
              {errors.profilePicture && (
            <div className="text-red-500 text-sm w-full pl-2 mb-2">
              {errors.profilePicture.message || ' '}
            </div>
          )}
            {/* <div className="text-red-500 text-sm w-full h-1 pl-2">
              {errors.profilePicture || ' '}
            </div> */}
          </div>
          
          {/* <InputWrapper error={errors.profilePicture}>
          <Input size="lg" type="file" label="Profile Picture" {...register('profilePicture')} />
        <p className="pl-2">JPG or PNG. (Max 3MB)</p>
        </InputWrapper>  */}
          <InputWrapper error={errors.name}>
            <Input size="lg" type="text" label="Full Name" {...register('name')} />
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
          <InputWrapper error={errors.workingFields}>
            <label className="pb-2">
              Working Fields
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
                        {...register("workingFields")} />
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
              label="Self Introduction"
              {...register('description')}
            />
          </InputWrapper>
          <InputWrapper error={errors.applicantCV}>
            <label className="pb-2">Upload your CV (PDF only):</label>
            <Input size="lg" type="file" {...register('applicantCV')} />
          </InputWrapper>

          <Button type="submit" className="mt-6" fullWidth>
            Create Profile
          </Button>
          {/* </FormWrapper> */}
        </form>
      </Card>
    </div>
  )
}