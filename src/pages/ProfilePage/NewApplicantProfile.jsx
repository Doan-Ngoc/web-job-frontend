import {
  Button,
  Input,
  Textarea,
  Card,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputWrapper } from '../../components/InputWrapper';
import { applicantSchema } from '../../utils/validation-schemas';
import * as applicantApi from '../../api/applicant';
import { request } from '../../utils/request';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useJob } from '../../hooks/useJob';
import { useAuth } from '../../hooks/useAuth';

export default function NewApplicantProfile() {
  const { jobFields } = useJob();
  const {accountId} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applicantSchema),
    defaultValues: {
      workingFields: [],
    },
  });

  //Open dialog for signup error message
  const [open, setOpen] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState(null);
  const openErrorDialog = () => setOpen(!open);

  //Declare variables for displaying photo
  const defaultAvatar = `${request.defaults.baseURL}/uploads/profilePictures/applicantAvatars/default-avatar.jpg`;
  const [profilePic, setProfilePic] = useState(defaultAvatar);
  const photoInputRef = useRef(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  //Display default avatar if user removes uploaded photo
  const handlePhotoRemove = () => {
    setProfilePic(defaultAvatar);
    setPhotoUploaded(false);
    if (photoInputRef.current) {
      photoInputRef.current.value = null;
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      //Format profile picture
      if (data.profilePicture[0]) {
        const file = data.profilePicture[0];
        const newFileName = `photo_${accountId}${file.name.slice(
          file.name.lastIndexOf('.'),
        )}`;
        const renamedFile = new File([file], newFileName, { type: file.type });
        formData.append('profilePicture', renamedFile);
      }
      //Format applicant's CV
      if (data.applicantCV[0]) {
        const file = data.applicantCV[0];
        const newFileName = `cv_${accountId}${file.name.slice(
          file.name.lastIndexOf('.'),
        )}`;
        const renamedFile = new File([file], newFileName, { type: file.type });
        formData.append('applicantCV', renamedFile);
      }
      //Add other data to formData
      formData.append('accountId', accountId);
      Object.keys(data).forEach((key) => {
        if (key !== 'profilePicture' && key !== 'applicantCV') {
          formData.append(key, data[key]);
        }
      });

      // Send data to backend
      try {
       await applicantApi.createApplicantProfile(formData);
        toast.success('Your profile is created successfully!');
        navigate(`/my-profile`);
        //Request for creating profile failed
      } catch (err) {
        console.error('Creating applicant profile failed', err.message);
        const errorMessage =
          err.response?.data?.message || 'Oops something went wrong!';
        toast.error(errorMessage);
      }
      //Request for signing up failed
    } catch (err) {
      console.error('Signing up failed', err.message);
      const errorMessage =
        err.response?.data?.message || 'Oops something went wrong!';
      setAuthErrorMessage(errorMessage);
      openErrorDialog();
    }
  };
  
  return (
    <div className="w-100 flex items-center justify-center">
      <Card color="transparent" className="items-center p-12 shadow-2xl">
        <form
          className="mt-8 mb-2 sm:w-96 flex-col justify-evenly gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-8">
            <Typography variant="h4" color="blue-gray" className="text-center">
              New Applicant Profile
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-center">
              Tell us more about yourself
            </Typography>
          </div>
          {/* Profile picture */}
          <div className="flex flex-col items-center justify-center mb-5">
            <img
              id="applicantPhoto"
              src={profilePic}
              alt="Profile Picture"
              className="w-44 h-44 rounded-full my-6 object-cover"
            />
            {photoUploaded ? (
              <button
                className="btn text-white text-xs bg-black hover:bg-black"
                type="button"
                onClick={handlePhotoRemove}
              >
                Remove photo
              </button>
            ) : (
              <label
              htmlFor="photoInput"
                className="btn text-white text-xs bg-black hover:bg-black cursor-pointer"
              >
                Upload photo
              </label>
            )}
            <p>JPG, JPEG or PNG. (Max 3MB)</p>
            <input
              type="file"
              id="photoInput"
              accept="image/jpeg, image/jpg, image/png"
              ref={photoInputRef}
              {...register('profilePicture', {
                //Display chosen photo on img tag
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfilePic(URL.createObjectURL(file));
                    setPhotoUploaded(true);
                  }
                },
              })}
              hidden
            />
            {/* Show error for invalid picture */}
            {errors.profilePicture && (
              <div className="text-red-500 text-sm w-full pl-2 mb-2">
                {errors.profilePicture.message || ' '}
              </div>
            )}
          </div>

          {/* Applicant information */}
          {/* Name */}
          <InputWrapper error={errors.name}>
            <Input
              size="lg"
              type="text"
              label="Full Name"
              {...register('name')}
            />
          </InputWrapper>
          {/* Phone */}
          <InputWrapper error={errors.phone}>
            <Input
              size="lg"
              type="tel"
              label="Phone number"
              {...register('phone')}
            />
          </InputWrapper>
          {/* Email */}
          <InputWrapper error={errors.email}>
            <Input size="lg" type="text" label="Email" {...register('email')} />
          </InputWrapper>
          {/* Working fields */}
          <InputWrapper error={errors.workingFields}>
            <label className="pb-2">Working Fields</label>
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="btn m-1 w-full">
                Select options
                <ion-icon name="caret-down"></ion-icon>
              </div>
              <div
                tabIndex={0}
                className="form-control dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-b-lg w-full"
              >
                <div className="max-h-60 overflow-y-auto">
                  {jobFields.map((field) => (
                    <label className="label cursor-pointer" key={field}>
                      <span className="label-text">{field}</span>
                      <input
                        type="checkbox"
                        value={field}
                        className="checkbox checkbox-primary"
                        {...register('workingFields')}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </InputWrapper>
          {/* Self description */}
          <InputWrapper error={errors.description}>
            <Textarea
              size="lg"
              type="text"
              label="Self Introduction"
              {...register('description')}
            />
          </InputWrapper>
          {/* Upload CV */}
          <InputWrapper error={errors.applicantCV}>
            <label className="pb-2">Upload your CV (PDF only):</label>
            <Input size="lg" type="file" {...register('applicantCV')} />
          </InputWrapper>
          {/* Create profile button */}
          <Button type="submit" className="mt-6" fullWidth>
            Create Profile
          </Button>
        </form>
      </Card>

      {/* Error dialog to return to sign up page */}
      {authErrorMessage && (
        <Dialog
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
              onClick={() => navigate('/signup')}
            >
              <span>OK</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
