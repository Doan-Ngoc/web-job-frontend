import { Button, Input, Textarea, Card, Typography, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from '../../components/FormWrapper';
import { InputWrapper } from '../../components/InputWrapper';
import { companySchema } from '../../utils/validation-schemas';
import * as accountApi from '../../api/account';
import * as companyApi from '../../api/company';
import * as authApi from '../../api/authenticate'
import { HttpStatusCode } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { NoPermission } from '../errors/NoPermission';
import * as authorizeApi from '../../api/authorize'
import { useAuth } from '../../contexts/AuthContext';
import { useJobContext } from '../../contexts/JobContext';

function NewCompanyProfile() {
  const location = useLocation();
  const { signUpData } = location.state || "";
  const [accountId, setAccountId] = useState()
  const { jobFields } = useJobContext();
  // const { accessToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companySchema),
  });

  useEffect(() => {
    if (!signUpData) {
      navigate('/error/500');
    }
  }, []);

    //Open dialog for signup error message
    const [open, setOpen] = useState(false);
    const [authErrorMessage, setAuthErrorMessage] = useState(null);
    const openErrorDialog = () => setOpen(!open);
    
  //Declare variables for displaying photo
  const defaultLogo="http://localhost:3000/uploads/profilePictures/companyLogos/default-logo.jpg"
  const [companyLogo, setCompanyLogo] = useState(defaultLogo);
  const photoInputRef = useRef(null);
  const [photoUploaded, setphotoUploaded] = useState(false);

  //Display default avatar if user removes uploaded photo
  const handlePhotoRemove = () => {
    setCompanyLogo(defaultLogo);
    setphotoUploaded(false);
    if (photoInputRef.current) {
      photoInputRef.current.value = null;
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await authApi.signup(signUpData);
  //     const newProfileData = {
  //       ...data,
  //       accountId: response.data.id,
  //       logo: "https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_960_720.png"
  //     }
  //     const res = await companyApi.createCompanyProfile(
  //       newProfileData,
  //     );
  //     toast.success('Successfully created a company profile!');
  //     navigate(`/signin`);
  //   }
  //   catch (err) {
  //     console.log(err);
  //     const errorMessage = err.response?.data?.message || ' Oops something went wrong! ';
  //     toast.error(errorMessage);
  //   }
  // }

  const onSubmit = async (data) => {
    try {
      const response = await authApi.signup(signUpData);
      const formData = new FormData();
      if (data.companyLogo[0]) {
        // formData.append('profilePicture', data.profilePicture[0]);
        const file = data.companyLogo[0];
        const newFileName = `photo_${response.data.id}${file.name.slice(file.name.lastIndexOf('.'))}`;
        const renamedFile = new File([file], newFileName, { type: file.type });
        formData.append('companyLogo', renamedFile);
      }
      formData.append('accountId', response.data.id)
      Object.keys(data).forEach((key) => {
        if (key !== 'companyLogo') {
          formData.append(key, data[key]);
        }
      });
      try {
        const res = await companyApi.createCompanyProfile(formData);
        toast.success('Your profile is created successfully!');
        // navigate(`/signin`);
      } catch (err) {
        console.error("Creating company profile failed", err.message);
        const errorMessage = err.response?.data?.message || 'Oops something went wrong!';
        toast.error(errorMessage);
      }
    }
    catch (err) {
      console.error("Signing up failed", err.message);
      const errorMessage = err.response?.data?.message || 'Oops something went wrong!';
      setAuthErrorMessage(errorMessage);
      openErrorDialog()
    }
  }

  return (
    // <FormWrapper
    //   title="New Business Profile"
    //   description="Let your candidate know more of your business"
    //   onSubmit={handleSubmit(onSubmit)}
    // >
    <div className="w-screen flex items-center justify-center">
      <Card color="transparent" className="items-center p-12 shadow-2xl">
    <form
      className="mt-8 mb-2 sm:w-96 flex-col justify-evenly gap-2"
      onSubmit={handleSubmit(onSubmit)} >
      <div className="mb-8">
        <Typography variant="h4" color="blue-gray" className="text-center">
          New Applicant Profile
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Tell us more about yourself
        </Typography>
      </div>

      <div className='flex flex-col items-center justify-center mb-5'>
        <img id='companyLogo'
          src={companyLogo}
          alt="Company Logo"
          // src="http://localhost:3000/uploads/profilePictures/applicantAvatars/default-avatar.jpg" 
          className="w-44 h-44 rounded-full my-6 object-cover" />
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
        <p>JPG, JPEG or PNG. (Max 3MB)</p>
        <input type="file" id="photoInput" accept="image/jpeg, image/jpg, image/png"
          ref={photoInputRef}
          {...register('companyLogo', {
            //Display chosen photo on img tag
            onChange: (e) => {
              const file = e.target.files[0];
              if (file) {
                setCompanyLogo(URL.createObjectURL(file))
                setphotoUploaded(true)
              }
            }
          })}
          hidden />
        {errors.companyLogo && (
          <div className="text-red-500 text-sm w-full pl-2 mb-2">
            {errors.companyLogo.message || ' '}
          </div>
        )}
      </div>
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
        <InputWrapper error={errors.companyIndustries}>
          <label className="pb-2">
            Select Industry
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
                      {...register("companyIndustries")} />
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
    </form>
    </Card>

    {authErrorMessage && <Dialog
        open={open}
        size="xs"
        // handler={openErrorDialog}
        className="w-44"
      >
        <DialogBody className="font-medium text-lg text-center ">
          {authErrorMessage}
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            className="bg-[#ffce00] text-black font-medium"
            color="black"
            onClick={() => navigate("/signup")}
          >
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
      }

    </div>
  )
}
export default NewCompanyProfile
