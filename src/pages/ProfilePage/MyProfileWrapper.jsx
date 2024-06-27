import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoPermission } from '../errors/NoPermission';
import * as companyApi from '../../api/company';
import * as applicantApi from '../../api/applicant'
import { toast } from 'react-hot-toast';
import * as authApi from '../../api/authenticate';
import { useAuth } from '../../contexts/AuthContext';
import CompanyProfile from './CompanyProfile';
import NewCompanyProfile from './NewCompanyProfile';
import { HttpStatusCode } from 'axios';
import ApplicantProfile from './ApplicantProfile';
import {Button} from "@material-tailwind/react";

const ProfilePageWrapper = () => {
  const {accessToken,  accountRole, accountId } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  // const [accountType, setAccountType] = useState("")
  const [profile, setProfile] = useState(null);
  // const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  if (accountRole !== "company" || accountRole !== "applicant") {
    navigate("/error/500")
  }

  return (
    <div>
      {accountRole === 'company' ? (
        <CompanyProfile accountId={accountId} />
      ) : accountRole === 'applicant' ? (
        <ApplicantProfile accountId={accountId}/>
      ) :  null}
    </div>
  );
  // useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       try {
//         if (isLoggedIn) {
//           const response = await authApi.verifyAccessToken(accessToken);
//           if (response.user.role === 'company') {
//             setIsAllowed(true);
//             setAccountType("company")
//             setAccountId(response.user.id);
//               const res = await companyApi.getCompanyProfile(response.user.id);
//               if (res.data) {
//               setProfile(res.data);
//               }
//               else {
//                 setProfile(null)
//               }
//             }
//             else if (response.user.role === 'applicant') {
//             setIsAllowed(true);
//             setAccountType("applicant")
//             setAccountId(response.user.id);
//             const res = await applicantApi.getApplicantProfile(response.user.id);
//             if (res.data) {
//               setProfile(res.data);
//             }
//             else {
//               setProfile(null)
//             }
//             }
//           }
//           }
//       catch (err) {
//         toast.error('Failed to load profile');
//       }
//        finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [isLoggedIn]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAllowed) {
//     return <NoPermission />;
//   }

//   if (accountType === "company") {
//     if (profile) {
//     navigate(`/profile/company/${profile._id}`, { state: { profile: profile } });
//     // return <CompanyProfile profile={profile} />;
//   } else {
//     navigate(`/profile/company/create`, { state: { accountId: accountId} });
//     // return <NewCompanyProfile accountId={accountId}  />;
//   }
// };

// if (accountType === "applicant") {
//   if (profile) {
//     navigate(`/profile/applicant/${profile._id}`, { state: { profile: profile } });
//   }
//   else {
//     navigate(`/profile/applicant/create`, { state: { accountId: accountId} })
//   }
// }
}

export default ProfilePageWrapper;
