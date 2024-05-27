import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoPermission } from '../errors/NoPermission';
import * as companyApi from '../../api/company';
import { toast } from 'react-hot-toast';
import * as authApi from '../../api/authenticate';
import { useAuth } from '../../contexts/AuthContext';
import CompanyProfile from './CompanyProfile';
import NewCompanyProfile from './NewCompanyProfile';
import { HttpStatusCode } from 'axios';

const ProfilePageWrapper = () => {
  const {accessToken, isLoggedIn} = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [profile, setProfile] = useState(null);
  // const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          const response = await authApi.verifyAccessToken(accessToken);
          if (response.user.role === 'company') {
            setIsAllowed(true);
            setAccountId(response.user.id);
              const res = await companyApi.getCompanyProfile(response.user.id);
              console.log('received')
              if (res.data) {
                console.log("if")
              setProfile(res.data);
              }
              else {
                console.log('else')
                setProfile(null)
              }
            } 
          }
            // const profileData = await companyApi.getCompanyProfile(response.user.id);
            // if (profileData) {
            // setProfile(profileData);
            // }
            // else {
            //   setProfile(null)
            // }
          }
      catch (err) {
        toast.error('Failed to load profile');
      }
       finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return <NoPermission />;
  }

  if (profile) {
    console.log('Profile sent to front end is', profile)
    return <CompanyProfile profile={profile} />;
  } else {
    console.log('no profile found', profile)
    return <NewCompanyProfile accountId={accountId} />;
  }
};

export default ProfilePageWrapper;
