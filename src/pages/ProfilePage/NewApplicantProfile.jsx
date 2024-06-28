import { Button, Input, Textarea } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
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
  const {signUpData} = location.state || ""; 
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

  const onSubmit = async (data) => {
    try {
    //   // formData.append("profilePicture", data.profilePicture[0])
    //   console.log('profilePicture', data.profilePicture[0])
      const response = await authApi.signup(signUpData);
      const formData = new FormData();
    formData.append('profilePicture', data.profilePicture[0]); 
    formData.append('accountId', response.data.id)
    Object.keys(data).forEach((key) => {
      if (key !== 'profilePicture') {
        formData.append(key, data[key]);
      }
    });
    //   const newProfileData = { ...data, 
    //     profilePicture: data.profilePicture[0]
    // //     accountId: response.data.id,
    // }
      // const res = await applicantApi.createApplicantProfile(formData);
      const res = await request.post('/applicant/profile/new',   formData, 
          {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      // console.log('File upload response:', response.data);
      toast.success('Your profile is created!');
    //   navigate(`/signin`);
    } 
    catch (err) {
      console.error("Signing up failed", err.message);
      const errorMessage = err.response?.data?.message || ' Oops something went wrong! ';
      toast.error(errorMessage);
    }

  }

  return (
    <FormWrapper
      title="New Applicant Profile"
      description="Tell us more about yourself"
      // encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-6 ">
      <InputWrapper error={errors.profilePicture}>
          <Input size="lg" type="file" label="Profile Picture" {...register('profilePicture')} />
        </InputWrapper>
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
                  {...register("workingFields")}/>
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
      </div>
      <Button type="submit" className="mt-6" fullWidth>
        Create Profile
      </Button>
    </FormWrapper>
  )
}



// import { Fragment } from 'react'
// import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function NewApplicantProfile() {
//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <div>
//         <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//           Options
//           <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
//         </MenuButton>
//       </div>

//       <Transition
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             <MenuItem>
//               {({ focus }) => (
//                 <a
//                   href="#"
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Account settings
//                 </a>
//               )}
//             </MenuItem>
//             <MenuItem>
//               {({ focus }) => (
//                 <a
//                   href="#"
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   Support
//                 </a>
//               )}
//             </MenuItem>
//             <MenuItem>
//               {({ focus }) => (
//                 <a
//                   href="#"
//                   className={classNames(
//                     focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                     'block px-4 py-2 text-sm'
//                   )}
//                 >
//                   License
//                 </a>
//               )}
//             </MenuItem>
//             <form method="POST" action="#">
//               <MenuItem>
//                 {({ focus }) => (
//                   <button
//                     type="submit"
//                     className={classNames(
//                       focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                       'block w-full px-4 py-2 text-left text-sm'
//                     )}
//                   >
//                     Sign out
//                   </button>
//                 )}
//               </MenuItem>
//             </form>
//           </div>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   )
// }