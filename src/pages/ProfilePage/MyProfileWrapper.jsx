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
}

export default ProfilePageWrapper;
